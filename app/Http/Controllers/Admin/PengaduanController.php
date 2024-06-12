<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;

class PengaduanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengaduan::query()->with('jenis_pengaduan');
        $pengaduan = $query->latest()->get();
        return inertia('Admin/Pengaduan/Index', compact('pengaduan'));
    }

    public function show(Request $request, $kd_pengadauan)
    {
        $pengaduan = Pengaduan::with('jenis_pengaduan')->where('kd_pengaduan', $kd_pengadauan)->latest()->first();
        return inertia('Admin/Pengaduan/Show', compact('pengaduan'));
    }

    public function konfirmasi(Request $request)
    {

        $pengaduan = Pengaduan::findOrFail($request->id);
        $pengaduan->update(['status_konfirmasi' => $request->status]);
        return redirect()->back();
    }

    public function proses(Request $request)
    {

        $request->validate([
            "status_fakta" => "required",
            'status' => 'required',
            "hasil_lapangan" => "required|string|min:20",
        ]);
        $pengaduan = Pengaduan::findOrFail($request->id);
        $pengaduan->update([
            "tanggal_proses_pengaduan" => now(),
            "status_fakta" => $request->status_fakta,
            "hasil_lapangan" => $request->hasil_lapangan,
            "status" => $request->status,
            "nama_petugas_menangani" => $request->user()->name,
        ]);
    }
}
