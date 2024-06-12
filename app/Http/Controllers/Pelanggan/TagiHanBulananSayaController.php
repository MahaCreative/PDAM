<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\PembayaranTagihan;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class TagiHanBulananSayaController extends Controller
{
    public function index(Request $request)
    {
        $id = [];
        $meteran = $request->user()->meteran;
        foreach ($meteran as $item) {
            $id[] = $item->id;
        }
        $query = TagihanBulanan::query()->whereIn('meteran_pelanggan_id', $id)->with(['meteran', 'pemakaian' => function ($q) {
            $q->with('periode');
        }]);
        $tagihan = $query->latest()->get();
        $count = [
            'lunas' => TagihanBulanan::whereIn('meteran_pelanggan_id', $id)->where('status_pembayaran', 'lunas')->count(),
            'belum_lunas' => TagihanBulanan::whereIn('meteran_pelanggan_id', $id)->where('status_pembayaran', 'belum lunas')->count(),
            'menunggak' => TagihanBulanan::whereIn('meteran_pelanggan_id', $id)->where('status_tunggakan', 'menunggak')->count(),
            'tidak_menunggak' => TagihanBulanan::whereIn('meteran_pelanggan_id', $id)->where('status_tunggakan', 'like', '%' . 'tidak menunggak' . '%')->count(),
        ];

        return inertia('Pelanggan/TagihanPemakaianAir/Index', compact('tagihan', 'count'));
        // $tagihan =
    }

    public function show(Request $request, $id)
    {
        $tagihan = TagihanBulanan::with(['pemakaian' => function ($q) {
            $q->with('periode');
        }, 'meteran' => function ($q) {
            $q->with('harga_tarif');
        }])->findOrFail($id);


        return inertia('Pelanggan/TagihanPemakaianAir/Show', compact('tagihan',));
    }

    public function store_pembayaran(Request $request)
    {

        $attr = $request->validate([
            'nama_bank_pdam' => 'required|string',
            'nama_rek_pdam' => 'required|string',
            'no_rek_pdam' => 'required|string|min:6',
            'nama_bank_pengirim' => 'required|string',
            'nama_rek_pengirim' => 'required|string',
            'no_rek_pengirim' => 'required|numeric|min:6',
            'bukti_pembayaran' => 'required|image|mimes:png,jpeg,jpg',
        ]);
        $cek = TagihanBulanan::with('pemakaian')->findOrFail($request->tagihan_id);

        $foto = $request->file('bukti_pembayaran')->store('Bukti Pembayaran Tagihan');
        $tagihan = PembayaranTagihan::create([
            'tagihan_bulanan_id' => $cek->id,
            'periode_tagihan_id' => $cek->pemakaian->periode_tagihan_id,
            'foto_bukti_pembayaran' => $foto,
            'nama_pengirim' => $request->nama_rek_pengirim,
            'bank_pengirim' => $request->nama_bank_pengirim,
            'no_rek_pengirim' => $request->no_rek_pengirim,
            'bank_pdam' => $request->nama_bank_pdam,
            'nama_pdam' => $request->nama_rek_pdam,
            'rek_pdam' => $request->no_rek_pdam,
            'user_id' => $request->user()->id
        ]);
    }

    public function history_pembayaran(Request $request)
    {
        $tagihan = PembayaranTagihan::with(['tagihan' => function ($q) {
            $q->with('meteran', 'periode');
        }])->where('user_id', $request->user()->id)->latest()->get();
        $count = [
            'diterima' => PembayaranTagihan::where('user_id', $request->user()->id)->where('status_pembayaran', 'pembayaran di terima')->count(),
            'ditolak' => PembayaranTagihan::where('user_id', $request->user()->id)->where('status_pembayaran', 'pembayaran di tolak')->count(),
            'all' => PembayaranTagihan::where('user_id', $request->user()->id)->count(),
        ];

        return inertia('Pelanggan/TagihanPemakaianAir/HistoryPembayaran', compact('tagihan', 'count'));
    }
}
