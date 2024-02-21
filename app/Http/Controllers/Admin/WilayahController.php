<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wilayah;
use Illuminate\Http\Request;

class WilayahController extends Controller
{
    public function index(Request $request)
    {
        $wilayah = Wilayah::withCount('pemasanganBaru')->latest()->get();
        return inertia('Admin/Wilayah/Wilayah', compact('wilayah'));
    }
    public function store(Request $request)
    {
        $attr = $request->validate([
            'nama_wilayah' => 'required|string',
            'deskripsi_wilayah' => 'required|string',
        ]);
        $attr['kode_wilayah'] = "WL" . Wilayah::count() + 1;
        $kodeWilayah = Wilayah::create($attr);
        return redirect()->back();
    }

    public function update(Request $request)
    {
        $attr = $request->validate([
            'nama_wilayah' => 'required|string',
            'deskripsi_wilayah' => 'required|string',
        ]);
        $wilayah = Wilayah::findOrFail($request->id);
        $wilayah->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {

        $wilayah = Wilayah::findOrFail($request->id);
        $wilayah->delete();
        return redirect()->back();
    }
}
