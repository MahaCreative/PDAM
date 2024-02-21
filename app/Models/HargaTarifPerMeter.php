<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HargaTarifPerMeter extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function kelompok()
    {
        return $this->belongsTo(Kelompok::class, 'kelompok', 'nama');
    }
    public function golongan()
    {
        return $this->belongsTo(Golongan::class, 'golongan', 'nama');
    }
}
