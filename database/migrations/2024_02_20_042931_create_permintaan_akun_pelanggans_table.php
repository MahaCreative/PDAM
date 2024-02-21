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
        Schema::create('permintaan_akun_pelanggans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id');
            $table->foreignId('nomor_sambungan')->nullable();
            $table->foreignId('kode_sambungan')->nullable();
            $table->string('nama_pelanggan');
            $table->string('status_permintaan');
            $table->string('bukti_foto_kwitansi');
            $table->text('catatan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_akun_pelanggans');
    }
};
