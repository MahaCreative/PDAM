<?php

namespace Database\Factories;

use App\Models\PemasanganBaru;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PencatatanMeter>
 */
class PencatatanMeterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pemasanganBaru = PemasanganBaru::factory()->create();
        return [
            'pemasangan_baru_id' => $pemasanganBaru->id,
            'tanggal_pencatatan' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'stand_meter_awal' => $standMeterAwal = rand(0, 60),
            'stand_meter_sekarang' => $standMeterSekarang = $standMeterAwal + rand(10, 40),
            'total_pemakaian' => $standMeterSekarang - $standMeterAwal,
            'nama_petugas_pencatat' => $this->faker->name(),
            'pemakaian_10' => '10',
            'pemakaian_20' => '10',
            'pemakaian_30' => '10',
            'pemakaian_30_keatas' => '10',
        ];
    }
}
