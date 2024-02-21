<?php

namespace Database\Factories;

use App\Models\PemasanganBaru;
use App\Models\PencatatanMeter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TagihanBulanan>
 */
class TagihanBulananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pencatatanMeter = PencatatanMeter::factory()->create();
        $pemasangan_baru = PemasanganBaru::findOrFail($pencatatanMeter->pemasangan_baru_id);
        return [
            'pencatatan_meter_id' => $pencatatanMeter->id,
            'tarif_id' => $pemasangan_baru->harga_tarif_id,
            'pemasangan_baru_id' => $pemasangan_baru->id,
            'wilayah_id' => $pemasangan_baru->wilayah_id,
            'kode_sambungan' => $pemasangan_baru->kode_pemasangan_baru,
            'no_sambungan' => $pemasangan_baru->no_sambungan,
            'nama_pelanggan' => $pemasangan_baru->nama_pelanggan,
            'alamat' => $pemasangan_baru->alamat_pemasangan,
            'periode_tagihan' => $periode = $this->faker->dateTimeBetween('- 1 year', 'now'),
            'stand_meter_awal' => '0',
            'stand_meter_akhir' => '10',
            'total_pemakaian' => '10',
            'pemakaian_10' => '10',
            'pemakaian_20' => '0',
            'pemakaian_30' => '0',
            'pemakaian_30_keatas' => '0',
            'tarif_pemakaian_10' => '110000',
            'tarif_pemakaian_20' => '0',
            'tarif_pemakaian_30' => '0',
            'tarif_pemakaian_30_keatas' => '0',
            'total_tagihan' => '25000',
            'adm' => '2500',
            'denda' => '0',
            'tanggal_tagihan' => $periode,
        ];
    }
}
