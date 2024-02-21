<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HargaTarifPerMeter;
use App\Models\PemasanganBaru;
use App\Models\PencatatanMeter;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class PencatatanMeterController extends Controller
{
    public function index(Request $request)
    {
        $roles = $request->user()->getRoleNames()[0];
        $query = PencatatanMeter::query()->with('pemasanganBaru');
        if ($request->cari) {
            $query->whereHas('pemasanganBaru', function ($q) use ($request) {
                $q->where('no_sambungan', 'like', '%' . $request->cari . '%');
            });
        }
        $pencatatanMeter = $query
            ->whereMonth('tanggal_pencatatan', $request->bulan ? $request->bulan : now()->month)
            ->whereYear('tanggal_pencatatan', $request->tahun ? $request->tahun : now()->year)
            ->latest()->get();

        return inertia('Admin/PencatatanMeter/PencatatanMeter', compact('pencatatanMeter', 'roles'));
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $attr = $request->validate([
            'stand_meter_awal' => 'required',
            'stand_meter_sekarang' => 'required|numeric|min:' . $request->stand_meter_awal,
            'total_pemakaian' => 'required',

        ]);
        $attr['pemasangan_baru_id'] = 1;
        $attr['tanggal_pencatatan'] = now();
        $attr['nama_petugas_pencatat'] = 'UJI COBA';
        $attr['pemasangan_baru_id'] = $request->pemasangan_baru_id;
        $cekPencatatan = PencatatanMeter::where('pemasangan_baru_id', $request->pemasangan_baru_id)
            ->whereMonth('tanggal_pencatatan', now()->month)
            ->whereYear('tanggal_pencatatan', now()->year)->get();

        if (count($cekPencatatan) > 0) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Maaf, pencatatan meteran baru tidak bisa dilakukan, karena meteran ini telah dicatat di bulan ini']);
        } else {

            $getPemasanganBaru = PemasanganBaru::findOrFail($request->pemasangan_baru_id);
            $cekTarif = HargaTarifPerMeter::where('golongan', $getPemasanganBaru->nama_golongan)->where('kelompok', $getPemasanganBaru->nama_kelompok)->first();
            $tarif1 = 0;
            $tarif2 = 0;
            $tarif3 = 0;
            $tarif4 = 0;

            $pemakaian1 = 0;
            $pemakaian2 = 0;
            $pemakaian3 = 0;
            $pemakaian4 = 0;
            if ($request->total_pemakaian > 0) {
                $pemakaian1 = min(10, $request->total_pemakaian);
            }

            if ($request->total_pemakaian > 10) {
                $pemakaian2 = min(10, $request->total_pemakaian - $pemakaian1);
            }

            if ($request->total_pemakaian > 20) {
                $pemakaian3 = min(10, $request->total_pemakaian - $pemakaian1 - $pemakaian2);
            }

            if ($request->total_pemakaian > 30) {
                $pemakaian4 = $request->total_pemakaian - $pemakaian1 - $pemakaian2 - $pemakaian3;
            }

            $tarif1 = $pemakaian1 * $cekTarif->tarif1;
            $tarif2 = $pemakaian2 * $cekTarif->tarif2;
            $tarif3 = $pemakaian3 * $cekTarif->tarif3;
            $tarif4 = $pemakaian4 * $cekTarif->tarif4;
            $denda = 0;
            $adm = $cekTarif->adm;
            $total = $tarif1 + $tarif2 + $tarif3 + $tarif4 + $adm + $denda;

            $attr['pemakaian_10'] = $pemakaian1;
            $attr['pemakaian_20'] = $pemakaian2;
            $attr['pemakaian_30'] = $pemakaian3;
            $attr['pemakaian_30_keatas'] = $pemakaian4;
            $attr['petugas_id'] = $request->user()->id;
            $attr['nama_petugas_pencatat'] = $request->user()->petugas->nama;
            $pencatatanMeter = PencatatanMeter::create($attr);
            $tagihanBulanan = TagihanBulanan::create([
                'tarif_id' => $cekTarif->id,
                'pencatatan_meter_id' => $pencatatanMeter->id,
                'pemasangan_baru_id' => $getPemasanganBaru->id,
                'wilayah_id' => $getPemasanganBaru->wilayah_id,
                'kode_sambungan' => $getPemasanganBaru->kode_pemasangan_baru,
                'no_sambungan' =>  $getPemasanganBaru->no_sambungan,
                'nama_pelanggan' =>  $getPemasanganBaru->nama_pelanggan,
                'alamat' =>  $getPemasanganBaru->alamat_pemasangan,
                'stand_meter_awal' => $pencatatanMeter->stand_meter_awal,
                'stand_meter_akhir' => $pencatatanMeter->stand_meter_sekarang,
                'total_pemakaian' => $pencatatanMeter->total_pemakaian,
                'tarif_pemakaian_10' => $tarif1,
                'tarif_pemakaian_20' => $tarif2,
                'tarif_pemakaian_30' => $tarif3,
                'pemakaian_10' => $pemakaian1,
                'pemakaian_20' => $pemakaian2,
                'pemakaian_30' => $pemakaian3,
                'pemakaian_30_keatas' => $pemakaian4,
                'tarif_pemakaian_30_keatas' => $tarif4,
                'adm' => $adm,
                'denda' => $denda,
                'total_tagihan' => $total,
                'tanggal_tagihan' => now(),
                'periode_tagihan' => now(),

            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan pencatatan meter baru']);
        }
    }


    public function delete(Request $request)
    {
        $pencatatanMeter = PencatatanMeter::findOrFail($request->id);
        $pencatatanMeter->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus data dan data yang terkait']);
    }

    public function konfirmasi_handler(Request $request)
    {
        $pencatatanMeter = PencatatanMeter::findOrFail($request->id);
        $pencatatanMeter->update(['status_diterima' => $request->status_diterima]);

        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi pencatatan meter']); // atau redirect ke halaman yang diinginkan
    }
}
