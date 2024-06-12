<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\RincianPembayaran;
use App\Models\HargaTarifPerMeter;
use App\Models\MeteranPelanggan;
use App\Models\Pelanggan;
use App\Models\PermintaanSambunganBaru as ModelsPermintaanSambunganBaru;
use App\Models\SambunganBaru;
use App\Models\User;
use App\Models\Wilayah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Validator;

class PermintaanSambunganBaru extends Controller
{
    public function index(Request $request)
    {
        // dd($request->user()->getRoleNames()[0]);
        if ($request->user()->getRoleNames()[0] == 'admin') {
            $query = ModelsPermintaanSambunganBaru::query()->with(['petugas', 'sambungan_baru' => function ($query) {
                $query->with(['harga_tarif', 'bukti_pembayaran']);
            }]);
        } else {
            $query = ModelsPermintaanSambunganBaru::query()->with(['petugas', 'sambungan_baru' => function ($query) {
                $query->with(['harga_tarif', 'bukti_pembayaran']);
            }])->where('petugas_id', $request->user()->id);
        }
        $count = [
            'diterima' => ModelsPermintaanSambunganBaru::where('status_pendaftaran', 'permintaan di terima')->count(),
            'ditolak' => ModelsPermintaanSambunganBaru::where('status_pendaftaran', 'permintaan di ditolak')->count(),
            'menunggu' => ModelsPermintaanSambunganBaru::where('status_pendaftaran', 'menunggu konfirmasi')->count(),
            'all' => ModelsPermintaanSambunganBaru::count(),
        ];
        if ($request->status) $query->where('status_pendaftaran', $request->status);
        if ($request->cari) $query->where('nama_pendaftar', 'like', '%' . $request->cari . '%')->orWhere('nik_pendaftar', 'like', '%' . $request->cari . '%');
        if ($request->dari_tanggal) {
            $query->where('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('created_at', '<=', $request->sampai_tanggal);
        }
        $data = $query->latest()->get();

        return inertia('Admin/PermintaanSambunganBaru/Index', compact('data', 'count'));
    }

    public function cetak(Request $request)
    {
        // dd($request->user()->getRoleNames()[0]);
        if ($request->user()->getRoleNames()[0] == 'admin') {
            $query = ModelsPermintaanSambunganBaru::query()->with(['petugas', 'sambungan_baru' => function ($query) {
                $query->with(['harga_tarif', 'bukti_pembayaran']);
            }]);
        } else {
            $query = ModelsPermintaanSambunganBaru::query()->with(['petugas', 'sambungan_baru' => function ($query) {
                $query->with(['harga_tarif', 'bukti_pembayaran']);
            }])->where('petugas_id', $request->user()->id);
        }
        if ($request->status) $query->where('status_pendaftaran', $request->status);
        if ($request->dari_tanggal) {
            $query->where('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('created_at', '<=', $request->sampai_tanggal);
        }
        $data = $query->latest()->get();

        return inertia('Admin/PermintaanSambunganBaru/Cetak', compact('data',));
    }

    public function konfirmasi(Request $request)
    {
        $permintaan = ModelsPermintaanSambunganBaru::find($request->id);
        if ($request->status == 'permintaan di terima') {
            if ($request->petugas_id == null) {
                return redirect()->back()->withErrors(['error' => 'Gagal Menyetujui, Silahkan Pilih Petugas Dahulu']);
            }
            $permintaan->update([
                'status_pendaftaran' => $request->status,
                'petugas_id' => $request->petugas_id,
            ]);
        }
        if ($request->status == 'permintaan di tolak') {
            if ($request->keterangan == null) {
                return redirect()->back()->withErrors(['error' => 'Silahkan memberikan keterangan terlebih dahulu']);
            }
            $permintaan->update([
                'status_pendaftaran' => $request->status,
                'keterangan' => $request->keterangan,
                'petugas_id' => null,
            ]);
        }

        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengkonfirmasi permintaan pelanggan']);
    }

    public function proses(Request $request)
    {
        // dd($request->all());
        $request->validate([
            "nama_golongan" =>  "required|string",
            "nama_kelompok" =>  "required|string",
            "uang_pendaftaran" =>  "required|numeric|min:5",
            "biaya_perencanaan" =>  "required|numeric|min:5",
            "biaya_pemasangan" =>  "required|numeric|min:5",
            "biaya_instalasi" =>  "required|numeric|min:5",

        ]);
        $permintaan = ModelsPermintaanSambunganBaru::findOrFail($request->id_pemasangan);

        $user = User::findOrFail($permintaan->user_id);
        $dataEmail = [
            'pelanggan' => [
                'kd_pendaftaran' => $permintaan->kd_pendaftaran,
                'nik_pendaftar' => $permintaan->nik_pendaftar,
                'nama_pendaftar' => $permintaan->nama_pendaftar,
                "alamat_pemasangan" => $permintaan->alamat_pemasangan,
                "no_telph" => $permintaan->no_telph,
                'created_at' => Carbon::parse($permintaan->created_at)->format('d-m-Y'),
            ],
            'pembayaran' => [
                'biaya_pendaftaran' => $request->uang_pendaftaran,
                'biaya_pendaftaran' => $request->biaya_perencanaan,
                'biaya_pemasangan' => $request->biaya_pemasangan,
                'biaya_instalasi' => $request->biaya_instalasi,
                'total_pembayaran' => $request->uang_pendaftaran + $request->biaya_perencanaan + $request->biaya_pemasangan + $request->biaya_instalasi,
            ],
            'link_pembayaran' => route('pelanggan.pembayaran-sambungan-baru', $permintaan->id),
        ];
        Mail::to($user->email)->send(new RincianPembayaran($dataEmail));

        $wilayah = Wilayah::where('nama_wilayah', '=', $permintaan->wilayah_pemasangan)->first();
        $tarif = HargaTarifPerMeter::where('kelompok', '=', $request->nama_kelompok)->first();
        $sambunganBaru = SambunganBaru::create([
            'user_id' => $permintaan->user->id,
            'permintaan_sambungan_id' => $permintaan->id,
            'wilayah_id' => $wilayah->id,
            'harga_tarif_per_meter_id' => $tarif->id,
            'no_sambungan' => now()->format('dmy') . "00" . SambunganBaru::count() + 1,
            'nama_pelanggan' => $permintaan->nama_pendaftar,
            'alamat' => $permintaan->alamat_pemasangan,
            'nama_golongan' => $request->nama_golongan,
            'nama_kelompok' => $request->nama_kelompok,
            'uang_pendaftaran' => $request->uang_pendaftaran,
            'biaya_perencanaan' => $request->biaya_perencanaan,
            'biaya_pemasangan' => $request->biaya_pemasangan,
            'biaya_instalasi' => $request->biaya_instalasi,
            'total_biaya' => $request->uang_pendaftaran + $request->biaya_perencanaan + $request->biaya_pemasangan + $request->biaya_instalasi,
            'petugas_id' => $request->user()->id,
            'petugas_yang_memasang' => $request->user()->name,
        ]);

        return redirect()->back();
    }

    public function daftar_tugas(Request $request)
    {
        $query = SambunganBaru::query()->where('petugas_id', $request->user()->id)->with('permintaan');
        $pemasanganBaru = $query->latest()->get();
        if ($request->kategori) {
            $query->where('status_pemasangan', '=', $request->kategori);
        }
        if ($request->cari) {
            $query->where('nama_pelanggan', 'like', '%' . $request->cari . '%');
        }
        $count = SambunganBaru::count_jenis_pemasnagan();
        return inertia('Admin/PermintaanSambunganBaru/DaftarPemasanganSelesai', compact('pemasanganBaru', 'count'));
    }

    public function proses_tugas(Request $request)
    {

        $sambungan = SambunganBaru::with('permintaan')->findOrFail($request->id);
        // $sambungan->update(['status_pemasangan' => 'pemasangan selesai', 'tanggal_pemasangan' => now()]);
        $user = User::findOrFail($sambungan->user_id);


        $meteran = MeteranPelanggan::create([
            'sambungan_baru_id' => $sambungan->id,
            'nik' => $sambungan->permintaan->nik_pendaftar,
            'nama' => $sambungan->permintaan->nama_pendaftar,
            'alamat' => $sambungan->permintaan->alamat_pemasangan,
            'blok' => $sambungan->permintaan->blok,
            'no_telph' => $sambungan->permintaan->no_telph,
            'no_meteran' => now()->format('dmy') . "00" . MeteranPelanggan::count() + 1,
            'no_sambungan' => $sambungan->no_sambungan,
            'nama_golongan' => $sambungan->nama_golongan,
            'nama_kelompok' => $sambungan->nama_kelompok,
            'wilayah_id' => $sambungan->wilayah_id,
            'harga_tarif_per_meter_id' => $sambungan->harga_tarif_per_meter_id,
        ]);
        $user->meteran()->attach($meteran);
    }
}
