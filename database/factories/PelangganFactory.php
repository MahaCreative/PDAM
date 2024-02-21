<?php

namespace Database\Factories;

use App\Models\Pelanggan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pelanggan>
 */
class PelangganFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kd_pelanggan' => 'P/00' . rand(1,100000)  . 'D/'. $this->faker->dateTimeBetween("- 1 years", 'now')->format('dmy') ,
            'no_ktp' => rand(111111111111,999999999999),
            'nama_pelanggan' => $this->faker->name(),
            'alamat' => $this->faker->address(),
            'kecamatan' => $this->faker->sentence(),
            'foto' => 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpxhere.com%2Fid%2Ftag%2F215&psig=AOvVaw0OYVFEQoddFEKEX7H3Gyq1&ust=1705325424574000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCOjM6rT-3IMDFQAAAAAdAAAAABAE',
            'no_telp' => $this->faker->phoneNumber(),
        ];
    }
}
