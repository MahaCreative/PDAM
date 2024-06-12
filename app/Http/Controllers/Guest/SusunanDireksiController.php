<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\SusunanDireksi;
use Illuminate\Http\Request;

class SusunanDireksiController extends Controller
{
    public function index(Request $request)
    {
        $susunanLevel1 = SusunanDireksi::where('level', '=', 1)->latest()->get();
        $susunanLevel2 = SusunanDireksi::where('level', '=', 2)->latest()->get();
        $susunanLevel3 = SusunanDireksi::where('level', '=', 3)->latest()->get();
        return inertia('Guest/SusunanDireksi/Index', compact('susunanLevel1', 'susunanLevel2', 'susunanLevel3'));
    }
}
