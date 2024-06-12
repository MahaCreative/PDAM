<?php

namespace Database\Factories;

use App\Models\Golongan;
use App\Models\HargaTarifPerMeter;
use App\Models\Kelompok;
use App\Models\Wilayah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeteranPelanggan>
 */
class MeteranPelangganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        $golongan = Golongan::all();
        $kelompok = Kelompok::all();
        $status = ["aktif", "pencabutan sementara", "non aktif"];
        return [
            "nik" => rand(1111111111111111, 9999999999999999),
            "nama" => $this->faker->name(),
            "alamat" =>  $this->faker->address(),
            "blok" => 'A1',
            "no_telph" =>  $this->faker->phoneNumber(),
            "no_meteran" => rand(111111, 9999999),
            "no_sambungan" => rand(111111, 9999999),
            "nama_golongan" => $golongan[rand(0, Golongan::count() - 1)]->nama,
            "nama_kelompok" => $kelompok[rand(0, Kelompok::count() - 1)]->nama,

            'tanggal_pemasangan' => $this->faker->dateTimeBetween('-2 years', 'now'),
            "harga_tarif_per_meter_id" => rand(1, HargaTarifPerMeter::count() - 1),
            "status_meteran" => $status[0],
        ];
    }
}
