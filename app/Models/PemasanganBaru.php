<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PemasanganBaru extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pelanggan()
    {
        return $this->belongsToMany(Pelanggan::class, 'pelanggan_pemasangan_barus', 'pemasangan_baru_id', 'pelanggan_id');
    }
    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class);
    }

    public function hargaTarif()
    {
        return $this->belongsTo(HargaTarifPerMeter::class);
    }
    public function petugas()
    {
        return $this->belongsTo(User::class);
    }

    public function tagihan_pemasangan()
    {
        return $this->hasOne(TagihanSambunganBaru::class);
    }

    public function pencatatanMeter()
    {
        return $this->hasMany(PencatatanMeter::class);
    }
}
