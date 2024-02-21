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
        Schema::create('pencatatan_meters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petugas_id')->nullable();
            $table->foreignId('pemasangan_baru_id')->references('id')->on('pemasangan_barus')->onDelete('cascade');
            $table->date('tanggal_pencatatan')->default(now());
            $table->integer('stand_meter_awal');
            $table->integer('stand_meter_sekarang');
            $table->integer('total_pemakaian');
            $table->integer('pemakaian_10');
            $table->integer('pemakaian_20');
            $table->integer('pemakaian_30');
            $table->integer('pemakaian_30_keatas');
            $table->string('status_diterima')->default('menunggu konfirmasi');
            $table->string('nama_petugas_pencatat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pencatatan_meters');
    }
};
