<?php

namespace Database\Seeders;

use App\Models\Sejarah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SejarahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sejarah::create([
            'tahun' => '1990',
            'text' => '
            <div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
            </div>
            ',
        ]);
        Sejarah::create([
            'tahun' => '1990',
            'text' => '
            <div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
            </div>
            ',
        ]);
        Sejarah::create([
            'tahun' => '1990',
            'text' => '
            <div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan  sebagai BUMD berdasarkan :</div>
                
            </div>
            ',
        ]);
        Sejarah::create([
            'tahun' => '1990',
            'text' => '
            <div>
                <div class="mb-4">Berdirinya  sebagai BUMD berdasarkan :</div>
                
            </div>
            ',
        ]);
        Sejarah::create([
            'tahun' => '1990',
            'text' => '
            <div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
                
            </div>
            ',
        ]);
        Sejarah::create([
            'tahun' => '1990',
            'text' => '
            <div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
                <div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
            </div>
            ',
        ]);
    }
}
