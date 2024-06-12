<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\MeteranPelanggan;
use App\Models\PembayaranTagihan;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class PembayaranTagihanPelanggan extends Controller
{
    public function show(Request $request, $id)
    {
        $tagihan = TagihanBulanan::with(['pemakaian' => function ($q) {
            $q->with('periode');
        }, 'meteran' => function ($q) {
            $q->with('harga_tarif');
        }, 'pembayaran'])->findOrFail($id);
        $bank = Bank::latest()->get();

        return inertia('Pelanggan/TagihanPemakaianAir/Show', compact('tagihan', 'bank'));
    }


    public function konfirmasi(Request $request)
    {

        $pembayaran = PembayaranTagihan::findOrFail($request->id);
        if ($request->status == 'pembayaran di terima') {
            $tagihan = TagihanBulanan::with('pemakaian')->findOrFail($pembayaran->tagihan_bulanan_id);
            $cekTagihan = TagihanBulanan::where('pencatatan_meter_id', $tagihan->pencatatan_meter_id)->whereNotIn('id', [$tagihan->id])->where('status_pembayaran', '=', 'belum lunas')->get();
            if (count($cekTagihan) < 3) {
                $meter = MeteranPelanggan::findOrFail($tagihan->meteran_pelanggan_id);
                $meter->update(['status_meteran' => 'aktif']);
            }

            $tagihan->update([
                'status_pembayaran' => 'lunas',
                'status_tunggakan' => 'tidak menunggak',
                'tanggal_pembayaran' => now(),
                'nama_petugas_konfirmasi' => $request->user()->name,
            ]);

            $tagihan->pemakaian->update([
                'tanggal_pembayaran' => now(),
                'status_pembayaran' => 'lunas'
            ]);
        }


        $pembayaran->update(['status_pembayaran' => $request->status, 'nama_petugas_konfirmasi' => $request->user()->name]);
    }

    public function history_pembayaran(Request $request)
    {
        $query = PembayaranTagihan::query()->with(['tagihan' => function ($q) {
            $q->with('meteran', 'periode');
        }])->latest();
        $count = [
            'diterima' => PembayaranTagihan::where('status_pembayaran', 'pembayaran di terima')->count(),
            'ditolak' => PembayaranTagihan::where('status_pembayaran', 'pembayaran di tolak')->count(),
            'menunggu' => PembayaranTagihan::where('status_pembayaran', 'menunggu konfirmasi')->count(),
            'all' => PembayaranTagihan::count(),
        ];
        if ($request->status) $query->where('status_pembayaran', '=', $request->status);
        if ($request->cari) {
            $query->where('nama_pengirim', 'like', '%' . $request->cari . '%')->orWhere('no_rek_pengirim', 'like', '%' . $request->cari . '%');
        }
        if ($request->bulan) {
            $query->whereHas('tagihan.periode', function ($q) use ($request) {
                $q->where('bulan', $request->bulan);
            });
        }
        if ($request->tahun) {
            $query->whereHas('tagihan.periode', function ($q) use ($request) {
                $q->where('tahun', $request->tahun);
            });
        }
        $tagihan = $query->latest()->get();
        // dd($tagihan);
        return inertia('Pelanggan/TagihanPemakaianAir/HistoryPembayaran', compact('tagihan', 'count'));
    }
    public function cetak(Request $request)
    {
        $query = PembayaranTagihan::query()->with(['tagihan' => function ($q) {
            $q->with('meteran', 'periode');
        }])->latest();

        if ($request->status) $query->where('status_pembayaran', '=', $request->status);
        if ($request->cari) {
            $query->where('nama_pengirim', 'like', '%' . $request->cari . '%')->orWhere('no_rek_pengirim', 'like', '%' . $request->cari . '%');
        }
        if ($request->bulan) {
            $query->whereHas('tagihan.periode', function ($q) use ($request) {
                $q->where('bulan', $request->bulan);
            });
        }
        if ($request->tahun) {
            $query->whereHas('tagihan.periode', function ($q) use ($request) {
                $q->where('tahun', $request->tahun);
            });
        }
        $tagihan = $query->latest()->get();
        // dd($tagihan);
        return inertia('Pelanggan/TagihanPemakaianAir/Cetak', compact('tagihan',));
    }
}
