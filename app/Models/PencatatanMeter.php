<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PencatatanMeter extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function meteran()
    {
        return $this->belongsTo(MeteranPelanggan::class, 'meteran_pelanggan_id');
    }

    public static function count_pembayaran($id = null)
    {
        if ($id) {
            $lunas = static::where('periode_tagihan_id', $id)->where('status_pembayaran', '=', 'lunas')->count();
            $belum_lunas = static::where('periode_tagihan_id', $id)->where('status_pembayaran', '=', 'belum lunas')->count();
            $all = static::count();
        } else {

            $lunas = static::where('status_pembayaran', '=', 'lunas')->count();
            $belum_lunas = static::where('status_pembayaran', '=', 'belum lunas')->count();
            $all = static::count();
        }
        return [
            'lunas' => $lunas,
            'belum_lunas' => $belum_lunas,
            'all' => $all
        ];
    }

    public static function count_catat($id = null)
    {
        if ($id) {
            return [
                'belum_dicatat' => static::where('periode_tagihan_id', $id)->where('status_pencatatan', 'belum dicatat')->count(),
                'sudah_dicatat' => static::where('periode_tagihan_id', $id)->where('status_pencatatan', 'sudah dicatat')->count(),
            ];
        } else {
            return [
                'belum_dicatat' => static::where('status_pencatatan', 'belum dicatat')->count(),
                'sudah_dicatat' => static::where('status_pencatatan', 'sudah dicatat')->count(),
            ];
        }
    }

    public function periode()
    {
        return $this->belongsTo(PeriodeTagihan::class, 'periode_tagihan_id');
    }
}
