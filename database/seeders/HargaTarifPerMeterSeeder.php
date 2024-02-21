<?php

namespace Database\Seeders;

use App\Models\Golongan;
use App\Models\Kelompok;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HargaTarifPerMeterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // golongan 4 kelompok 11
        $kelompok = Kelompok::all();
        $golongan = Golongan::all();
        DB::table('harga_tarif_per_meters')->insert([
            [
                'golongan' => $golongan[0]->nama,
                'kelompok' => $kelompok[0]->nama,
                'tarif1' => '900',
                'tarif2' => '1100',
                'tarif3' => '1650',
                'tarif4' => '2000',
            ],
            [
                'golongan' => $golongan[0]->nama,
                'kelompok' => $kelompok[1]->nama,
                'tarif1' => '1700',
                'tarif2' => '1800',
                'tarif3' => '1900',
                'tarif4' => '2000',
            ],
            [
                'golongan' => $golongan[1]->nama,
                'kelompok' => $kelompok[2]->nama,
                'tarif1' => '1550',
                'tarif2' => '1950',
                'tarif3' => '3650',
                'tarif4' => '4500',
            ],
            [
                'golongan' => $golongan[1]->nama,
                'kelompok' => $kelompok[3]->nama,
                'tarif1' => '2170',
                'tarif2' => '2950',
                'tarif3' => '4150',
                'tarif4' => '5250',
            ],
            [
                'golongan' => $golongan[1]->nama,
                'kelompok' => $kelompok[4]->nama,
                'tarif1' => '3000',
                'tarif2' => '4000',
                'tarif3' => '5000',
                'tarif4' => '6500',
            ],
            [
                'golongan' => $golongan[1]->nama,
                'kelompok' => $kelompok[5]->nama,
                'tarif1' => '4000',
                'tarif2' => '5000',
                'tarif3' => '6000',
                'tarif4' => '7000',
            ],
            [
                'golongan' => $golongan[2]->nama,
                'kelompok' => $kelompok[6]->nama,
                'tarif1' => '5000',
                'tarif2' => '6000',
                'tarif3' => '7000',
                'tarif4' => '11000',
            ],
            [
                'golongan' => $golongan[2]->nama,
                'kelompok' => $kelompok[7]->nama,
                'tarif1' => '6000',
                'tarif2' => '7000',
                'tarif3' => '8200',
                'tarif4' => '11250',
            ],
            [
                'golongan' => $golongan[3]->nama,
                'kelompok' => $kelompok[8]->nama,
                'tarif1' => '7500',
                'tarif2' => '8000',
                'tarif3' => '9000',
                'tarif4' => '10000',
            ],
            [
                'golongan' => $golongan[3]->nama,
                'kelompok' => $kelompok[9]->nama,
                'tarif1' => '11000',
                'tarif2' => '12500',
                'tarif3' => '13500',
                'tarif4' => '14500',
            ],
        ]);
    }
}
