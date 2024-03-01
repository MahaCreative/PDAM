<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use App\Models\HargaTarifPerMeter;
use App\Models\InvoiceTagihanPemasnganBaru;
use App\Models\PemasanganBaru;
use App\Models\TagihanSambunganBaru;
use App\Models\Wilayah;
use Illuminate\Http\Request;

class PemasanganBaruController extends Controller
{
    public function index(Request $request)
    {
        $roles = $request->user()->getRoleNames()[0];

        $query = PemasanganBaru::query();
        // dd($request->all());
        // $pemasanganBaru = PemasanganBaru::with('pelanggan', 'wilayah')->whereMonth('tgl_pemasangan', $request->bulan ? $request->bulan : now()->month)
        $pemasanganBaru = PemasanganBaru::with('wilayah')->whereMonth('tgl_pemasangan', $request->bulan ? $request->bulan : now()->month)
            ->whereYear('tgl_pemasangan', $request->tahun ? $request->tahun : now()->year)
            ->latest()->get();



        return inertia('Admin/PemasanganBaru/PemasanganBaru', compact('pemasanganBaru', 'roles'));
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate(['wilayah' => 'required']);
        $attr = $request->validate([

            'kode_pemasangan_baru' => 'required',
            'no_sambungan' => 'required',
            'nama_pelanggan' => 'required',
            'alamat_pemasangan' => 'required',
            'nama_golongan' => 'required',
            'nama_kelompok' => 'required',

            'pipa_diameter' => 'required',
        ]);
        $payment = $request->validate([
            'uang_pendaftaran' => 'required',
            'biaya_perencanaan' => 'required',
            'biaya_pemasangan' => 'required',
            'biaya_instalasi' => 'required',
            'total_biaya' => 'required',
        ]);


        $attr['wilayah_id'] = Wilayah::where('nama_wilayah', $request->wilayah)->first()->id;
        $attr['harga_tarif_id'] = HargaTarifPerMeter::where('golongan', $request->nama_golongan)->where('kelompok', $request->nama_kelompok)
            ->first()->id;
        $attr['tgl_pemasangan'] = now();
        $pemasanganBaru = PemasanganBaru::create($attr);
        $pemasanganBaru->pelanggan()->attach($request->pelanggan_id);


        $pemasanganBaru->tagihan_pemasangan()->create($payment);
        return redirect()->back();
    }

