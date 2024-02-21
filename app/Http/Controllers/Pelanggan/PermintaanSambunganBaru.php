<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\PermintaanSambunganBaru as ModelsPermintaanSambunganBaru;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PermintaanSambunganBaru extends Controller
{
    public function index(Request $request)
    {
        $query = ModelsPermintaanSambunganBaru::query();
        $permintaan = $query->where('pelanggan_id', $request->user()->pelanggan->id)->get();
        return inertia('Pelanggan/PermintaanSambunganBaru/PermintaanSambunganBaru', compact('permintaan'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'foto_ktp' => ['required', 'mimes:png,jpeg,jpeg'],
            'foto_kk' => ['required', 'mimes:png,jpeg,jpeg'],
            'foto_rekening_air_tetangga' => ['required', 'mimes:png,jpeg,jpeg'],
            'no_telph' => ['required', 'numeric', 'min:12'],
            'alamat_pemasangan' => ['required', 'min:12', 'string'],
            'wilayah' => ['required'],
            'nama_kelompok' => ['required'],
            'nama_golongan' => ['required'],
        ]);

        $attr['pelanggan_id'] = $request->user()->pelanggan->id;
        $attr['foto_ktp'] = $request->file('foto_ktp')->store('Image/foto_ktp');
        $attr['foto_kk'] = $request->file('foto_kk')->store('Image/foto_kk');
        $attr['foto_rekening_air_tetangga'] = $request->file('foto_rekening_air_tetangga')->store('Image/foto_rekening_air_tetangga');

        $permintaan = ModelsPermintaanSambunganBaru::create($attr);
        return redirect()->back()->with(['message' => 'Berhasil melakukan pengajuan', 'type' => 'success']);
    }
}
