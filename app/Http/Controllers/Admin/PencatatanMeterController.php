<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MeteranPelanggan;
use App\Models\PencatatanMeter;
use App\Models\PeriodeTagihan;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class PencatatanMeterController extends Controller
{
    public function index(Request $request)
    {
        $query = PencatatanMeter::query()->with('meteran', 'periode');
        // $periode = PeriodeTagihan::where('periode_tagihan', '=', \Str::lower(date("F")) . " " . date("Y"))->first();
        // $periode_id = $periode->id;
        $catatan = 'belum dicatat';
        $count_status = PencatatanMeter::count_pembayaran();
        $count_catat = PencatatanMeter::count_catat();
        if ($request->status) {
            $query->where('status_pembayaran', $request->status);
        }
        if ($request->status_catatan == 'sudah dicatat') {
            $catatan = 'sudah dicatat';
        }
        if ($request->periode_id) {
            $periode = PeriodeTagihan::findOrFail($request->periode_id);
        }
        $query->where('status_pencatatan', $catatan);
        if ($request->cari) {
            $query->whereHas('meteran', function ($q) use ($request) {
                $q->where('no_meteran', 'like', '%' . $request->cari . '%')
                    ->orWhere('nama', 'like', '%' . $request->cari . '%')
                    ->orWhere('no_sambungan', 'like', '%' . $request->cari . '%');
            });
        }
        if ($request->bulan) {

            $query->whereHas('periode', function ($q) use ($request) {
                $q->where('bulan', 'like', '%' . $request->bulan . '%');
            });
        }
        if ($request->tahun) {
            $query->whereHas('periode', function ($q) use ($request) {
                $q->where('tahun', $request->tahun);
            });
        }

        $meteran = $query->latest()->get();
        // dd($meteran);
        return inertia('Admin/PencatatanMeteran/Index', compact('meteran', 'count_status', 'count_catat'));
    }

    public function cetak(Request $request)
    {
        $query = PencatatanMeter::query()->with('meteran', 'periode');
        // $periode = PeriodeTagihan::where('periode_tagihan', '=', \Str::lower(date("F")) . " " . date("Y"))->first();
        // $periode_id = $periode->id;

        if ($request->status) {
            $query->where('status_pembayaran', $request->status);
        }
        if ($request->status_catatan == 'sudah dicatat') {
            $catatan = 'sudah dicatat';
        }
        if ($request->periode_id) {
            $periode = PeriodeTagihan::findOrFail($request->periode_id);
        }

        if ($request->cari) {
            $query->whereHas('meteran', function ($q) use ($request) {
                $q->where('no_meteran', 'like', '%' . $request->cari . '%')
                    ->orWhere('nama', 'like', '%' . $request->cari . '%')
                    ->orWhere('no_sambungan', 'like', '%' . $request->cari . '%');
            });
        }
        if ($request->bulan) {

            $query->whereHas('periode', function ($q) use ($request) {
                $q->where('bulan', 'like', '%' . $request->bulan . '%');
            });
        }
        if ($request->tahun) {
            $query->whereHas('periode', function ($q) use ($request) {
                $q->where('tahun', $request->tahun);
            });
        }

        $meteran = $query->latest()->get();
        // dd($meteran);
        return inertia('Admin/PencatatanMeteran/Cetak', compact('meteran'));
    }
    public function create(Request $request, $id)
    {
        $dataMeteran = PencatatanMeter::with('meteran', 'periode')->findOrFail($id);
        $latest = PencatatanMeter::where('meteran_pelanggan_id', $dataMeteran->meteran_pelanggan_id)
            ->latest()->get()->take(2);
        $getMeteran = MeteranPelanggan::with('harga_tarif')->findOrFail($dataMeteran->meteran_pelanggan_id);
        $meterAwal = 0;
        if (count($latest) > 1) {
            $meterAwal = $latest[1]->meter_akhir;
        }
        $data = [
            'id' => $dataMeteran->id,
            'meter_awal' => $meterAwal,
            'harga_tarif' => $getMeteran->harga_tarif,
        ];

        // dd($dataMeteran);
        return inertia('Admin/PencatatanMeteran/Create', compact('dataMeteran', 'data'));
    }

    public function store(Request $request)
    {
        $user = $request->user()->with('petugas')->first();

        $dataMeteran = PencatatanMeter::findOrFail($request->id);
        $denda = 0;
        $status_menunggak = 'tidak menunggak';
        $cekTunggakan = PencatatanMeter::where('meteran_pelanggan_id', $dataMeteran->meteran_pelanggan_id)->where('status_pembayaran', 'belum lunas')->whereNotIn('id', [$dataMeteran->id])->get();

        $meteranPelanggan = MeteranPelanggan::with(['harga_tarif'])->findOrFail($dataMeteran->meteran_pelanggan_id);

        if ($cekTunggakan) {

            $denda = $meteranPelanggan->harga_tarif->denda;
            if (count($cekTunggakan) >= 3) {
                $meteranPelanggan->update(['status_meteran' => 'pencabutan sementara']);
            } else   if (count($cekTunggakan) >= 5) {
                $meteranPelanggan->update(['status_meteran' =>  'non aktif']);
            }
            foreach ($cekTunggakan as $item) {
                $tagihan = TagihanBulanan::where('pencatatan_meter_id', $item->id);
                $tagihan->update([
                    'status_tunggakan' => 'menunggak'
                ]);
            }
        }

        $request->validate(['meter_akhir' => 'numeric|required']);
        $dataMeteran->update([
            "meter_awal" => $request->meter_awal,
            "meter_akhir" => $request->meter_akhir,
            "meter_pemakaian" => $request->meter_pemakaian,
            "tanggal_pencatatan" => now(),
            "nama_petugas_pencatat" => $user->petugas->nama,
            'status_pencatatan' => 'sudah dicatat'
        ]);
        $tagihan = TagihanBulanan::where('pencatatan_meter_id', $dataMeteran->id)->first();
        $tagihan->update([
            'stand_meter_awal' => $request->meter_awal,
            'stand_meter_akhir' => $request->meter_akhir,
            'total_pemakaian' => $request->meter_pemakaian,
            'pemakaian_10' => $request->pemakaian1,
            'pemakaian_20' => $request->pemakaian2,
            'pemakaian_30' => $request->pemakaian3,
            'pemakaian_30_keatas' => $request->pemakaian4,
            'tarif_pemakaian_10' => $request->tarif1,
            'tarif_pemakaian_20' => $request->tarif2,
            'tarif_pemakaian_30' => $request->tarif3,
            'tarif_pemakaian_30_keatas' => $request->tarif4,
            'denda' =>  $denda,
            'total_tagihan' => $request->total_biaya + $denda,
        ]);
    }
}
