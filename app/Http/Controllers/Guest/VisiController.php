<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Misi;
use App\Models\Visi;
use Illuminate\Http\Request;

class VisiController extends Controller
{
    public function index(Request $request)
    {
        $visi = Visi::first();
        $misi = Misi::all();
        return inertia('Guest/VisiMisi/Index', compact('visi', 'misi'));
    }
}
