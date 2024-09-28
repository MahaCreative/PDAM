<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Petugas>
 */
class PetugasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nip' => rand(11111, 99999999),
            'nama' => $this->faker->name(),
            'no_hp' => $this->faker->phoneNumber(),
            'foto' => 'Image/preview_image.jpg'
        ];
    }
}
