<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WilayahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('wilayahs')->insert([
            [
                'kode_wilayah' => 'WL01',
                'nama_wilayah' => 'wilayah 1',
                'deskripsi_wilayah' => 'wilayah terkait adalah Dusun ini, Dusun Ini Dusun Itu',
            ],
            [
                'kode_wilayah' => 'WL02',
                'nama_wilayah' => 'wilayah 2',
                'deskripsi_wilayah' => 'wilayah terkait adalah Dusun ini, Dusun Ini Dusun Itu',
            ],
            [
                'kode_wilayah' => 'WL03',
                'nama_wilayah' => 'wilayah 2',
                'deskripsi_wilayah' => 'wilayah terkait adalah Dusun ini, Dusun Ini Dusun Itu',
            ],
            ]);


    }
}
