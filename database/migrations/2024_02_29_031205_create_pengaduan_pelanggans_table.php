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
        Schema::create('pengaduan_pelanggans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_id')->references('id')->on('jenis_pengaduans')->onDelete('cascade');
            $table->foreignId('pelanggan_id')->references('id')->on('pelanggans')->onDelete('cascade');
            $table->foreignId('petugas_id')->nullable()->references('id')->on('petugas');
            $table->string('judul_pengaduan');
            $table->string('text');
            $table->string('alamat');
            $table->string('foto');
            $table->string('nomor_hp');
            $table->string('status_dilihat')->default('belum di lihat');
            $table->string('status_pengaduan')->default('menunggu konfirmasi');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduan_pelanggans');
    }
};
