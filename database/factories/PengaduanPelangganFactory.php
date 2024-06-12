<?php

namespace Database\Factories;

use App\Models\JenisPengaduan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PengaduanPelanggan>
 */
class PengaduanPelangganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['belum di proses', 'dihentikan', 'diperbaiki', 'selesai'];
        return [
            'jenis_pengaduan_id' => rand(0, JenisPengaduan::count() - 1),
            "user_id" => '3',
            "kd_pengaduan" => rand(111111, 999999999),
            "nama_pelapor" => $this->faker->name(),
            "alamat" => $this->faker->address(),
            "no_telp" => $this->faker->phoneNumber(),
            "langtitude" => rand(-5.0000, 5.0000),
            "longtitude" => rand(100.0000, 120.0000),
            "pengaduan" => $this->faker->sentence(),
            "foto" => "/storage/Image/preview_image.jpg",
            "tanggal_pengaduan" => $tanggal = $this->faker->dateTimeBetween('-1 years', 'now'),
            "tanggal_proses_pengaduan" => $tanggal,
            "status_fakta" => 'ya',
            "hasil_lapangan" => $this->faker->sentence(),
            "status" => $status[rand(0, 3)],
            "nama_petugas_menangani" => $this->faker->name(),
            "status_konfirmasi" => 'di terima',
        ];
    }
}
