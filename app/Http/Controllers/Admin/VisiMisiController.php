<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Misi;
use App\Models\Visi;
use Illuminate\Http\Request;

class VisiMisiController extends Controller
{
    public function index(Request $request)
    {
        $visi = Visi::first();
        $misi = Misi::latest()->get();
        return inertia('Admin/VisiMisi/VisiMisi', compact('visi', 'misi'));
    }

    public function update_visi(Request $request)
    {
        $request->validate(['visi' => 'required|string|min:20']);
        $visi = Visi::first();
        $visi->update(['visi' => $request->visi]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui visi perusahaan']);
    }
    public function create_misi(Request $request)
    {

        if ($request->file('icon') == null) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Harus memasukkan icon agar terlihat menarik']);
        }
        $request->validate(['misi' => 'required|min:20|string', 'icon' => 'required|image|mimes:jpg,jpeg,png',]);

        $misi = Misi::create([
            'misi' => $request->misi,
            'icon' => $request->file('icon')->store('icon/visi')
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan misi perusahaan']);
    }
    public function update_misi(Request $request)
    {

        if ($request->file('icon') == null) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Harus memasukkan icon agar terlihat menarik']);
        }
        $request->validate(['misi' => 'required|min:20|string', 'icon' => 'required|image|mimes:jpg,jpeg,png',]);
        $misi = Misi::findOrFail($request->id);
        $misi->update([
            'misi' => $request->misi,
            'icon' => $request->file('icon')->store('icon/visi')
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil merubah misi perusahaan']);
    }
    public function delete_misi(Request $request, $id)
    {

        $misi = Misi::findOrFail($request->id);
        $misi->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus misi perusahaan']);
    }
}
