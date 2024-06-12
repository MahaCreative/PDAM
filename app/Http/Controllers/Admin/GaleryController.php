<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\galery;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = galery::query();
        if ($request->cari) {
            $query->where('judul', 'like', '%' . $request->cari . '%');
        }
        $galery = $query->latest()->get();
        return inertia('Admin/Blog/Galery/Galery', compact('galery'));
    }
    public function create(Request $request)
    {

        $request->validate([
            "judul" => 'required|string|min:16',
            "foto" => 'required|mimes:jpg,jpeg,png',
        ]);

        try {
            $request->validate(['text' => 'string|min:60|required']);
            $berita = galery::create([
                "judul" => $request->judul,
                "slug" => \Str::slug($request->judul),
                "text" => $request->text,
                "foto" => $request->file('foto')->store('berita'),
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah galery baru']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal menambah galery baru silahkan cek kembali form. ']);
        }
    }
    public function update(Request $request)
    {
        $request->validate([
            "judul" => 'required|string|min:16',
            "foto" => 'nullable',
        ]);

        try {

            $request->validate(['text' => 'string|min:60|nullable']);
            $galery = galery::findOrFail($request->id);
            $galery->update([
                "judul" => $request->judul,
                "slug" => \Str::slug($request->judul),
                "text" => $request->text ? $request->text : $galery->text,
                "foto" => $request->file('foto') ? $request->file('foto')->store('galery') : $galery->foto,
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui galery']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal memperbaharui galery baru silahkan cek kembali form. ' . $e->validator->errors()->toArray()['text']]);
        }
    }
    public function delete(Request $request, $id)
    {
        $berita = galery::findOrFail($request->id);
        $berita->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus Galery']);
    }
}
