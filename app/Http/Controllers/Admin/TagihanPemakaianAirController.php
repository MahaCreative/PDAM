<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PeriodeTagihan;
use App\Models\SettingProfile;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagihanPemakaianAirController extends Controller
{
    public function index(Request $request)
    {
        $tahun = now()->format('Y');
        $bulan = now()->format('M');

        $query = TagihanBulanan::query()->with(['meteran', 'pemakaian' => function ($q) {
            $q->with('periode');
        }]);

        if ($request->status_pembayaran) {
            $query->where('status_pembayaran', $request->status_pembayaran);
        }
        if ($request->status_tunggakan) {
            $query->where('status_tunggakan', $request->status_tunggakan);
        }
        if ($request->cari) {
            $query->whereHas('meteran', function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->cari . '%');
            });
        }
        if ($request->bulan) {
            $bulan = $request->bulan;
        }
        if ($request->tahun) $tahun = $request->tahun;

        $query->whereHas('pemakaian.periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });

        $tagihan = $query->latest()->get();
        $dataCount = TagihanBulanan::count_stat($request);
        $totals = PeriodeTagihan::join('tagihan_bulanans', 'periode_tagihans.id', '=', 'tagihan_bulanans.periode_tagihan_id')
            ->select(
                'periode_tagihans.tahun',
                'periode_tagihans.bulan',
                DB::raw('SUM(tagihan_bulanans.total_tagihan) as total_tagihan_per_bulan')
            )
            ->groupBy('periode_tagihans.tahun', 'periode_tagihans.bulan')
            ->orderBy('periode_tagihans.tahun')
            ->where('tahun', $tahun)
            ->orderBy(DB::raw('MONTH(periode_tagihans.bulan)'), 'ASC')
            ->get();

        return inertia('Admin/TagihanPemakaianAir/Index', compact('tagihan', 'dataCount'));
    }

    public function cetak(Request $request)
    {

        $tahun = now()->format('Y');
        $bulan = now()->format('M');

        $query = TagihanBulanan::query()->with(['meteran', 'pemakaian' => function ($q) {
            $q->with('periode');
        }]);

        if ($request->status_pembayaran) {
            $query->where('status_pembayaran', $request->status_pembayaran);
        }
        if ($request->status_tunggakan) {
            $query->where('status_tunggakan', $request->status_tunggakan);
        }
        if ($request->cari) {
            $query->whereHas('meteran', function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->cari . '%');
            });
        }
        if ($request->bulan) {
            $bulan = $request->bulan;
        }
        if ($request->tahun) $tahun = $request->tahun;

        $query->whereHas('pemakaian.periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });

        $tagihan = $query->latest()->get();

        return inertia('Admin/TagihanPemakaianAir/Cetak', compact('tagihan'));
    }
}
