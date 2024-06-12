<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\InvoicePembayaranSambungan;
use App\Models\PermintaanSambunganBaru;
use App\Models\SambunganBaru;
use Illuminate\Http\Request;

class PembayaranSambunganBaru extends Controller
{
    public function show(Request $request, $id)
    {
        $permintaanSambungan = PermintaanSambunganBaru::findOrFail($id);
        $sambungan = SambunganBaru::where('permintaan_sambungan_id', '=', $permintaanSambungan->id)->first();

        $bank = Bank::latest()->get();
        return inertia('Pelanggan/PembayaranSambungan/PembayaranSambunganBaru', ['pemasanganBaru' => $sambungan, 'bank' => $bank]);
    }

    public function store_pembayaran(Request $request)
    {
        // dd($request->all());
        $sambungan = SambunganBaru::findOrFail($request->id_sambungan);

        $foto = $request->file('bukti_pembayaran')->store('Pelanggan/BuktiPembayaran');
        $invoice = InvoicePembayaranSambungan::create([
            'user_id' => $sambungan->user_id,
            'sambungan_baru_id' => $sambungan->id,
            'foto_bukti_pembayaran' => $foto,
            'nama_pengirim' => $request->nama_rek_pengirim,
            'bank_pengirim' => $request->nama_bank_pengirim,
            'no_rek_pengirim' => $request->no_rek_pengirim,
            'bank_pdam' => $request->nama_bank_pdam,
            'nama_pdam' => $request->nama_rek_pdam,
            'rek_pdam' => $request->no_rek_pdam,
        ]);
    }
}
