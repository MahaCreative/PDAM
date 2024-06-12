<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\SambunganBaru;
use Illuminate\Http\Request;

class TagihanPemasanganBaru extends Controller
{
    public function index(Request $request)
    {
        $sambungan = SambunganBaru::with('permintaan')->where('status_pembayaran', 'menunggu pembayaran')->where('user_id', $request->user()->id)->latest()->get();

        return inertia('Pelanggan/TagihanPemasanganBaru/Index', compact('sambungan'));
    }
}
