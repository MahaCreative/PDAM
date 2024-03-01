<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use Illuminate\Http\Request;

class JenisPengaduanController extends Controller
{
    public function index(Request $request)
    {
        $jenis = JenisPengaduan::all();

        return inertia('Admin/JenisPengaduan/JenisPengaduan', compact('jenis'));
    }
    public function store(Request $request)
    {


        $jenis = JenisPengaduan::create(['jenis_pengaduan' => $request->data]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan jenis pengaduan baru']);;
    }

    public function update(Request $request)
    {
        dd($request->all());

        return;
    }
    public function delete(Request $request)
    {

        $jenis = JenisPengaduan::findOrFail($request->id);
        $jenis->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus jenis pengaduan']);;
    }
}
