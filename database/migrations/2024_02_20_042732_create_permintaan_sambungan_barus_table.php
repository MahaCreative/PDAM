<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permintaan_sambungan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id');
            $table->foreignId('petugas_id')->nullable();
            $table->foreignId('pemasangan_baru_id')->nullable();
            $table->string('foto_ktp');
            $table->string('foto_kk');
            $table->string('foto_rekening_air_tetangga');
            $table->string('no_telph');
            $table->string('alamat_pemasangan');
            $table->string('wilayah');
            $table->string('nama_kelompok');
            $table->string('nama_golongan');
            $table->string('status_permintaan')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_sambungan_barus');
    }
};
