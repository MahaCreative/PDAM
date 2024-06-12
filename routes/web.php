<?php

use App\Http\Controllers\Admin\BankController;
use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\BuktiPembayaranPemasanganBaru;
use App\Http\Controllers\Admin\GaleryController;
use App\Http\Controllers\Admin\GolonganKelompokController;
use App\Http\Controllers\Admin\HargaTarifController;
use App\Http\Controllers\Admin\InfoController;
use App\Http\Controllers\Admin\JenisPengaduanController;
use App\Http\Controllers\Admin\MeteranPelanggan;
use App\Http\Controllers\Admin\PelangganController;
use App\Http\Controllers\Admin\PemasanganBaruController;
use App\Http\Controllers\Admin\PembayaranTagihanPelanggan;
use App\Http\Controllers\Admin\PencatatanMeterController;
use App\Http\Controllers\Admin\PengaduanController as AdminPengaduanController;
use App\Http\Controllers\Admin\PengaduanPelangganController as AdminPengaduanPelangganController;
use App\Http\Controllers\Admin\PengajuanPemasanganBaruController;
use App\Http\Controllers\Admin\PeriodeTagihanController;
use App\Http\Controllers\Admin\PermintaanSambunganBaru as AdminPermintaanSambunganBaru;
use App\Http\Controllers\Admin\SejarahController as AdminSejarahController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\StrukturOrganisasiController as AdminStrukturOrganisasiController;
use App\Http\Controllers\Admin\SusunanDireksiController as AdminSusunanDireksiController;
use App\Http\Controllers\Admin\TagihanBulananController;
use App\Http\Controllers\Admin\TagihanPemakaianAirController;
use App\Http\Controllers\Admin\TagihanTunggakancontroller;
use App\Http\Controllers\Admin\VisiMisiController;
use App\Http\Controllers\Admin\WilayahController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Galery\GaleryController as GaleryGaleryController;
use App\Http\Controllers\Guest\BeritaController as GuestBeritaController;
use App\Http\Controllers\Guest\GaleryController as GuestGaleryController;
use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\Guest\InfoController as GuestInfoController;
use App\Http\Controllers\Guest\SejarahController;
use App\Http\Controllers\Guest\StrukturOrganisasiController;
use App\Http\Controllers\Guest\SusunanDireksiController;
use App\Http\Controllers\Guest\VisiController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MidtransHandler;
use App\Http\Controllers\Pelanggan\MeteranPelangganController;
use App\Http\Controllers\Pelanggan\MeteranSayaController;
use App\Http\Controllers\Pelanggan\PembayaranSambunganBaru;
use App\Http\Controllers\Pelanggan\PengaduanController;
use App\Http\Controllers\Pelanggan\PermintaanSambunganBaru;
use App\Http\Controllers\Pelanggan\TagiHanBulananSayaController;
use App\Http\Controllers\Pelanggan\TagihanPemasanganBaru;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SettingProfileController;
use App\Http\Controllers\SimulasiController;
use App\Http\Controllers\SuperAdmin\SettingAppsController;
use App\Models\PembayaranTagihan;
use App\Models\PeriodeTagihan;
use Illuminate\Support\Facades\Route;


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




Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('visi-misi', [VisiController::class, 'index'])->name('visi-misi');
Route::get('sejarah-perusahaan', [SejarahController::class, 'index'])->name('sejarah');
Route::get('struktur-organisasi', [StrukturOrganisasiController::class, 'index'])->name('struktur-organisasi');
Route::get('susunan-direksi', [SusunanDireksiController::class, 'index'])->name('susunan-direksi');
Route::get('simulasi', [SimulasiController::class, 'index'])->name('simulasi');

Route::get('info-pdam', [GuestInfoController::class, 'index'])->name('info-pdam');
Route::get('info-pdam/{slug}', [GuestInfoController::class, 'show'])->name('show-info-pdam');
Route::get('berita', [GuestBeritaController::class, 'index'])->name('berita');
Route::get('berita/{slug}', [GuestBeritaController::class, 'show'])->name('show-berita');
Route::get('galery', [GuestGaleryController::class, 'index'])->name('galery');
Route::get('galery/{slug}', [GuestGaleryController::class, 'show'])->name('show-galery');



