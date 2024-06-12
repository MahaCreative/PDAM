<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GolonganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Masing-masing golongan tersebut juga dibagi ke dalam beberapa
        // kategori, seperti Golongan Sosial 1A, 1B, dan 2A1; Rumah Tangga 2A1, 2A2, 2A3, 2A4, dan 2B;
        // Niaga 3A dan 3B; serta Industri 4A dan 4B.
        DB::table('golongans')->insert([
            ['nama' => 'sosial'],
            ['nama' => 'rumah tangga'],
            ['nama' => 'niaga'],
            ['nama' => 'industri'],

        ]);
    }
}
