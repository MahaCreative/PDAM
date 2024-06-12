<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sliders')->insert(
            [
                [
                    "foto" => "slider/1.jpeg",
                    'created_at' => now()

                ],
                [
                    "foto" => "slider/2.jpeg",
                    'created_at' => now()

                ],
                [
                    "foto" => "slider/3.jpeg",
                    'created_at' => now()

                ],
                [
                    "foto" => "slider/4.jpeg",
                    'created_at' => now()

                ],
            ]
        );
    }
}
