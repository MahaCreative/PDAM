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
        Schema::create('pemasangan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id')->nullable();
            $table->foreignId('wilayah_id')->references('id')->on('wilayahs')->onDelete('cascade');

            $table->foreignId('harga_tarif_id')->references('id')->on('harga_tarif_per_meters')->onDelete('cascade');
            $table->string('kode_pemasangan_baru')->unique();
            $table->string('no_sambungan')->unique();
            $table->string('nama_pelanggan');
            $table->string('alamat_pemasangan');
            $table->string('nama_golongan');
            $table->string('nama_kelompok');
            $table->date('tgl_pemasangan')->nullable();
            $table->string('pipa_diameter');
            $table->string('status_pemasangan')->default('menunggu konfirmasi');
            $table->string('status_pembayaran')->default('menunggu konfirmasi');
            $table->string('nama_petugas_yang_menangani')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemasangan_barus');
    }
};
