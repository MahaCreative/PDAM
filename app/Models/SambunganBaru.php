<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SambunganBaru extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function harga_tarif()
    {
        return $this->belongsTo(HargaTarifPerMeter::class, 'harga_tarif_per_meter_id');
    }
    public function permintaan()
    {
        return $this->belongsTo(PermintaanSambunganBaru::class, 'permintaan_sambungan_id');
    }
    public function bukti_pembayaran()
    {
        return $this->hasMany(InvoicePembayaranSambungan::class,  'sambungan_baru_id', 'id');
    }

    public static function count_jenis_pemasnagan()
    {
        $data = [
            "pemasangan_selsai" => static::where('status_pemasangan', 'pemasangan selesai')->where('status_pembayaran', 'pembayaran di terima')->count(),
            "pemasangan_diproses" => static::where('status_pemasangan', 'proses pemasangan')->where('status_pembayaran', 'pembayaran di terima')->count(),
        ];

        return $data;
    }
}
