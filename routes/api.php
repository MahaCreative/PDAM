<?php

use App\Models\Golongan;
use App\Models\HargaTarifPerMeter;
use App\Models\Kelompok;
use App\Models\Pelanggan;
use App\Models\PemasanganBaru;
use App\Models\TagihanBulanan;
use App\Models\Wilayah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('get-kelompok', function (Request $request) {
    $query = HargaTarifPerMeter::query();
    if ($request->cari !== '') {
        $query->where('kelompok', 'like', '%' . $request->cari . '%');
    }
    $kelompok = $query->where('golongan', 'like', '%' . $request->golongan . '%')
        ->get();
    return response()->json($kelompok);
})->name('api.kelompok');
Route::get('get-golongan', function (Request $request) {
    $golongan = Golongan::where('nama', 'like', '%' . $request->cari . '%')->latest()->get();
    return response()->json($golongan);
});
Route::get('get-wilayah', function (Request $request) {
    $wilaya = Wilayah::where('nama_wilayah', 'like', '%' . $request->cari . '%')->latest()->get();
    return response()->json($wilaya);
});
Route::get('lihat-pemasangan-baru/{id}', function (Request $request, $id) {
    $lihat = PemasanganBaru::with('wilayah', 'hargaTarif', 'tagihan_pemasangan')->where('id', $id)->latest()->first();
    return response()->json($lihat);
});
Route::get('data-pelanggan', function (Request $request) {
    $searchPelanggan = Pelanggan::where('nama_pelanggan', 'like', '%' . $request->cari . '%')->latest()->get();
    return response()->json($searchPelanggan);
});
Route::get('get-pemasangan', function (Request $request) {
    $searchPelanggan = PemasanganBaru::with(['pelanggan'])->orWhere('nama_pelanggan', 'like', '%' . $request->cari . '%')
        ->orWhere('kode_pemasangan_baru', 'like', '%' . $request->cari . '%')
        ->orWhere('no_sambungan', 'like', '%' . $request->cari . '%')
        ->latest()->get();
    return response()->json($searchPelanggan);
});
Route::get('pemasangan-pelanggan', function (Request $request) {
    $searchPelanggan = PemasanganBaru::with(['pelanggan', 'pencatatanMeter' => function ($q) {
        $q->latest()->first();
    }])->where('id', $request->id)->latest()->first();
    return response()->json($searchPelanggan);
});

Route::get('get-tagihan/{id}', function ($id) {
    $tagihan = TagihanBulanan::findOrFail($id);
    return response()->json($tagihan);
});

Route::get('get-meteran', function (Request $request) {
    $pemasangan = PemasanganBaru::where('kode_pemasangan_baru', '=', $request->kode_sambungan)
        ->where('no_sambungan', '=', $request->no_sambungan)->latest()->first();
    return response()->json($pemasangan);
});
