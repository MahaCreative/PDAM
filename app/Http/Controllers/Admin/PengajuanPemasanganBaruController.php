<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HargaTarifPerMeter;
use App\Models\PemasanganBaru;
use App\Models\PermintaanSambunganBaru;
use App\Models\Wilayah;
use Illuminate\Http\Request;

class PengajuanPemasanganBaruController extends Controller
{
    public function index(Request $request)
    {
        $query = PermintaanSambunganBaru::query();
        $permintaan = $query->with('pelanggan')->get();
        return inertia('Admin/PermintaanSambunganBaru/PermintaanSambunganBaru', compact('permintaan'));
    }

    public function proses(Request $request)
    {

        $request->validate(['wilayah' => 'required']);
        $attr = $request->validate([

            'kode_pemasangan_baru' => 'required',
            'no_sambungan' => 'required',
            'nama_pelanggan' => 'required',
            'alamat_pemasangan' => 'required',
            'nama_golongan' => 'required',
            'nama_kelompok' => 'required',

            'pipa_diameter' => 'required',
        ]);
        $payment = $request->validate([
            'uang_pendaftaran' => 'required',
            'biaya_perencanaan' => 'required',
            'biaya_pemasangan' => 'required',
            'biaya_instalasi' => 'required',
            'total_biaya' => 'required',
        ]);


        $attr['wilayah_id'] = Wilayah::where('nama_wilayah', $request->wilayah)->first()->id;
        $attr['harga_tarif_id'] = HargaTarifPerMeter::where('golongan', $request->nama_golongan)->where('kelompok', $request->nama_kelompok)
            ->first()->id;
        $attr['tgl_pemasangan'] = now();
        $pemasanganBaru = PemasanganBaru::create($attr);
        $pemasanganBaru->pelanggan()->attach($request->pelanggan_id);
        $pemasanganBaru->tagihan_pemasangan()->create($payment);
        $permintaan = PermintaanSambunganBaru::findOrFail($request->idPermintaan);
        $permintaan->update([
            'petugas_id' => $request->user()->petugas->id,
            'pemasangan_baru_id' => $pemasanganBaru->id,
            'status_permintaan' => 'pengajuan diterima'
        ]);
        return redirect()->back();
    }
}
