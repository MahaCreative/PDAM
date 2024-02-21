<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HargaTarifPerMeter;
use App\Models\PemasanganBaru;
use App\Models\TagihanSambunganBaru;
use App\Models\Wilayah;
use Illuminate\Http\Request;

class PemasanganBaruController extends Controller
{
    public function index(Request $request)
    {
        $roles = $request->user()->getRoleNames()[0];

        $query = PemasanganBaru::query();
        // dd($request->all());
        // $pemasanganBaru = PemasanganBaru::with('pelanggan', 'wilayah')->whereMonth('tgl_pemasangan', $request->bulan ? $request->bulan : now()->month)
        $pemasanganBaru = PemasanganBaru::with('wilayah')->whereMonth('tgl_pemasangan', $request->bulan ? $request->bulan : now()->month)
            ->whereYear('tgl_pemasangan', $request->tahun ? $request->tahun : now()->year)
            ->latest()->get();



        return inertia('Admin/PemasanganBaru/PemasanganBaru', compact('pemasanganBaru', 'roles'));
    }
    public function store(Request $request)
    {
        // dd($request->all());
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
        return redirect()->back();
    }

    public function update(Request $request)
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
        // dd($request->nama_golongan);
        $attr['wilayah_id'] = Wilayah::where('nama_wilayah', $request->wilayah)->first()->id;
        $getHargaTarif = HargaTarifPerMeter::where('golongan', $request->nama_golongan)->where('kelompok', $request->nama_kelompok)
            ->first();

        $attr['harga_tarif_id'] = $getHargaTarif->id;
        $pemasanganBaru = PemasanganBaru::findOrFail($request->id);
        $pemasanganBaru->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $pemasanganBaru = PemasanganBaru::findOrFail($request->id);
        $pemasanganBaru->delete();
        return redirect()->back();
    }

    public function konfirmasi_permintaan(Request $request)
    {

        $pemasanganBaru = PemasanganBaru::findOrFail($request->id);
        if ($request->data == 'lunas') {
            $pemasanganBaru->update([
                'status_pembayaran' => $request->data,
            ]);
        } else {
            $pemasanganBaru->update([
                'status_pembayaran' => $request->data,
                'status_pemasangan' => 'menunggu konfirmasi',
                'nama_petugas_yang_menangani' => null,
            ]);
        }

        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil konfirmasi pemasangan']);
    }

    public function konfirmasi_pemasangan(Request $request)
    {
        $pemasanganBaru = PemasanganBaru::findOrFail($request->idPemasangan);
        if ($request->value == 'proses pemasangan') {
            if ($request->namaPetugas == null) {
                return redirect()->back()->with(['type' => 'error', 'message' => 'silahkan mengisikan nama petugas terlebi dahulu']);
            } else {
                $pemasanganBaru->update([
                    'status_pemasangan' => $request->value,
                    'nama_petugas_yang_menangani' => $request->namaPetugas,
                ]);
                return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi permintaan']);
            }
        }
        if ($request->value == 'selesai') {
            $pemasanganBaru->update([
                'status_pemasangan' => $request->value,
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi permintaan']);
        }
        if ($request->value == 'menunggu pengecekan') {
            $pemasanganBaru->update([
                'status_pemasangan' => $request->value,
                'nama_petugas_yang_menangani' => null
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi permintaan']);
        }
    }
}
