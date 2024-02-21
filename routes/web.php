<?php

use App\Http\Controllers\Admin\GolonganKelompokController;
use App\Http\Controllers\Admin\HargaTarifController;
use App\Http\Controllers\Admin\PelangganController;
use App\Http\Controllers\Admin\PemasanganBaruController;
use App\Http\Controllers\Admin\PencatatanMeterController;
use App\Http\Controllers\Admin\PengajuanPemasanganBaruController;
use App\Http\Controllers\Admin\TagihanBulananController;
use App\Http\Controllers\Admin\TagihanTunggakancontroller;
use App\Http\Controllers\Admin\WilayahController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Pelanggan\PermintaanSambunganBaru;
use App\Http\Controllers\Pelanggan\SambunganPelangganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SettingProfileController;
use App\Http\Controllers\SuperAdmin\SettingAppsController;
use App\Models\PemasanganBaru;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/





Route::middleware(['guest'])->group(function () {
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
});
Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('admin-pengajuan-pemasangan-baru', [PengajuanPemasanganBaruController::class, 'index'])->name('admin.pengajuan-pemasangan-baru');
    Route::post('admin-proses-pengajuan-pemasangan-baru', [PengajuanPemasanganBaruController::class, 'proses'])->name('admin.proses-pengajuan-pemasangan-baru');


    Route::get('Setting-apps', [SettingAppsController::class, 'index'])->name('admin.setting-apps');
    Route::post('Setting-apps/post', [SettingAppsController::class, 'index'])->name('admin.setting-apps-post');
    Route::post('Setting-apps/update', [SettingAppsController::class, 'index'])->name('admin.setting-apps-update');
    Route::get('Wilayah', [WilayahController::class, 'index'])->name('admin.wilayah');
    Route::post('post-wilayah', [WilayahController::class, 'store'])->name('admin.wilayah-post');
    Route::post('update-wilayah', [WilayahController::class, 'update'])->name('admin.wilayah-update');
    Route::delete('delete-wilayah', [WilayahController::class, 'delete'])->name('admin.wilayah-delete');

    Route::get('harga-tarif', [HargaTarifController::class, 'index'])->name('admin.harga-tarif');
    Route::post('Post-harga-tarif', [HargaTarifController::class, 'store'])->name('admin.harga-tarif-post');
    Route::post('update-arga-tarif', [HargaTarifController::class, 'update'])->name('admin.harga-tarif-update');
    Route::delete('delete-harga-tarif', [HargaTarifController::class, 'delete'])->name('admin.harga-tarif-delete');

    Route::get('golongan-kelompok', [GolonganKelompokController::class, 'index'])->name('admin.golongan-kelompok');
    Route::post('post-golongan', [GolonganKelompokController::class, 'postGolongan'])->name('admin.post-golongan');
    Route::post('post-kelompok', [GolonganKelompokController::class, 'postKelompok'])->name('admin.post-kelompok');
    Route::delete('delete-golongan/{id}', [GolonganKelompokController::class, 'deleteGolongan'])->name('admin.delete-golongan');
    Route::delete('delete-kelompok/{id}', [GolonganKelompokController::class, 'deleteKelompok'])->name('admin.delete-kelompok');

    Route::get('data-pelanggan', [PelangganController::class, 'index'])->name('admin.data-pelanggan');
    Route::post('data-pelanggan-store', [PelangganController::class, 'store'])->name('admin.data-pelanggan-store');
    Route::post('data-pelanggan-update', [PelangganController::class, 'update'])->name('admin.data-pelanggan-update');
    Route::delete('data-pelanggan-delete', [PelangganController::class, 'delete'])->name('admin.data-pelanggan-delete');

    Route::get('pemasangan-baru', [PemasanganBaruController::class, 'index'])->name('admin.pemasangan-baru');
    Route::post('pemasangan-baru-store', [PemasanganBaruController::class, 'store'])->name('admin.pemasangan-baru-store');
    Route::post('pemasangan-baru-update', [PemasanganBaruController::class, 'update'])->name('admin.pemasangan-baru-update');
    Route::delete('pemasangan-baru-delete', [PemasanganBaruController::class, 'delete'])->name('admin.pemasangan-baru-delete');
    Route::post('konfirmasi-permintaan-pemasangan-baru', [PemasanganBaruController::class, 'konfirmasi_permintaan'])->name('admin.konfirmasi-permintaan');
    Route::post('konfirmasi-pemasangan-baru', [PemasanganBaruController::class, 'konfirmasi_pemasangan'])->name('admin.konfirmasi-pemasangan');

    Route::get('pencatatan-meter', [PencatatanMeterController::class, 'index'])->name('admin.pencatatan-meter');
    Route::post('pencatatan-meter-store', [PencatatanMeterController::class, 'store'])->name('admin.pencatatan-meter-store');
    Route::post('pencatatan-meter-update', [PencatatanMeterController::class, 'update'])->name('admin.pencatatan-meter-update');
    Route::delete('pencatatan-meter-delete', [PencatatanMeterController::class, 'delete'])->name('admin.pencatatan-meter-delete');
    Route::post('konfirmasi-pencatatan-meter', [PencatatanMeterController::class, 'konfirmasi_handler'])->name('admin.konfirmasi-pencatatan-meter');

    Route::get('tagihan-bulanan', [TagihanBulananController::class, 'index'])->name('admin.tagihan-bulanan');
    Route::post('pembayaran', [TagihanBulananController::class, 'pembayaran'])->name('admin.pembayaran-tagihan');
    Route::get('tagihan-tunggakan', [TagihanTunggakancontroller::class, 'index'])->name('admin.tagihan-tunggakan');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('setting-profile', [SettingProfileController::class, 'index'])->name('setting-profile');
    Route::post('setting-profile/upadte-image', [SettingProfileController::class, 'update_image'])->name('setting-profile-update-image');
    Route::post('setting-profile/upadte-profile', [SettingProfileController::class, 'update_profile'])->name('setting-profile-update-profile');
    Route::post('setting-profile/upadte-user', [SettingProfileController::class, 'update_user'])->name('setting-profile-update-user');
    Route::get('logout', [LoginController::class, 'logout'])->name('logout');
});


Route::middleware(['auth', 'role:pelanggan'])->group(function () {
    Route::get('permintaan-sambungan-baru', [PermintaanSambunganBaru::class, 'index'])->name('pelanggan.permintaan-sambungan-baru');
    Route::post('permintaan-sambungan-baru', [PermintaanSambunganBaru::class, 'store']);

    Route::get('pelanggan.sambungan-pelanggan', [SambunganPelangganController::class, 'index'])->name('pelanggan.sambungan-pelanggan');
    Route::post('pelanggan.pilih-sambungan-pelanggan', [SambunganPelangganController::class, 'pilih'])->name('pelanggan.pilih-sambungan-pelanggan');
    Route::get('pelanggan.remove-sambungan-pelanggan/{id}', [SambunganPelangganController::class, 'remove'])->name('pelanggan.remove-sambungan-pelanggan');
});
