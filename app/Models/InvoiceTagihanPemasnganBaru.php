<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceTagihanPemasnganBaru extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'payment_info' => 'array'
    ];
}
