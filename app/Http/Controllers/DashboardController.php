<?php

namespace App\Http\Controllers;

use App\Models\InvoicePembayaranSambungan;
use App\Models\InvoiceTagihanBulanan;
use App\Models\JenisPengaduan;
use App\Models\PembayaranTagihan;
use App\Models\Pengaduan;
use App\Models\PermintaanSambunganBaru;
use App\Models\TagihanBulanan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        if ($request->user()->getRoleNames()[0] !== 'pelanggan') {
            return redirect()->route('admin.dashboard');
        }

        $user = User::with(['meteran'])->findOrFail($request->user()->id);
        $tagihan = array();
        // $count
        foreach ($user->meteran as $meteran) {
            $tagihan = TagihanBulanan::with('periode', 'meteran')
                ->where('meteran_pelanggan_id', $meteran->id)
                ->where('status_pembayaran', '=', 'belum lunas')->get();
        }
        $total = 0;
        foreach ($tagihan as $tagihanBulanan) {
            $total += $tagihanBulanan->total_tagihan;
        }



        return inertia('Pelanggan/Dashboard/Dashboard', compact('tagihan', 'user', 'total'));
    }

    public function dashboard_admin(Request $request)
    {

        $countTagihanBulanan = [
            'total_tagihan' => TagihanBulanan::sum('total_tagihan'),
            'lunas' => TagihanBulanan::where('status_pembayaran', 'lunas')->sum('total_tagihan'),
            'belum' => TagihanBulanan::where('status_pembayaran', 'belum lunas')->sum('total_tagihan'),
        ];
        $countJenisPengaduan = JenisPengaduan::withCount('pengaduan')->get();
        // dd($countJenisPengaduan);
        $statPengaduan = $this->hitungTotalPengaduanPerBulan(2024);
        $statStatusPengaduan = $this->hitung_status_pengaduan(2023);
        $stat_status_pengaduan = $this->statistik_status_pengaduan(2023);
        $stat_total_tagihan = $this->stat_total_tagihan(2024);

        return inertia('Admin/Dashboard/Dashboard', compact('countTagihanBulanan', 'countJenisPengaduan', 'stat_total_tagihan', 'statPengaduan', 'stat_status_pengaduan'));
    }
    function stat_total_tagihan($year)
    {
        // Tahun yang ingin Anda hitung
        $monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        $statuses = ['belum lunas', 'lunas'];
        $monthlyData = [];

        // Inisialisasi data bulanan untuk setiap status
        foreach ($statuses as $status) {
            $monthlyData[$status] = [];

            // Inisialisasi data bulanan dengan nilai 0 untuk setiap status
            foreach ($monthNames as $month) {
                $monthlyData[$status][$month] = 0;
            }
        }

        // Mengisi data bulanan untuk setiap status
        foreach ($statuses as $status) {
            $data = TagihanBulanan::select(DB::raw('MONTH(created_at) as month'), DB::raw('SUM(total_tagihan) as total'))
                ->whereYear('created_at', $year)
                ->where('status_pembayaran', $status)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->orderBy(DB::raw('MONTH(created_at)'))
                ->get();

            // Mengisi data bulanan yang ada
            foreach ($data as $item) {
                $month = $monthNames[$item->month - 1];
                $monthlyData[$status][$month] = $item->total;
            }
        }

        return $monthlyData;
    }
    function statistik_status_pengaduan($year)
    {
        // Tahun yang ingin Anda hitung
        $monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        $statuses = ['belum di proses', 'selesai', 'diperbaiki', 'dihentikan'];
        $monthlyData = [];

        // Inisialisasi data bulanan untuk setiap status
        foreach ($statuses as $status) {
            $monthlyData[$status] = [];

            // Inisialisasi data bulanan dengan nilai 0 untuk setiap status
            foreach ($monthNames as $month) {
                $monthlyData[$status][$month] = 0;
            }
        }

        // Mengisi data bulanan untuk setiap status
        foreach ($statuses as $status) {
            $data = Pengaduan::select(DB::raw('MONTH(tanggal_pengaduan) as month'), DB::raw('COUNT(*) as total'))
                ->whereYear('tanggal_pengaduan', $year)
                ->where('status', $status)
                ->groupBy(DB::raw('MONTH(tanggal_pengaduan)'))
                ->orderBy(DB::raw('MONTH(tanggal_pengaduan)'))
                ->get();

            // Mengisi data bulanan yang ada
            foreach ($data as $item) {
                $month = $monthNames[$item->month - 1];
                $monthlyData[$status][$month] = $item->total;
            }
        }

        return $monthlyData;
    }
    function hitungTotalPengaduanPerBulan($tahun)
    {
        // Menginisialisasi array untuk menyimpan total pengaduan per bulan
        $totalPengaduanPerBulan = [];

        // Mengambil daftar bulan dalam bahasa Indonesia
        $bulanIndonesia = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Menginisialisasi array untuk menyimpan hasil akhir
        $hasilAkhir = [];

        // Menghitung total pengaduan per bulan
        for ($bulan = 1; $bulan <= 12; $bulan++) {
            $tanggalAwal = Carbon::create($tahun, $bulan, 1)->startOfMonth();
            $tanggalAkhir = $tanggalAwal->copy()->endOfMonth();

            $totalPengaduan = Pengaduan::whereBetween('tanggal_pengaduan', [$tanggalAwal, $tanggalAkhir])->count();

            $totalPengaduanPerBulan[$bulan] = $totalPengaduan;
        }

        // Mengisi bulan-bulan yang tidak memiliki pengaduan dengan nilai 0
        foreach ($bulanIndonesia as $index => $namaBulan) {
            $bulanKe = $index + 1;
            $hasilAkhir[$namaBulan] = $totalPengaduanPerBulan[$bulanKe] ?? 0;
        }

        return $hasilAkhir;
    }
    function hitung_status_pengaduan($tahun)
    {
        // Inisialisasi array untuk menyimpan total pengaduan per bulan
        $totalPengaduanPerBulan = [];

        // Loop untuk setiap bulan dalam satu tahun
        for ($bulan = 1; $bulan <= 12; $bulan++) {
            $tanggalAwal = Carbon::create($tahun, $bulan, 1)->startOfMonth();
            $tanggalAkhir = $tanggalAwal->copy()->endOfMonth();

            // Menghitung total pengaduan untuk bulan tersebut
            $totalPengaduan = Pengaduan::whereBetween('tanggal_pengaduan', [$tanggalAwal, $tanggalAkhir])->count();

            // Menyimpan total pengaduan per bulan
            $totalPengaduanPerBulan[Carbon::create($tahun, $bulan)->format('F')] = $totalPengaduan;
        }

        return $totalPengaduanPerBulan;
    }
}
