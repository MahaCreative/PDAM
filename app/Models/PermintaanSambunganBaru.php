<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanSambunganBaru extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sambungan_baru()
    {
        return $this->hasOne(SambunganBaru::class,   'permintaan_sambungan_id',);
    }
}
