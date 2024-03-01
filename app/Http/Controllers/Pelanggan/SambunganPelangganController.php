<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\InvoiceTagihanPemasnganBaru;
use App\Models\PemasanganBaru;
use App\Models\PermintaanSambunganBaru;
use App\Models\TagihanSambunganBaru;
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

    public function lihat_tagihan(Request $request, $id)
    {
        $bank = Bank::all();
        $pemasanganBaru = PemasanganBaru::with('tagihan_pemasangan')->findOrFail($request->id);
        return inertia('Pelanggan/PembayaranSambunganPelanggan/PembayaranSambungan', compact('pemasanganBaru', 'bank'));
    }

    public function bayar_tagihan(Request $request)
    {

        $request->validate([
            'nama_bank_pdam' => 'required',
            'nama_rek_pdam' => 'required',
            'no_rek_pdam' => 'required',
            'nama_bank_pengirim' => 'required',
            'nama_rek_pengirim' => 'required',
            'no_rek_pengirim' => 'required',
            'bukti_pembayaran' => 'required|mimes:jpg,jpeg,png',
        ]);
        // dd($request->all());
        $tagihan = TagihanSambunganBaru::findOrFail($request->id_tagihan);

        $order_id = now()->format('dmy') . $tagihan->id . $request->user()->id . $tagihan->pemasangan_baru_id;
        $paymenth_info = [
            'nama_bank_pdam' => $request->nama_bank_pdam,
            'nama_rek_pdam' => $request->nama_rek_pdam,
            'no_rek_pdam' => $request->no_rek_pdam,
            'nama_bank_pengirim' => $request->nama_bank_pengirim,
            'nama_rek_pengirim' => $request->nama_rek_pengirim,
            'no_rek_pengirim' => $request->no_rek_pengirim,
            'bukti_pembayaran' => $request->file('bukti_pembayaran')->store('bukti_pembayaran'),
        ];
        $json_data = json_encode($paymenth_info);

        $invoince = InvoiceTagihanPemasnganBaru::updateOrCreate(compact('order_id'), [
            'user_id' => $request->user()->id,
            'order_id' => $order_id,
            'total_pembayaran' => $tagihan->total_biaya,
            'tagihan_sambungan_id' => $tagihan->id,
            'payment_type' => 'pembayaran transfer',
            'payment_info' => $paymenth_info,
        ]);

        return redirect()->route('pelanggan.sambungan-pelanggan')->with(['type' => 'success', 'message' => 'Form pembayaran anda telah berhasil ditambahkan, konfirmasi pembayaran akan dilakukan oleh petugas']);
    }
    public function konfirmasi_pembayaran(Request $request, $id)
    {
        dd($request->id);
    }
    public function delete_pembayaran_tagihan(Request $request, $id)
    {
        $invoice = InvoiceTagihanPemasnganBaru::findOrFail($id);
        $tagihan = TagihanSambunganBaru::findOrFail($invoice->tagihan_sambungan_id);
        // $tagihan->pemasangan->update([]);
        $pemasanganBaru = PemasanganBaru::findOrFail($tagihan->pemasangan_baru_id);
        $pemasanganBaru->update([
            "status_pemasangan" => "menunggu konfirmasi",
            "status_pembayaran" => "menunggu konfirmasi",
            "nama_petugas_yang_menangani" => null,
        ]);
        $tagihan->update([
            'tanggal_pembayaran' => null,
            "status_pembayaran" => "menunggu konfirmasi",
            "nama_petugas" => null,
        ]);
        $invoice->delete();
        return redirect()->route('pelanggan.sambungan-pelanggan')->with(['type' => 'success', 'message' => 'Bukti pembayaran telah di hapus, silakan melakukan pengajuan bukti pembayaran ulang']);
    }
}
