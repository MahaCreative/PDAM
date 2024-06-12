<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\f;
use App\Models\InvoicePembayaranSambungan;
use Illuminate\Http\Request;

class BuktiPembayaranPemasanganBaru extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = InvoicePembayaranSambungan::query()->with('sambungan');
        $invoice = $query->latest()->get();

        return inertia('Admin/BuktiPembayaranSambungan/Index', compact('invoice'));
    }
}
