<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengaduan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function jenis_pengaduan()
    {
        return $this->belongsTo(JenisPengaduan::class);
    }
}
