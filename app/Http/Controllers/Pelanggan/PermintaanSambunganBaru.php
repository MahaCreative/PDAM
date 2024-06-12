<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Mail\KonfirmasiPembayaran;
use App\Models\InvoicePembayaranSambungan;
use App\Models\PermintaanSambunganBaru as ModelsPermintaanSambunganBaru;
use App\Models\SambunganBaru;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PermintaanSambunganBaru extends Controller
{
    public function index(Request $request)
    {

        $query = ModelsPermintaanSambunganBaru::query()->with(['petugas', 'sambungan_baru' => function ($query) {
            $query->with(['harga_tarif', 'bukti_pembayaran']);
        }])->where('user_id', $request->user()->id);
        $data = $query->latest()->get();

        return inertia('Pelanggan/PermintaanSambunganBaru/Index', compact('data'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([

            "nik_pendaftar" => 'required|numeric|digits:16',
            "nama_pendaftar" => 'required|string|min:4',
            "alamat_pemasangan" => 'required|string|min:10',
            "blok" => 'required|string',
            "no_telph" => 'required|numeric|digits:12',
            "peruntukan" => 'required|in:rumah tinggal,bisnis,instansi pemerintah,industri,pendidikan,kesehatan,perhotelan,transportasi',
            "wilayah_pemasangan" => 'required',
            "tempat_lahir_pendaftar" => 'required|string|min:6',
            "tanggal_lahir_pendaftar" => 'required|date',
            "jenis_kelamin_pendaftar" => 'required|in:laki-laki,perempuan',
            "foto_rekening_air_tetangga_pendaftar" => 'required|image|mimes:png,jpg,jpeg',
            "foto_ktp_pelanggan_pendaftar" => 'required|image|mimes:png,jpg,jpeg',
            "foto_kk_pelanggan_pendaftar" => 'required|image|mimes:png,jpg,jpeg',
            "foto_pbb_pendaftar" => 'required|image|mimes:png,jpg,jpeg',
        ]);
        $attr['user_id'] = $request->user()->id;
        $attr['kd_pendaftaran'] = now()->format('ymd') . ModelsPermintaanSambunganBaru::count() + 1;
        $attr['foto_rekening_air_tetangga_pendaftar'] = $request->file('foto_rekening_air_tetangga_pendaftar')->store('BerkasPelanggan/foto_rekening_air_tetangga_pendaftar');
        $attr['foto_ktp_pelanggan_pendaftar'] = $request->file('foto_ktp_pelanggan_pendaftar')->store('BerkasPelanggan/foto_ktp_pelanggan_pendaftar');
        $attr['foto_kk_pelanggan_pendaftar'] = $request->file('foto_kk_pelanggan_pendaftar')->store('BerkasPelanggan/foto_kk_pelanggan_pendaftar');
        $attr['foto_pbb_pendaftar'] = $request->file('foto_pbb_pendaftar')->store('BerkasPelanggan/foto_pbb_pendaftar');
        $permintaan = ModelsPermintaanSambunganBaru::create($attr);
        return redirect()->back();
    }

    public function delete(Request $request)
    {

        $permintaan = ModelsPermintaanSambunganBaru::findOrFail($request->id);
        $permintaan->delete();
    }

    public function show_pembayaran(Request $request, $id)
    {

        $permintaan = ModelsPermintaanSambunganBaru::findOrFail($id);
        $sambungan = SambunganBaru::with(['bukti_pembayaran', 'permintaan' => function ($q) {
            $q->with('petugas');
        }])->where('permintaan_sambungan_id', $permintaan->id)->first();

        return inertia('Pelanggan/PermintaanSambunganBaru/PembayaranSambunganBaru', compact('sambungan'));
    }

    public function konfirmasi_pembayaran(Request $request)
    {

        $pembayaran = InvoicePembayaranSambungan::findOrFail($request->id);
        $sambungan = SambunganBaru::with('permintaan')->findOrFail($pembayaran->sambungan_baru_id);

        $user = User::findOrFail($pembayaran->user_id);
        $data = [
            "kd_permintaan" => $sambungan->permintaan->kd_pendaftaran,
            "no_sambungan" => $sambungan->no_sambungan,
            "nama_pelanggan" => $sambungan->nama_pelanggan,
            "biaya_pendaftaran" => $sambungan->uang_pendaftaran,
            "biaya_pendaftaran" => $sambungan->biaya_perencanaan,
            "biaya_pemasangan" => $sambungan->biaya_pemasangan,
            "biaya_instalasi" => $sambungan->biaya_instalasi,
            "total_pembayaran" => $sambungan->total_biaya,
            'created_at' => Carbon::parse($sambungan->created_at)->format('d-m-Y'),
            'status' => $request->status,
            'link_pembayaran' =>  route('pelanggan.pembayaran-sambungan-baru', $sambungan->permintaan->id)
        ];

        if ($request->status == 'pembayaran di terima') {
            $sambungan->update([
                'status_pembayaran' => $request->status,
            ]);
            $pembayaran->update([
                'status_pembayaran' => $request->status,
                'nama_petugas_konfirmasi' => $request->user()->name
            ]);
        } else {
            $sambungan->update([
                'status_pembayaran' => $request->status,
            ]);
            $pembayaran->update([
                'status_pembayaran' => $request->status,
                'nama_petugas_konfirmasi' => $request->user()->name
            ]);
        }
        Mail::to($user->email)->send(new KonfirmasiPembayaran($data));
    }
}
