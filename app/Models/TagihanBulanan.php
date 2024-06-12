<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagihanBulanan extends Model
{
    use HasFactory;
    protected $guarded = [];


    public static function count_stat($request = null)
    {
        $totalBelum = TagihanBulanan::where('status_pembayaran', '=', 'belum lunas');
        $totalLunas = TagihanBulanan::where('status_pembayaran', '=', 'lunas');
        $totalTagihan = TagihanBulanan::query();
        $lunas = TagihanBulanan::with('periode')->where('status_pembayaran', '=', 'lunas');
        $belum = TagihanBulanan::with('periode')->where('status_pembayaran', '=', 'belum lunas');
        $menunggak = TagihanBulanan::with('periode')->where('status_tunggakan', '=', 'menunggak');
        $tidak = TagihanBulanan::with('periode')->where('status_tunggakan', '=', 'tidak menunggak');
        $bulan = '';
        $tahun = '';
        if ($request) {
            $bulan = $request->bulan;
            $tahun = $request->tahun;
        }
        $totalBelum = $totalBelum->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $totalLunas = $totalLunas->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $totalTagihan = $totalTagihan->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $lunas = $lunas->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $belum = $belum->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $menunggak = $menunggak->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $tidak = $tidak->whereHas('periode', function ($q) use ($bulan, $tahun) {
            $q->where('bulan', $bulan)->where('tahun', $tahun);
        });
        $data = [
            "total_tagihan" =>  [
                'totalTagihan' => $totalTagihan->sum('total_tagihan'),
                'totalBelum' => $totalBelum->sum('total_tagihan'),
                'totalLunas' => $totalLunas->where('status_pembayaran', '=', 'lunas')->sum('total_tagihan'),
            ],
            "count_status_pembayaran" => [
                'lunas' => $lunas->count(),
                'belum_lunas' => $belum->count(),
                'all' => TagihanBulanan::count(),
            ],
            "count_status_tunggakan" => [
                'menunggak' => $menunggak->count(),
                'tidak' => $tidak->count(),
                'all' => TagihanBulanan::count(),
            ],
        ];


        return $data;
    }


    public function pemakaian()
    {
        return $this->belongsTo(PencatatanMeter::class, 'pencatatan_meter_id');
    }

    public function meteran()
    {
        return $this->belongsTo(MeteranPelanggan::class, 'meteran_pelanggan_id');
    }

    public function periode()
    {
        return $this->belongsTo(PeriodeTagihan::class, 'periode_tagihan_id');
    }
    public function pembayaran()
    {
        return $this->hasMany(PembayaranTagihan::class);
    }
}
