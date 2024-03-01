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
        Schema::create('invoice_tagihan_pemasngan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('order_id')->unique();
            $table->double('total_pembayaran');
            $table->foreignId('tagihan_sambungan_id')->references('id')->on('tagihan_sambungan_barus')->onDelete('cascade');
            $table->json('payment_info')->nullable();
            $table->string('payment_type');
            $table->dateTime('succeeded_at')->nullable();
            $table->string('status_pembayaran')->default('menunggu konfirmasi');
            $table->string('petugas_menerima')->default();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_tagihan_pemasngan_barus');
    }
};
