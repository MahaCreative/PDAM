<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelompok extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pemasangan()
    {
        return $this->hasMany(PemasanganBaru::class, 'nama_kelompok', 'nama');
    }

    public function pemasanganBaruCount()
    {
        return $this->pemasanganBaru()->count();
    }
}
