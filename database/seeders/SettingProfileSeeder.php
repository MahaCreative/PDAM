<?php

namespace Database\Seeders;

use App\Models\SettingProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SettingProfile::create([
            'nama_perusaaan' => 'PDAM ANU ANU',
            'alamat_perusahaan' => 'Jl ini Alamat Ini Kelurahan Ini',
            'email_perusahaan' => 'perusahaan@gmail.com',
            'telp_perusahaan' => '082194259899',
            'logo_perusahaan' => 'Image/preview_image.jpg',
        ]);
    }
}
