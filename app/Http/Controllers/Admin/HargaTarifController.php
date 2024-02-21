<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Golongan;
use App\Models\HargaTarifPerMeter;
use App\Models\Kelompok;
use Illuminate\Http\Request;

class HargaTarifController extends Controller
{

    public function index(Request $request)
    {
        $golonganCount = Golongan::withCount('pemasangan')->get();
        $kelompokCount = Kelompok::withCount('pemasangan')->get();
        // return $kelompokCount;
        $hargaTarif = HargaTarifPerMeter::with('kelompok', 'golongan')->get();

        return inertia('Admin/HargaTarif/Index', compact('golonganCount', 'kelompokCount', 'hargaTarif'));
    }
    public function store(Request $request)
    {
        $attr = $request->validate([
            'golongan' => 'required',
            'kelompok' => 'required',
            'tarif1' => 'required|numeric',
            'tarif2' => 'required|numeric',
            'tarif3' => 'required|numeric',
            'tarif4' => 'required|numeric',
            'adm' => 'required|numeric',
            'denda' => 'required|numeric',
        ]);
        $hargaTarif = HargaTarifPerMeter::create($attr);
        return redirect()->back();
    }

    public function update(Request $request)
    {
        $attr = $request->validate([
            'golongan' => 'required',
            'kelompok' => 'required',
            'tarif1' => 'required|numeric',
            'tarif2' => 'required|numeric',
            'tarif3' => 'required|numeric',
            'tarif4' => 'required|numeric',
            'adm' => 'required|numeric',
            'denda' => 'required|numeric',
        ]);
        $hargaTarif = HargaTarifPerMeter::findOrFail($request->id);
        $hargaTarif->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $hargaTarif = HargaTarifPerMeter::findOrFail($request->id);
        $hargaTarif->delete();
        return redirect()->back();
    }
}
