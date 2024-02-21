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
        Schema::create('tagihan_sambungan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemasangan_baru_id')->references('id')->on('pemasangan_barus')->onDelete('cascade');
            $table->integer('uang_pendaftaran');
            $table->integer('biaya_perencanaan');
            $table->integer('biaya_pemasangan');
            $table->integer('biaya_instalasi');
            $table->integer('total_biaya')->nullable();
            $table->string('tanggal_pembayaran')->nullable();
            $table->string('status_pembayaran')->default('menunggu konfirmasi');
            $table->string('nama_petugas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_sambungan_barus');
    }
};
