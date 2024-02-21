<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelompokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           DB::table('kelompoks')->insert([
            ['nama' => '1A'],
            ['nama' => '1B'],
            ['nama' => '2A1'],
            ['nama' => '2A2'],
            ['nama' => '2A3'],
            ['nama' => '2A4'],
            ['nama' => '3A'],
            ['nama' => '3B'],
            ['nama' => '4A'],
            ['nama' => '4B'],
        ]);
    }
}
