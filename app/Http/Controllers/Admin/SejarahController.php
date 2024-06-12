<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sejarah;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SejarahController extends Controller
{
    public function index(Request $request)
    {
        $sejarah = Sejarah::latest()->get();
        $status = Status::first();
        return inertia('Admin/Sejarah/Sejarah', compact('sejarah', 'status'));
    }

    public function update_status(Request $request)
    {
        try {
            $request->validate(['status' => 'required|string|min:60']);
            $status = Status::first();
            $status->update(['text' => $request->status]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui status perusahaan']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => $e->validator->errors()->toArray()['status']]);
        }
    }
    public function create_sejarah(Request $request)
    {
        // dd($request->all());
        try {
            $request->validate(['tahun' => 'required|numeric|min:4', 'text' => 'required|string|min:60']);
            $status = Sejarah::create([
                'tahun' => $request->tahun,
                'text' => $request->text,
            ]);

            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil membuat sejarah perusahaan']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'gagal membuat sejarah silahkan isi form dengan benar']);
        }
    }
    public function update_sejarah(Request $request)
    {

        try {
            $request->validate(['tahun' => 'required|numeric|min:4', 'text' => 'required|string|min:60']);
            $sejarah = Sejarah::findOrFail($request->id);
            $status = $sejarah->update([
                'tahun' => $request->tahun,
                'text' => $request->text,
            ]);

            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui sejarah perusahaan']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'gagal memperbaharui sejarah silahkan isi form dengan benar']);
        }
    }
    public function delete_sejarah(Request $request, $id)
    {
        $sejarah = Sejarah::findOrFail($id);
        $sejarah->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus sejarah perusahaan']);
    }
}
