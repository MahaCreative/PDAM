<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = galery::query();
        if ($request->cari) {
            $query->where('judul', 'like', '%' . $request->cari . '%');
        }
        $galery = $query->latest()->get();
        return inertia('Guest/Galery/Galery', compact('galery'));
    }
}
