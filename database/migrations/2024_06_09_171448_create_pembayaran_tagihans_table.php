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
            $table->string('tagihan_bulanan_id');
            $table->string('order_id');
            $table->string('no_meter');
            $table->string('no_sambungan');
            $table->string('periode_tagihan');
            $table->string('tanggal_pembayaran')->nullable();
            $table->json('payment_info')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('payment_status')->default('pending');
            $table->string('total_pembayaran');
            $table->string('token')->nullable();
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
