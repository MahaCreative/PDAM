<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\HargaTarifPerMeter;
use App\Models\MeteranPelanggan;
use App\Models\Misi;
use App\Models\Pelanggan;
use App\Models\PemasanganBaru;
use App\Models\PencatatanMeter;
use App\Models\Pengaduan;
use App\Models\PeriodeTagihan;
use App\Models\Petugas;
use App\Models\ProfilePelanggan;
use App\Models\SettingProfile;
use App\Models\TagihanBulanan;
use App\Models\User;
use Database\Factories\TagihanBulananFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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

        // $user = User::create([
        //     'name' => 'guntur madjid',
        //     'email' => 'gunturmadjid.3@gmail.com',
        //     'password' => bcrypt('password'),
        // ]);
        // $user->assignRole('pelanggan');
        // $profilePelanggan = ProfilePelanggan::create(
        //     [
        //         'user_id' => $user->id,
        //         "kd_pelanggan" => now()->format('dmy') . "001",
        //         "no_ktp" => '7306071701980005',
        //         "nama_pelanggan" => 'guntur madjid',
        //         "alamat" => 'makassar',
        //         "kecamatan" => 'mamuju',
        //         "foto" => 'Image/preview_image.jpg',
        //         "no_telp" => '082194255717',
        //     ]
        // );

        $user2 = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $user2->assignRole('admin');
        $petugas = Petugas::create([
            'user_id' => $user2->id,
            'nama' => 'admin',
            'no_hp' => '082194255717',

        ]);

        $user3 = User::create([
            'name' => 'petugas',
            'email' => 'petugas@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $user3->assignRole('petugas lapangan');
        $petugas = Petugas::create([
            'user_id' => $user3->id,
            'nama' => 'petugas lapangan',
            'no_hp' => '082194255798',
        ]);

        // $user3 = User::factory(10)->hasPetugas(1)->create();
        // $getUser = User::whereNotIn('id', [1, 2])->get();
        // foreach ($getUser as $item) {
        //     $item->assignRole('petugas lapangan');
        // }
        // DB::table('banks')->insert([
        //     [
        //         'nama_bank' => 'BRI',
        //         'nama_rek' => 'BTN TIRTA ABADI',
        //         'no_rek' => '0218-01-01-7583',
        //     ],
        //     [
        //         'nama_bank' => 'BTN',
        //         'nama_rek' => 'BTN TIRTA ABADI',
        //         'no_rek' => '7589-01-01-7583',
        //     ],
        //     [
        //         'nama_bank' => 'BNI',
        //         'nama_rek' => 'BTN TIRTA ABADI',
        //         'no_rek' => '0218-7583',
        //     ],
        // ]);
        $this->call([
            WilayahSeeder::class,
            KelompokSeeder::class,
            GolonganSeeder::class,
            HargaTarifPerMeterSeeder::class,
            SettingProfileSeeder::class,
            JenisPengaduanSeeder::class,
            VisiSeeder::class,
            MisiSeeder::class,
            StatusSeeder::class,
            StrukturOrganisasiSeeder::class,
            SusunanDireksiSeeder::class,
            SejarahSeeder::class,
            SliderSeeder::class,
        ]);
        MeteranPelanggan::factory(10)->create();
    }
}
