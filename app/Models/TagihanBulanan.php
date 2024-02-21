<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagihanBulanan extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function tarif()
    {
        return $this->belongsTo(HargaTarifPerMeter::class, 'tarif_id', 'id');
    }
    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class);
    }

    public function pembayaranTagihan()
    {
        return $this->hasOne(PembayaranTagihan::class, 'tagihan_id', 'id');
    }
}
