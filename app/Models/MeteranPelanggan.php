<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeteranPelanggan extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function user()
    {
        return $this->belongsToMany(User::class, 'user_id');
    }
    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class);
    }
    public function harga_tarif()
    {
        return $this->belongsTo(HargaTarifPerMeter::class, 'harga_tarif_per_meter_id');
    }

    public function pemakaian()
    {
        return $this->hasMany(PencatatanMeter::class);
    }

    public function tagihan()
    {
        return $this->hasMany(TagihanBulanan::class);
    }

    public static function  count_status()
    {
        $aktif = static::where("status_meteran", '=', 'aktif')->count();
        $non = static::where("status_meteran", '=', 'non aktif')->count();
        $all = static::count();
        $cabut =
            static::where("status_meteran", '=', 'pencbutan sementara')->count();
        return [
            "aktif" => $aktif,
            'non' => $non,
            'cabut' => $cabut,
            'all' => $all
        ];
    }
}
