<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query();
        if ($request->cari) {
            $query->where('judul', 'like', '%' . $request->cari . '%');
        }
        $berita = $query->latest()->get();
        return inertia('Guest/Berita/Berita', compact('berita'));
    }
}
