<?php

namespace Database\Factories;

use App\Models\Golongan;
use App\Models\HargaTarifPerMeter;
use App\Models\Kelompok;
use App\Models\Pelanggan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PemasanganBaru>
 */
class PemasanganBaruFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pelangganFactory = Pelanggan::factory()->create();
        $hargaTarif = HargaTarifPerMeter::all();
        return [
            'wilayah_id' => rand(1, 3),
            'pelanggan_id' => $pelangganFactory->id,
            'harga_tarif_id' => rand(1, 10),
            'kode_pemasangan_baru' => 'id/' . $pelangganFactory->id . '/NP/0' . rand(1, 1000) . 'D/0' . $this->faker->dateTimeBetween("- 1 years", 'now')->format('dmy'),
            'no_sambungan' => rand(111111111, 9999999999),
            'nama_pelanggan' => $pelangganFactory->nama_pelanggan,
            'alamat_pemasangan' => $pelangganFactory->alamat,
            'nama_golongan' => $hargaTarif[$count = rand(0, count($hargaTarif) - 1)]->golongan,
            'nama_kelompok' => $hargaTarif[$count]->kelompok,
            'uang_pendaftaran' => 150000,
            'biaya_perencanaan' => 50000,
            'biaya_pemasangan' => 1500000,
            'biaya_instalasi' => 2000000,
            'total_biaya' => 150000 + 50000 + 1500000 + 2000000,
            'tgl_pemasangan' => $this->faker->dateTimeBetween("- 1 years", 'now'),
            'pipa_diameter' => 8,
        ];
    }
}
