<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Golongan;
use App\Models\Kelompok;
use Illuminate\Http\Request;

class GolonganKelompokController extends Controller
{
    public function index(Request $request)
    {
        $golongan = Golongan::latest()->get();
        $kelompok = Kelompok::latest()->get();
        return inertia('Admin/GolonganKelompok/Index', compact('kelompok', 'golongan'));
    }
    public function store(Request $request)
    {
        dd($request->all());
        return;
    }

    public function postGolongan(Request $request)
    {
        $attr = $request->validate(['nama' => 'string|required']);
        $golongan = Golongan::create($attr);
        return redirect()->back();
    }
    public function postKelompok(Request $request)
    {
        $attr = $request->validate(['nama' => 'string|required']);
        $kelompok = Kelompok::create($attr);
        return redirect()->back();
    }
    public function deleteGolongan(Request $request, $id)
    {
        $golongan = Golongan::findOrFail($id);
        $golongan->delete();
        return redirect()->back();
    }

    public function deleteKelompok(Request $request, $id)
    {

        $kelompok = Kelompok::findOrFail($id);
        $kelompok->delete();
        return redirect()->back();
    }
}
