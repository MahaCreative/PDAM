<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\PemasanganBaru;
use App\Models\PermintaanSambunganBaru;
use Illuminate\Http\Request;

class SambunganPelangganController extends Controller
{
    public function index(Request $request)
    {
        // $pemasanganBaru = PemasanganBaru::where('pelanggan_id', $request->user()->pelanggan->id)->latest()->get();
        $pemasanganBaru = $request->user()->pelanggan->pemasangan()->latest()->get();

        return inertia('Pelanggan/SambunganPelanggan/SambunganPelanggan', compact('pemasanganBaru'));
    }

    public function pilih(Request $request)
    {
        try {
            $pemasanganBaru = PemasanganBaru::find($request->id);
            $pelangganId = $request->user()->pelanggan->id;

            // Memeriksa apakah hubungan sudah ada sebelum menambahkannya
            if (!$pemasanganBaru->pelanggan->contains($pelangganId)) {
                $pemasanganBaru->pelanggan()->attach($pelangganId);
                return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghubungkan meteran dengan akun anda. anda sekarang bisa dapat melihat informasi meteran ini']);
            } else {
                // Tindakan atau respons untuk kasus di mana hubungan sudah ada
                // Misalnya, melemparkan exception atau memberikan pesan kesalahan
                return redirect()->back()->with(['type' => 'error', 'message' => 'Meteran yang anda pilih telah terhubung dengan akun anda, silahkan memasukkan pilihan yang lain']);
            }
        } catch (\Exception $e) {
            // Tangani exception, seperti logging atau memberikan respons kesalahan
            // Contoh: return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function remove(Request $request, $id)
    {

        $request->user()->pelanggan->pemasangan()->detach($id);
        $permintaan = PermintaanSambunganBaru::where('pelanggan_id', $request->user()->pelanggan->id)->where('pemasangan_baru_id', $id)->first();
        if ($permintaan) {

            $permintaan->delete();
        }
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus hubungan meteran dengan akun anda. kini anda tidak lagi dapat meliat data terkait meteran tersebut']);
    }
}
