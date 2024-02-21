<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    public function index(Request $request)
    {
        $query = Pelanggan::query();
        if ($request->bulan !== '' or $request->tahun !== '') {
            $query->whereYear('created_at', $request->tahun ? $request->tahun : now()->year)
                ->whereMonth('created_at', $request->bulan ? $request->bulan : now()->month);
        }
        if ($request->cari) {
            $query->orWhere('nama_pelanggan', 'like', '%' . $request->cari . '%')
                ->orWhere('no_ktp', 'like', '%' . $request->cari . '%');
        }
        $pelanggan = $query->latest()->get();
        return inertia('Admin/Pelanggan/Pelanggan', compact('pelanggan'));
    }
    public function store(Request $request)
    {

        $attr = $request->validate([
            'no_ktp' => 'required|numeric|min:16|unique:pelanggans,no_ktp',
            'nama_pelanggan' => 'required|string',
            'alamat' => 'required|string',
            'kecamatan' => 'required|string',
            'foto' => 'image|mimes:png,jpg,jpeg',
            'no_telp' => 'required|unique:pelanggans,no_telp|numeric',
        ]);
        $kdPelanggan = 'P/0' . Pelanggan::count() + 1 . '/D/' . now()->format('ymd');
        $attr['kd_pelanggan'] = $kdPelanggan;
        $attr['petugas_id'] = $request->user() ? $request->user()->id : null;
        $attr['foto'] = $request->file('foto') ? $request->file('foto')->store('Foto') : null;
        $attr['konfirmasi'] = 'di setujui';
        $pelanggan = Pelanggan::create($attr);
        return redirect()->back();
    }

    public function update(Request $request)
    {

        $attr = $request->validate([
            'no_ktp' => 'required|numeric|min:16',
            'nama_pelanggan' => 'required|string',
            'alamat' => 'required|string',
            'kecamatan' => 'required|string',
            'foto' => 'image|mimes:png,jpg,jpeg',
            'no_telp' => 'required',
        ]);
        $attr['foto'] = $request->file('foto') ? $request->file('foto')->store('Foto') : null;
        $pelanggan = Pelanggan::FindOrFail($request->id);
        $pelanggan->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $pelanggan = Pelanggan::FindOrFail($request->id);
        $pelanggan->delete();
        return redirect()->back();
    }
}
