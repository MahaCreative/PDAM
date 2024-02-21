<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisPengaduanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jenis_pengaduans')->insert([
            [
                'jenis_pengaduan' => 'pengaduan sambungan rumah baru',
            ],
            [
                'jenis_pengaduan' => 'pengaduan pelayanan pasang kembali',
            ],
            [
                'jenis_pengaduan' => 'pengaduan balik nama',
            ],
            [
                'jenis_pengaduan' => 'pengaduan lainnya',
            ],
            [
                'jenis_pengaduan' => 'lonjakan tagihan air',
            ],
            [
                'jenis_pengaduan' => 'tagihan air tidak sesuai pemaiakan',
            ],
            [
                'jenis_pengaduan' => 'tagihan air perbulan tidak stabil',
            ],
            [
                'jenis_pengaduan' => 'tagihan rekening air belum terkonfirmasi',
            ],
            [
                'jenis_pengaduan' => 'tagihan rekening air suda dibayar tapi masih ada tunggakan',
            ],
        ]);
    }
}
