<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MeteranPelanggan;
use App\Models\PencatatanMeter;
use App\Models\PeriodeTagihan;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class PeriodeTagihanController extends Controller
{
    public function index(Request $request)
    {
        $periode = PeriodeTagihan::with('pemakaian')->withCount([
            'pemakaian as pemakaian_lunas' => function ($query) {
                $query->where('status_pembayaran', 'lunas');
            },
            'pemakaian as pemakaian_belum_lunas' => function ($query) {
                $query->where('status_pembayaran', 'belum lunas');
            },
            'pemakaian as belum_dicatat' => function ($query) {
                $query->where('status_pencatatan', 'belum dicatat');
            },
            'pemakaian as sudah_dicatat' => function ($query) {
                $query->where('status_pencatatan', 'sudah dicatat');
            }
        ])->latest()->get();

        return inertia('Admin/PeriodeTagihan/Index', compact('periode'));
    }

    public function show(Request $request)
    {
        $periode = PeriodeTagihan::findOrFail($request->id);

        $query = PencatatanMeter::query()->with('meteran', 'periode')->where('periode_tagihan_id', $periode->id);
        $catatan = 'belum dicatat';
        $count_status = PencatatanMeter::count_pembayaran($periode->id);
        $count_catat = PencatatanMeter::count_catat($periode->id);
        if ($request->status) {
            $query->where('status_pembayaran', $request->status);
        }
        if ($request->status_catatan == 'sudah dicatat') {
            $catatan = 'sudah dicatat';
        }
        $query->where('status_pencatatan', $catatan);
        $meteran = $query->latest()->get();
        return inertia('Admin/PeriodeTagihan/Show', compact('meteran', 'count_status', 'count_catat', 'periode'));
    }

    public function store(Request $request)
    {
        $bulan = [
            'januari' => '01',
            'februari' => '02',
            'maret' => '03',
            'april' => '04',
            'mei' => '05',
            'juni' => '06',
            'juli' => '07',
            'agustus' => '08',
            'september' => '09',
            'oktober' => '10',
            'november' => '11',
            'desember' => '12'
        ];

        $bulanAngka = $bulan[strtolower($request->bulan)];
        $cek = PeriodeTagihan::where('periode_tagihan', '=', \Str::lower($request->bulan) . " " . $request->tahun)->first();
        if ($cek) {
            return redirect()->back()->withErrors(['message' => 'Periode tagihan ' . \Str::lower($request->bulan) . " " . $request->tahun . ' telah dibuat sebelumnya, anda tidak lagi bisa menambahkan periode yang sama']);
        }
        $latestPeriode = PeriodeTagihan::latest()->first();

        $periodeCount = PeriodeTagihan::count();
        $periode = PeriodeTagihan::create([
            'kode_periode' => \Str::lower($request->bulan) . "" . $request->tahun,
            'bulan' => \Str::lower($request->bulan),
            'tahun' => $request->tahun,
            'periode_tagihan' =>  \Str::lower($request->bulan) . " " . $request->tahun
        ]);
        $meteranPelanggan = MeteranPelanggan::with('harga_tarif')->latest()->get();

        foreach ($meteranPelanggan as $item) {
            $pencatatan =  PencatatanMeter::create([
                "periode_tagihan_id" => $periode->id,
                "meteran_pelanggan_id" => $item->id,
                "meter_awal" => '0',
                "meter_akhir" => '0',
                "meter_pemakaian" => '0',
                "created_at" => $request->tahun . "-" . $bulanAngka . '-01 12:00:00'
            ]);
            TagihanBulanan::create([
                'pencatatan_meter_id' => $pencatatan->id,
                "periode_tagihan_id" => $periode->id,
                "meteran_pelanggan_id" => $item->id,
                "stand_meter_awal" => '0',
                "stand_meter_akhir" => '0',
                "total_pemakaian" => '0',
                "pemakaian_10" => '0',
                "pemakaian_20" => '0',
                "pemakaian_30" => '0',
                "pemakaian_30_keatas" => '0',
                "tarif_pemakaian_10" => $tarif = $item->harga_tarif->tarif1,
                "tarif_pemakaian_20" => 0,
                "tarif_pemakaian_30" => 0,
                "tarif_pemakaian_30_keatas" => 0,
                "adm" => $adm = $item->harga_tarif->adm,
                'denda' => '0',
                "total_tagihan" => $tarif  + $adm,
                "created_at" => $request->tahun . "-" . $bulanAngka . '-01 12:00:00'
            ]);
        }
        if ($periodeCount > 0) {
            $tagihan = TagihanBulanan::with(['meteran' => function ($q) {
                $q->with('harga_tarif');
            }])->whereNot('periode_tagihan_id', $periode->id)->where('status_pembayaran', '=', 'belum lunas')->get();
            foreach ($tagihan as $item) {
                $item->update([
                    'status_tunggakan' => 'menunggak',
                    'denda' => $item->meteran->harga_tarif->denda,
                    'total_tagihan' => $item->total_tagihan + $item->meteran->harga_tarif->denda
                ]);
                // $item->status_tunggakan = 'menunggak';
                // $item->save();
            }
        }
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $periode = PeriodeTagihan::findOrFail($request->id);
        $periode->delete();
    }

    public function midtransToken($params)
    {
        \Midtrans\Config::$serverKey = config('midtrans.MID_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $snapToken = \Midtrans\Snap::getSnapToken($params);
    }
}
