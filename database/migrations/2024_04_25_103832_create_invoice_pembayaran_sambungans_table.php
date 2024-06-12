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
        Schema::create('invoice_pembayaran_sambungans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('sambungan_baru_id')->constrained('sambungan_barus')->onDelete('cascade');
            $table->string('foto_bukti_pembayaran');
            $table->string('nama_pengirim');
            $table->string('bank_pengirim');
            $table->string('no_rek_pengirim');
            $table->string('bank_pdam');
            $table->string('nama_pdam');
            $table->string('rek_pdam');
            $table->string('nama_petugas_konfirmasi')->nullable();
            $table->string('status_pembayaran')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_pembayaran_sambungans');
    }
};
