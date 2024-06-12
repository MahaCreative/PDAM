<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeriodeTagihan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pemakaian()
    {
        return $this->hasMany(PencatatanMeter::class, 'periode_tagihan_id');
    }
}
