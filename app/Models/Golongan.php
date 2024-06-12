<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Golongan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pemasangan()
    {
        return $this->hasMany(SambunganBaru::class, 'nama_golongan', 'nama');
    }

    public function pemasanganBaruCount()
    {
        return $this->pemasanganBaru()->count();
    }
}
