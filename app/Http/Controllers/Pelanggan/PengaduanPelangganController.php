<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use App\Models\PengaduanPelanggan;
use Illuminate\Http\Request;

class PengaduanPelangganController extends Controller
{
    public function index(Request $request)
    {
        $jenisPengaduan = JenisPengaduan::all();
        $pengaduan = PengaduanPelanggan::all();
        return inertia('Pelanggan/PengaduanPelanggan/PengaduanPelanggan', compact('pengaduan', 'jenisPengaduan'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'jenis_id' => ["required"],
            'judul_pengaduan' =>  ["required", "string", "min:12"],
            'text' => ["required", "string", "min:12"],
            'foto' =>  ['mimes:png,jpeg,jpg'],
            'nomor_hp' =>  ["required", "numeric", "min:12"],
            'alamat' => ["required", "string", "min:12"],
        ]);

        $attr['pelanggan_id'] = $request->user()->pelanggan->id;
        $attr['petugas_id'] = 1;
        $attr['status_dilihat'] = 'belum di lihat';
        $foto = $request->file('foto') ? $request->file('foto')->store('pengaduan') : null;
        $attr['foto'] = $foto;
        $pengaduan = PengaduanPelanggan::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil menambahkan pengaduan']);
    }
}