Route::middleware(['guest'])->group(function () {
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
});
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('admin/dashboard', [DashboardController::class, 'dashboard_admin'])->name('admin.dashboard');

Route::middleware(['auth',])->group(function () {

    Route::get('Setting-apps', [SettingAppsController::class, 'index'])->name('admin.setting-apps');
    Route::post('Setting-apps/update', [SettingAppsController::class, 'update'])->name('admin.setting-apps-update');
    Route::post('Setting-apps/update-foto', [SettingAppsController::class, 'updateFoto'])->name('admin.setting-apps-update-foto');
    Route::get('jenis-pengaduan', [JenisPengaduanController::class, 'index'])->name('admin.jenis-pengaduan');
    Route::post('jenis-pengaduan', [JenisPengaduanController::class, 'store']);
    Route::delete('jenis-pengaduan', [JenisPengaduanController::class, 'delete']);

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
    Route::get('admin/visi-misi', [VisiMisiController::class, 'index'])->name('admin.visi-misi');
    Route::post('admin/update-visi', [VisiMisiController::class, 'update_visi'])->name('admin.update-visi');
    Route::post('admin/create-misi', [VisiMisiController::class, 'create_misi'])->name('admin.create-misi');
    Route::post('admin/update-misi', [VisiMisiController::class, 'update_misi'])->name('admin.update-misi');
    Route::delete('admin/delete-misi/{id}', [VisiMisiController::class, 'delete_misi'])->name('admin.delete-misi');
    Route::get('admin/sejarah', [AdminSejarahController::class, 'index'])->name('admin.sejarah');
    Route::post('admin/update-status-sejarah', [AdminSejarahController::class, 'update_status'])->name('admin.update-status');
    Route::post('admin/create-sejarah', [AdminSejarahController::class, 'create_sejarah'])->name('admin.create-sejarah');
    Route::post('admin/update-sejarah', [AdminSejarahController::class, 'update_sejarah'])->name('admin.update-sejarah');
    Route::delete('admin/delete-sejarah/{id}', [AdminSejarahController::class, 'delete_sejarah'])->name('admin.delete-sejarah');
    Route::get('admin/susunan-direksi', [AdminSusunanDireksiController::class, 'index'])->name('admin.susunan-direksi');
    Route::post('admin/create-direksi', [AdminSusunanDireksiController::class, 'create'])->name('admin.create-direksi');
    Route::post('admin/update-direksi', [AdminSusunanDireksiController::class, 'update'])->name('admin.update-direksi');
    Route::delete('admin/create-direksi/{id}', [AdminSusunanDireksiController::class, 'delete'])->name('admin.delete-direksi');
    Route::get('admin/struktur-organisasi', [AdminStrukturOrganisasiController::class, 'index'])->name('admin.struktur-organisasi');
    Route::post('admin/update-struktur-organisasi', [AdminStrukturOrganisasiController::class, 'update'])->name('admin.update-struktur-organisasi');
    Route::get('admin/slider', [SliderController::class, 'index'])->name('admin.slider');
    Route::post('admin/create-slider', [SliderController::class, 'create'])->name('admin.create-slider');
    Route::post('admin/delete-slider', [SliderController::class, 'delete'])->name('admin.delete-slider');
    Route::get('admin/galery', [GaleryController::class, 'index'])->name('admin.galery');
    Route::post('admin/create-galery', [GaleryController::class, 'create'])->name('admin.create-galery');
    Route::post('admin/upate-galery', [GaleryController::class, 'update'])->name('admin.update-galery');
    Route::delete('admin/delete-galery/{id}', [GaleryController::class, 'delete'])->name('admin.delete-galery');
    Route::get('admin/berita', [BeritaController::class, 'index'])->name('admin.berita');
    Route::post('admin/create-berita', [BeritaController::class, 'create'])->name('admin.create-berita');
    Route::post('admin/upate-berita', [BeritaController::class, 'update'])->name('admin.update-berita');
    Route::delete('admin/delete-berita/{id}', [BeritaController::class, 'delete'])->name('admin.delete-berita');
    Route::get('admin/info-pdam', [InfoController::class, 'index'])->name('admin.info-pdam');
    Route::post('admin/create-info-pdam', [InfoController::class, 'create'])->name('admin.create-info-pdam');
    Route::post('admin/upate-info-pdam', [InfoController::class, 'update'])->name('admin.update-info-pdam');
    Route::delete('admin/delete-info-pdam/{id}', [InfoController::class, 'delete'])->name('admin.delete-info-pdam');


    Route::post('admin/konfirmasi-permintaan-sambungan-baru', [AdminPermintaanSambunganBaru::class, 'konfirmasi'])->name('admin.konfirmasi-permintaan-pemasangan-baru');
    Route::get('admin/daftar-bukti-pembayaran-sambungan-baru', [BuktiPembayaranPemasanganBaru::class, 'index'])->name('admin.bukti-pembayaran-sambungan-baru');

    Route::get('admin/meteran-pelanggan', [MeteranPelanggan::class, 'index'])->name('admin.meteran-pelanggan');
    Route::get('admin/cetak-meteran-pelanggan', [MeteranPelanggan::class, 'cetak'])->name('admin.cetak-meteran-pelanggan');
    Route::post('admin/create-meteran-pelanggan', [MeteranPelanggan::class, 'store'])->name('admin.create-meteran-pelanggan');
    Route::post('admin/update-meteran-pelanggan', [MeteranPelanggan::class, 'update'])->name('admin.update-meteran-pelanggan');
    Route::delete('admin/delete-meteran-pelanggan', [MeteranPelanggan::class, 'delete'])->name('admin.delete-meteran-pelanggan');

    Route::get('admin/periode-tagihan', [PeriodeTagihanController::class, 'index'])->name('admin.periode-tagihan');
    Route::get('admin/show-periode-tagihan', [PeriodeTagihanController::class, 'show'])->name('admin.show-periode-tagihan');
    Route::delete('admin/delete-periode-tagihan', [PeriodeTagihanController::class, 'delete'])->name('admin.delete-periode-tagihan');
    Route::delete('admin/create-periode-tagihan', [PeriodeTagihanController::class, 'store'])->name('admin.create-periode-tagihan');

    Route::get('admin/tagihan-bulanan', [TagihanPemakaianAirController::class, 'index'])->name('admin.tagihan-bulanan');
    // Route::get('admin/cetak-tagihan-bulanan', [TagihanPemakaianAirController::class, 'cetak'])->name('admin.cetak-tagihan-bulanan');
    Route::get('admin/show-tagihan-bulanan-saya/{id}', [PembayaranTagihanPelanggan::class, 'show'])->name('admin.show-tagihan-bulanan-saya');
    Route::post('admin-konfirmasi-pembayaran-pelanggan', [PembayaranTagihanPelanggan::class, 'konfirmasi'])->name('admin.konfirmasi-pembayaran-pelanggan');
    // Route::get('admin/history-pembayaran-tagihan', [PembayaranTagihanPelanggan::class, 'history_pembayaran'])->name('admin.history_pembayaran');
    // Route::get('admin/cetak-history-pembayaran-tagihan', [PembayaranTagihanPelanggan::class, 'cetak'])->name('admin.cetak-history_pembayaran');
    // Route::get('admin/cetak-laporan-tagihan-bulanan', [TagihanPemakaianAirController::class, 'cetak'])->name('admin.cetak-tagihan-bulanan');

    Route::get('admin/pengaduan-pelanggan', [AdminPengaduanController::class, 'index'])->name('admin.pengaduan-pelanggan');
    Route::get('admin/pengaduan-pelanggan/{kd_pengaduan}', [AdminPengaduanController::class, 'show'])->name('admin.show-pengaduan-pelanggan');
    Route::post('admin/konfirmasi-pengaduan', [AdminPengaduanController::class, 'konfirmasi'])->name('admin.konfirmasi-pengaduan');
    Route::post('admin/proses-pengaduan', [AdminPengaduanController::class, 'proses'])->name('admin.proses-pengaduan');
});
Route::middleware(['auth'])->group(
    function () {

        Route::get('pencatatan-pemakaian-air', [PencatatanMeterController::class, 'index'])->name('admin.pencatatan-meter');
        Route::get('cetak-pencatatan-pemakaian-air', [PencatatanMeterController::class, 'cetak'])->name('admin.cetak-pencatatan-meter');
        Route::get('catat-pemakaian-air-pelanggan/{id}', [PencatatanMeterController::class, 'create'])->name('admin.catat-pemakaian-air-pelanggan');
        Route::post('store-catat-pemakaian-air-pelanggan', [PencatatanMeterController::class, 'store'])->name('admin.store-catat-pemakaian-air-pelanggan');
        Route::get('setting-profile', [SettingProfileController::class, 'index'])->name('setting-profile');
        Route::post('setting-profile/upadte-image', [SettingProfileController::class, 'update_image'])->name('setting-profile-update-image');
        Route::post('setting-profile/upadte-profile', [SettingProfileController::class, 'update_profile'])->name('setting-profile-update-profile');
        Route::post('setting-profile/upadte-user', [SettingProfileController::class, 'update_user'])->name('setting-profile-update-user');
    }
);
Route::middleware(['auth', 'role:pelanggan'])->group(function () {



    // Route::get('permintaan-sambungan-baru', [PermintaanSambunganBaru::class, 'index'])->name('pelanggan.permintaan-sambungan-baru');
    // Route::post('store-permintaan-sambungan-baru', [PermintaanSambunganBaru::class, 'store'])->name('pelanggan.store-permintaan-sambungan-baru');

    // Route::delete('delete-permintaan-sambungan-baru', [PermintaanSambunganBaru::class, 'delete'])->name('pelanggan.delete-permintaan-sambungan-baru');
    // Route::get('pembayaran-pemasangan-baru/{id}', [PembayaranSambunganBaru::class, 'show'])->name('pelanggan.pembayaran-sambungan-baru');
    // Route::post('store-pembayaran-pemasangan-baru', [PembayaranSambunganBaru::class, 'store_pembayaran'])->name('pelanggan.store-pembayaran-sambungan-baru');

    // Route::get('tagihan-sambungan-baru', [TagihanPemasanganBaru::class, 'index'])->name('pelanggan.tagihan-sambungan-baru');

    Route::get('meteran-saya', [MeteranSayaController::class, 'index'])->name('pelanggan.meteran-pelanggan');
    Route::post('store-meteran-saya', [MeteranSayaController::class, 'store'])->name('pelanggan.store-meteran-pelanggan');
    Route::delete('delete-meteran-saya', [MeteranSayaController::class, 'delete'])->name('pelanggan.delete-meteran-pelanggan');

    Route::get('tagihan-bulanan-saya', [TagiHanBulananSayaController::class, 'index'])->name('pelanggan.tagihan-bulanan-saya');
    Route::get('show-tagihan-bulanan-saya/{id}', [TagiHanBulananSayaController::class, 'show'])->name('pelanggan.show-tagihan-bulanan-saya');
    Route::post('post-bukti-pembayaran-tagihan', [TagiHanBulananSayaController::class, 'store_pembayaran'])->name('pelanggan.bayar-tagihan-bulanan');
    Route::get('history-pembayaran-tagihan', [TagihanBulananSayaController::class, 'history_pembayaran'])->name('pelanggan.history_pembayaran');

    Route::get('pengaduan-pelanggan', [PengaduanController::class, 'index'])->name('pelanggan.pengaduan-pelanggan');
    Route::get('buat-pengaduan-pelanggan', [PengaduanController::class, 'create'])->name('pelanggan.buat-pengaduan-pelanggan');
    Route::post('store-pengaduan-pelanggan', [PengaduanController::class, 'store'])->name('pelanggan.store-pengaduan-pelanggan');
    Route::get('pengaduan-pelanggan/{kd_pengaduan}', [PengaduanController::class, 'show'])->name('pelanggan.show-pengaduan-pelanggan');
});

Route::get('cetak-pembayaran/', [InvoiceController::class, 'index'])->name('invoice');


// Kirim Email
