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
        Schema::create('pembayaran_tagihans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->nullable();
            $table->foreignId('tagihan_id')->references('id')->on('tagihan_bulanans')->onDelete('cascade');
            $table->string('via_pembayaran');
            $table->string('bank_pengirim')->nullable();
            $table->string('req_pengirim')->nullable();
            $table->string('nama_pengirim')->nullable();
            $table->string('bank_pdam')->nullable();
            $table->string('nama_pdam')->nullable();
            $table->string('req_pdam')->nullable();
            $table->string('nama_penerima')->nullable();
            $table->string('status_pembayaran')->default('belum dikonfirmasi');
            $table->string('foto_pembayaran')->nullable();
            $table->date('tanggal_pembayaran');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_tagihans');
    }
};
