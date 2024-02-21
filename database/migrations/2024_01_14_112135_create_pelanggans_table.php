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
        Schema::create('pelanggans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->nullable();
            $table->foreignId('petugas_id')->nullable();

            $table->string('kd_pelanggan');
            $table->string('no_ktp')->unique();
            $table->string('nama_pelanggan');
            $table->string('alamat');
            $table->string('kecamatan');
            $table->string('foto');
            $table->string('no_telp')->unique();
            $table->string('konfirmasi')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggans');
    }
};
