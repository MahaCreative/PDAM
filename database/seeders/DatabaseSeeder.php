<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\HargaTarifPerMeter;
use App\Models\Pelanggan;
use App\Models\PemasanganBaru;
use App\Models\PencatatanMeter;
use App\Models\Petugas;
use App\Models\SettingProfile;
use App\Models\TagihanBulanan;
use App\Models\User;
use Database\Factories\TagihanBulananFactory;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $role = Role::create([
            'name' => 'admin', 'guard_name' => 'web'
        ]);
        $role = Role::create([
            'name' => 'petugas lapangan', 'guard_name' => 'web'

        ]);
        $role = Role::create([
            'name' => 'pelanggan', 'guard_name' => 'web'
        ]);
        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password')
        ]);
        $user->assignRole('admin');
        $petugas = Petugas::create([
            'user_id' => $user->id,
            'nama' => 'Admin ini kaue',
            'no_hp' => '082194255717',
        ]);
        $user = User::create([
            'name' => 'petugas lapangan',
            'email' => 'petugas_lapangan@gmail.com',
            'password' => bcrypt('password')
        ]);
        $user->assignRole('petugas lapangan');
        $petugas = Petugas::create([
            'user_id' => $user->id,
            'nama' => 'Petugas Lapangan 1',
            'no_hp' => '082194255717',
        ]);
        $this->call([
            WilayahSeeder::class,
            KelompokSeeder::class,
            GolonganSeeder::class,
            HargaTarifPerMeterSeeder::class,
            SettingProfileSeeder::class,
            JenisPengaduanSeeder::class,
        ]);
        // PencatatanMeter::factory(3)->create();
        // PemasanganBaru::factory(3)->create();
        // TagihanBulanan::factory(10)->create();
    }
}
