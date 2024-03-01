<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use Illuminate\Http\Request;

class BankController extends Controller
{
    public function index(Request $request)
    {
        $bank = Bank::all();

        return inertia('Admin/Bank/Bank', compact('bank'));
    }
    public function store(Request $request)
    {

        $request->validate([
            'nama_bank' => ['required', "string", "min:3"],
            'nama_rek' => ['required', "string", "min:3"],
            'no_rek' => ['required', "min:6"],
        ]);
        $jenis = Bank::create([
            'nama_bank' => $request->nama_bank,
            'nama_rek' => $request->nama_rek,
            'no_rek' => $request->no_rek
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan jenis pengaduan baru']);;
    }

    public function update(Request $request)
    {
        dd($request->all());

        return;
    }
    public function delete(Request $request)
    {

        $jenis = Bank::findOrFail($request->id);
        $jenis->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus jenis pengaduan']);;
    }
}