    public function update(Request $request)
    {
        $request->validate(['wilayah' => 'required']);
        $attr = $request->validate([
            'kode_pemasangan_baru' => 'required',
            'no_sambungan' => 'required',
            'nama_pelanggan' => 'required',
            'alamat_pemasangan' => 'required',
            'nama_golongan' => 'required',
            'nama_kelompok' => 'required',
            'pipa_diameter' => 'required',
        ]);
        $payment = $request->validate([
            'uang_pendaftaran' => 'required',
            'biaya_perencanaan' => 'required',
            'biaya_pemasangan' => 'required',
            'biaya_instalasi' => 'required',
            'total_biaya' => 'required',
        ]);
        // dd($request->nama_golongan);
        $attr['wilayah_id'] = Wilayah::where('nama_wilayah', $request->wilayah)->first()->id;
        $getHargaTarif = HargaTarifPerMeter::where('golongan', $request->nama_golongan)->where('kelompok', $request->nama_kelompok)
            ->first();

        $attr['harga_tarif_id'] = $getHargaTarif->id;
        $pemasanganBaru = PemasanganBaru::findOrFail($request->id);
        $pemasanganBaru->update($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $pemasanganBaru = PemasanganBaru::findOrFail($request->id);
        $pemasanganBaru->delete();
        return redirect()->back();
    }
    public function konfirmasi_permintaan(Request $request)
    {

        $pemasanganBaru = PemasanganBaru::findOrFail($request->id);
        if ($request->data == 'lunas') {
            $pemasanganBaru->update([
                'status_pembayaran' => $request->data,
            ]);
        } else {
            $pemasanganBaru->update([
                'status_pembayaran' => $request->data,
                'status_pemasangan' => 'menunggu konfirmasi',
                'nama_petugas_yang_menangani' => null,
            ]);
        }

        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil konfirmasi pemasangan']);
    }
    public function konfirmasi_pemasangan(Request $request)
    {
        $pemasanganBaru = PemasanganBaru::findOrFail($request->idPemasangan);
        if ($request->value == 'proses pemasangan') {
            if ($request->namaPetugas == null) {
                return redirect()->back()->with(['type' => 'error', 'message' => 'silahkan mengisikan nama petugas terlebi dahulu']);
            } else {
                $pemasanganBaru->update([
                    'status_pemasangan' => $request->value,
                    'nama_petugas_yang_menangani' => $request->namaPetugas,
                ]);
                return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi permintaan']);
            }
        }
        if ($request->value == 'selesai') {
            $pemasanganBaru->update([
                'status_pemasangan' => $request->value,
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi permintaan']);
        }
        if ($request->value == 'menunggu pengecekan') {
            $pemasanganBaru->update([
                'status_pemasangan' => $request->value,
                'nama_petugas_yang_menangani' => null
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan konfirmasi permintaan']);
        }
    }

    public function konfirmasi_pembayaran(Request $request, $id)
    {
        // dd($request->all());
        // dd($id);

        $invoice = InvoiceTagihanPemasnganBaru::findOrFail($id);
        $tagihan = TagihanSambunganBaru::findOrFail($invoice->tagihan_sambungan_id);
        // $tagihan->pemasangan->update([]);
        $pemasanganBaru = PemasanganBaru::findOrFail($tagihan->pemasangan_baru_id);

        if ($request->data == 'di tolak') {
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
            $invoice->update([
                "status_pembayaran" => $request->data,
                "petugas_menerima" => $request->user()->petugas->nama,
            ]);
        } else {
            $pemasanganBaru->update([
                "status_pembayaran" => "lunas",
            ]);
            $tagihan->update([
                'tanggal_pembayaran' => now(),
                "status_pembayaran" => "lunas",
                "nama_petugas" => $request->user()->petugas->nama,
            ]);
            $invoice->update([
                "status_pembayaran" => $request->data,
                "petugas_menerima" => $request->user()->petugas->nama,
            ]);
        }
    }

    public function buat_pembayaran(Request $request, $id)
    {
        $bank = Bank::all();
        $pemasanganBaru = PemasanganBaru::with('tagihan_pemasangan')->findOrFail($request->id);
        return inertia('Admin/PemasanganBaru/BayarPemasanganBaru/PembayaranSambungan', compact('pemasanganBaru', 'bank'));
    }

    public function store_pembayaran(Request $request)
    {

        $tagihan = TagihanSambunganBaru::findOrFail($request->id_tagihan);
        $order_id = now()->format('dmy') . $tagihan->id . $request->user()->id . $tagihan->pemasangan_baru_id;
        if ($request->metode == '') {
            return redirect()->back()->with(["type" => "error", "message" => "silahkan pilih metode pembayaran dahulu"]);
        }
        if ($request->metode == 'pembayaran manual') {
            $request->validate([
                "nama_penerima" => "required|string|min:6",
                "nama_pembayar" => "required|string|min:6",
            ]);
            $paymenth_info = [
                "nama_penerima" => $request->nama_penerima,
                "nama_pembayar" => $request->nama_pembayar,
            ];
            $invoince = InvoiceTagihanPemasnganBaru::updateOrCreate(compact('order_id'), [
                'user_id' => $request->user()->id,
                'order_id' => $order_id,
                'total_pembayaran' => $tagihan->total_biaya,
                'tagihan_sambungan_id' => $tagihan->id,
                'payment_type' => $request->metode,
                'payment_info' => $paymenth_info,
                'succeeded_at' => now(),
                'status_pembayaran' => 'di terima',
                'petugas_menerima' => $request->user()->petugas->nama,
            ]);
            $tagihan->update([
                "status_pembayaran" => "lunas",
                "tanggal_pembayaran" => now(),
                'nama_petugas' => $request->user()->petugas->nama,
            ]);
            $pemasangan = PemasanganBaru::find($tagihan->pemasangan_baru_id);
            $pemasangan->update([
                "status_pembayaran" => "lunas",
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Pembayaran telah dilakukan']);
        } else {
            $request->validate([
                'nama_bank_pdam' => 'required',
                'nama_rek_pdam' => 'required',
                'no_rek_pdam' => 'required',
                'nama_bank_pengirim' => 'required',
                'nama_rek_pengirim' => 'required',
                'no_rek_pengirim' => 'required',
                'bukti_pembayaran' => 'required|mimes:jpg,jpeg,png',
            ]);
            $paymenth_info = [
                'nama_bank_pdam' => $request->nama_bank_pdam,
                'nama_rek_pdam' => $request->nama_rek_pdam,
                'no_rek_pdam' => $request->no_rek_pdam,
                'nama_bank_pengirim' => $request->nama_bank_pengirim,
                'nama_rek_pengirim' => $request->nama_rek_pengirim,
                'no_rek_pengirim' => $request->no_rek_pengirim,
                'bukti_pembayaran' => $request->file('bukti_pembayaran')->store('bukti_pembayaran'),
            ];
            $invoince = InvoiceTagihanPemasnganBaru::updateOrCreate(compact('order_id'), [
                'user_id' => $request->user()->id,
                'order_id' => $order_id,
                'total_pembayaran' => $tagihan->total_biaya,
                'tagihan_sambungan_id' => $tagihan->id,
                'payment_type' => $request->metode,
                'payment_info' => $paymenth_info,
                'succeeded_at' => now(),
                'status_pembayaran' => 'di terima',
                'petugas_menerima' => $request->user()->petugas->nama,
            ]);
            $tagihan->update([
                "status_pembayaran" => "lunas",
                "tanggal_pembayaran" => now(),
                'nama_petugas' => $request->user()->petugas->nama,
            ]);
            $pemasangan = PemasanganBaru::find($tagihan->pemasangan_baru_id);
            $pemasangan->update([
                "status_pembayaran" => "lunas",
            ]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Pembayaran telah dilakukan']);
        }
    }
}
