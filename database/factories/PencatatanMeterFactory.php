<?php

namespace Database\Factories;

use App\Models\MeteranPelanggan;
use App\Models\PemasanganBaru;
use App\Models\User;
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
        $user = User::whereNotIn('id', [1, 2])->get();
        $status = ['lunas', 'belum lunas'];
        return [
            'meteran_pelanggan_id' => rand(1, MeteranPelanggan::count() - 1),
            'meter_awal' => '0',
            'meter_akhir' => $pemakaian = rand(1, 50),
            'meter_pemakaian' => $pemakaian,
            'tanggal_pencatatan' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'nama_petugas_pencatat' => $user[rand(1, User::count() - 3)]->name,
            'status_pembayaran' => $status[rand(0, 1)]
        ];
    }
}
