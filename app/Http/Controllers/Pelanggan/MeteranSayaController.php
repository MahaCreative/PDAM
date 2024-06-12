<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\MeteranPelanggan;
use Illuminate\Http\Request;

class MeteranSayaController extends Controller
{
    public function index(Request $request)
    {

        $meteranSaya = $request->user()->meteran()->with('pemakaian', 'tagihan')
            ->withCount(['pemakaian as lunas' => function ($q) {
                $q->where('status_pembayaran', 'lunas');
            }, 'pemakaian as belum_lunas' => function ($q) {
                $q->where('status_pembayaran', 'belum lunas');
            }, 'tagihan'])->get();

        return inertia("Pelanggan/Meteran/Index", compact('meteranSaya'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nomor_meter' => 'required|numeric',
            'nomor_sambungan' => 'required|numeric'
        ]);
        $meteranPelanggan = MeteranPelanggan::where('no_meteran', '=', $request->nomor_meter)->where('no_sambungan', '=', $request->nomor_sambungan)->first();
        if ($meteranPelanggan) {
            $request->user()->meteran()->attach($meteranPelanggan->id);
            return redirect()->back()->with('success', 'Meteran berhasil ditambahkan');
        } else {
            return redirect()->back()->with('error', 'Meteran tidak ditemukan');
        }
    }

    public function delete(Request $request)
    {
        $request->user()->meteran()->detach($request->id);
    }
}
