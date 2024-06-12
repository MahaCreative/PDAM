<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Info;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InfoController extends Controller
{
    public function index(Request $request)
    {
        $query = Info::query();
        if ($request->cari) {
            $query->where('judul', 'like', '%' . $request->cari . '%');
        }
        $info = $query->latest()->get();
        return inertia('Admin/Blog/InfoPdam/InfoPdam', compact('info'));
    }
    public function create(Request $request)
    {

        $request->validate([
            "judul" => 'required|string|min:16',
            "foto" => 'required|mimes:jpg,jpeg,png',
        ]);

        try {
            $request->validate(['text' => 'string|min:60|required']);
            $berita = Info::create([
                "judul" => $request->judul,
                "slug" => \Str::slug($request->judul),
                "text" => $request->text,
                "foto" => $request->file('foto')->store('berita'),
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambah berita baru']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal menambah berita baru silahkan cek kembali form. ']);
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
            $berita = Info::findOrFail($request->id);
            $berita->update([
                "judul" => $request->judul,
                "slug" => \Str::slug($request->judul),
                "text" => $request->text ? $request->text : $berita->text,
                "foto" => $request->file('foto') ? $request->file('foto')->store('berita') : $berita->foto,
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui berita']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Gagal memperbaharui berita baru silahkan cek kembali form. ' . $e->validator->errors()->toArray()['text']]);
        }
    }
    public function delete(Request $request, $id)
    {
        $berita = Info::findOrFail($request->id);
        $berita->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus berita']);
    }
}
