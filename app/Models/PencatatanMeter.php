<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PencatatanMeter extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pemasanganBaru()
    {
        return $this->belongsTo(PemasanganBaru::class);
    }
}
