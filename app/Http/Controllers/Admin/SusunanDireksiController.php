<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SusunanDireksi;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SusunanDireksiController extends Controller
{
    public function index(Request $request)
    {
        $susunanLevel1 = SusunanDireksi::where('level', '=', 1)->latest()->get();
        $susunanLevel2 = SusunanDireksi::where('level', '=', 2)->latest()->get();
        $susunanLevel3 = SusunanDireksi::where('level', '=', 3)->latest()->get();
        return inertia('Admin/SusunanDireksi/SusunanDireksi', compact('susunanLevel1', 'susunanLevel2', 'susunanLevel3'));
    }
    public function create(Request $request)
    {
        $request->validate([
            "nama" => 'required|string',
            "jabatan" => 'required|string',
            "level" => 'required',
            "foto" => 'required|image|mimes:jpg,jpeg,png',
        ]);
        try {

            $request->validate(['text' => 'string|min:60|required']);
            $susunan = SusunanDireksi::create([
                "nama" => $request->nama,
                "jabatan" => $request->jabatan,
                "level" => $request->level,
                "text" => $request->text,
                "foto" => $request->file('foto')->store('susunan direksi'),
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah direksi baru']);
        } catch (ValidationException $e) {

            return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal menambah susunan direksi silahkan cek kembali form. ']);
        }
    }
    public function update(Request $request)
    {

        $request->validate([
            "nama" => 'required|string',
            "jabatan" => 'required|string',
            "level" => 'required',

        ]);
        if ($request->file('foto')) {
            $request->validate(["foto" => 'required|image|mimes:jpg,jpeg,png',]);
        }
        try {

            $request->validate(['text' => 'string|min:60|required']);
            $susunan = SusunanDireksi::findOrFail($request->id);
            $susunan->update([
                "nama" => $request->nama,
                "jabatan" => $request->jabatan,
                "level" => $request->level,
                "text" => $request->text,
                "foto" => $request->file('foto') ? $request->file('foto')->store('susunan direksi') : $susunan->foto,
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengupdate direksi']);
        } catch (ValidationException $e) {

            return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal mengupdate susunan direksi silahkan cek kembali form. ']);
        }
    }
    public function delete(Request $request, $id)
    {
        $susunan = SusunanDireksi::findOrFail($request->id);
        $susunan->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil mengupdate direksi']);
    }
}
