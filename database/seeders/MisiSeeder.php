<?php

namespace Database\Seeders;

use App\Models\Misi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Misi::create([
            'misi' => 'Memastikan pengelolaan keuangan yang transparan untuk kesejahteraan masyarakat',
            'icon' => 'Image/1.png',
        ]);
        Misi::create([
            'misi' => 'Membangun masyarakat yang bijak dalam penggunaan air',
            'icon' => 'Image/2.png',
        ]);
        Misi::create([
            'misi' => 'Membangun masyarakat yang bijak dalam penggunaan air',
            'icon' => 'Image/3.png',
        ]);
        Misi::create([
            'misi' => 'Membangun lingkungan kerja yang memprioritaskan integritas dan prestasi',
            'icon' => 'Image/4.png',
        ]);
    }
}
