<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;

class StrukturOrganisasiController extends Controller
{
    public function index(Request $request)
    {
        $struktur = StrukturOrganisasi::first();
        return inertia('Guest/StrukturOrganisasi/Index', compact('struktur'));
    }
}
