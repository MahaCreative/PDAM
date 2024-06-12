<?php

namespace App\Http\Controllers;

use App\Models\MeteranPelanggan;
use App\Models\PembayaranTagihan;
use App\Models\SettingProfile;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $pembayaran = PembayaranTagihan::where('tagihan_bulanan_id', $request->id)->first();
        $setting = SettingProfile::first();
        $tagihan = TagihanBulanan::findOrFail($request->id);


        $meteran = MeteranPelanggan::where('no_meteran', $pembayaran->no_meter)->first();


        return inertia('PrintInvoice', compact('setting', 'pembayaran', 'meteran', 'tagihan'));
    }
}
