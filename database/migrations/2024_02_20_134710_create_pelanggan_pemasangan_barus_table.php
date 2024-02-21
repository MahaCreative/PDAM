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
        Schema::create('pelanggan_pemasangan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelanggan_id')->constrained('pelanggans')->onDelete('cascade');
            $table->foreignId('pemasangan_baru_id')->constrained('pemasangan_barus')->onDelete('cascade');
            // Tambahkan kolom-kolom lain yang mungkin Anda butuhkan di sini
            $table->timestamps();

            // Menentukan nama kunci unik secara manual
            $table->unique(['pelanggan_id', 'pemasangan_baru_id'], 'pelanggan_pemasangan_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggan_pemasangan_barus');
    }
};
