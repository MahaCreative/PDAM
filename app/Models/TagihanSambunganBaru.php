<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagihanSambunganBaru extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pemasangan()
    {
        return $this->belongsTo(PemasanganBaru::class);
    }
}
