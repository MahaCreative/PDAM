<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelanggan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pemasangan()
    {
        return $this->belongsToMany(PemasanganBaru::class, 'pelanggan_pemasangan_barus', 'pelanggan_id', 'pemasangan_baru_id');
    }
}
