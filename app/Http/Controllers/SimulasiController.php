<?php

namespace App\Http\Controllers;

use App\Models\HargaTarifPerMeter;
use Illuminate\Http\Request;

class SimulasiController extends Controller
{
    //
    public function index(Request $request)
    {
        $tarif = HargaTarifPerMeter::all();
        return inertia('Guest/Simulasi/Index', compact('tarif'));
    }
}
