<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PeriodeTagihan>
 */
class PeriodeTagihanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bulan = ['january', 'february', 'maret', 'appril', 'mei', 'juny', 'july', 'agustus', 'september', 'oktober', 'november', 'desember'];
        return [
            'kode_periode' => rand(111111, 9999),
            'periode_tagihan' =>  $bulan[rand(0, 11)] . " " . rand(2022, 2024)
        ];
    }
}
