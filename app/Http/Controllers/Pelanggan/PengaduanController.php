<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use App\Models\Pengaduan;
use App\Models\User;
use Illuminate\Http\Request;

class PengaduanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengaduan::query()->with('jenis_pengaduan')->where('user_id', $request->user()->id);
        $pengaduan = $query->latest()->get();
        return inertia('Pelanggan/Pengaduan/Index', compact('pengaduan'));
    }

    public function create(Request $request)
    {
        $jenisPengaduan = JenisPengaduan::latest()->get();
        return inertia('Pelanggan/Pengaduan/Create', compact('jenisPengaduan'));
    }

    public function store(Request $request)
    {
        $get_petugas_lapangan = User::with(['roles', 'petugas'])->whereHas('roles', function ($query) {
            $query->where('name', 'petugas lapangan');
        })->inRandomOrder()->limit(1)->get();
        // dd($get_petugas_lapangan[0]->petugas->no_hp);
        if (
            $request->langtitude == "" or
            $request->longtitude == ""
        ) {
            return redirect()->back()->withErrors(['message' => 'Silahkan pilih lokasi pelaporan terlebih dahulu']);
        }
        // dd($request->all());
        $attr = $request->validate([
            "jenis_pengaduan_id" => "required",
            "nama_pelapor" => "required|string|min:3",
            "alamat" => "required|string|min:10",
            "no_telp" => "required|numeric|digits:12",
            "pengaduan" => "required|string|min:20",
            "foto" => "required|image|mimes:png,jpeg,jpg",
        ]);

        $attr['user_id'] = $request->user()->id;
        $attr["kd_pengaduan"] = now()->format('dmy') . Pengaduan::count() + 1;
        $attr["tanggal_pengaduan"] = now();
        $attr['langtitude'] = $request->langtitude;
        $attr['longtitude'] = $request->longtitude;
        $attr['foto'] = $request->file('foto')->store('FotoPengaduan');

        $attr['nama_petugas_menangani'] = $get_petugas_lapangan[0]->petugas->nama;
        $attr['nomor_handphone_petugas'] = $get_petugas_lapangan[0]->petugas->no_hp;
        $pengaduan = Pengaduan::create($attr);
        return redirect()->route('admin.show-pengaduan-pelanggan', $attr['kd_pengaduan']);
    }

    public function show(Request $request, $kd_pengadauan)
    {
        $pengaduan = Pengaduan::with('jenis_pengaduan')->where('kd_pengaduan', $kd_pengadauan)->latest()->first();
        return inertia('Admin/Pengaduan/Show', compact('pengaduan'));
    }
}
