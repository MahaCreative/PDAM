<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\PembayaranTagihan;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class TagihanBulananController extends Controller
{
    public function show_tagihan(Request $request, $id)
    {
        $tagihan = TagihanBulanan::with('wilayah', 'pembayaranTagihan', 'tarif')->findOrFail($id);
        $date = now();
        $bank = Bank::all();
        return inertia('Pelanggan/TagihanBulanan/ShowTagihan/ShowTagihan', compact('tagihan', 'date', 'bank'));
    }

    public function store_tagihan(Request $request)
    {
        $tagihan = TagihanBulanan::findOrFail($request->id);

        $request->validate([
            'nama_bank_pdam' => 'required',
            'nama_rek_pdam' => 'required',
            'no_rek_pdam' => 'required',
            'nama_bank_pengirim' => 'required',
            'nama_rek_pengirim' => 'required',
            'no_rek_pengirim' => 'required',
            'bukti_pembayaran' => 'required|mimes:jpg,jpeg,png',
        ]);
        $foto = $request->file('bukti_pembayaran')->store('bukti_pembayaran_tagihan');

        $pemabayaran = PembayaranTagihan::create([
            'pelanggan_id' => $request->user()->id,
            'tagihan_id' => $request->id,
            'via_pembayaran' => 'transfer',
            'bank_pengirim' => $request->nama_bank_pengirim,
            'req_pengirim' => $request->nama_rek_pengirim,
            'nama_pengirim' => $request->no_rek_pengirim,
            'bank_pdam' => $request->nama_bank_pdam,
            'nama_pdam' => $request->nama_rek_pdam,
            'req_pdam' => $request->no_rek_pdam,
            'foto_pembayaran' => $foto,
            'tanggal_pembayaran' => now(),
        ]);
        $tagihan->update([
            'status_konfirmasi_pembayaran' => 'menunggu konfirmasi',
            'status_pembayaran' => 'menunggu konfirmasi',
            'status_tunggakan' => 'tidak menunggak'
        ]);
    }
    public function delete_tagihan(Request $request)
    {

        $pemabayaran = PembayaranTagihan::findOrFail($request->id);
        $pemabayaran->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'berhasil menghapus pembayaran',
        ]);
    }
}
