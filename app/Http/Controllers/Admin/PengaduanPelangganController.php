<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PengaduanPelanggan;
use Illuminate\Http\Request;

class PengaduanPelangganController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = PengaduanPelanggan::query();
        $pengaduan = $query->latest()->get();
        return inertia('Admin/PengaduanPelanggan/PengaduanPelanggan', compact('pengaduan'));
    }
}
