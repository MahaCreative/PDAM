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
            $table->foreignId("periode_tagihan_id")->constrained("periode_tagihans")->onDelete("cascade");
            $table->foreignId("meteran_pelanggan_id")->constrained("meteran_pelanggans")->onDelete("cascade");
            $table->integer("meter_awal");
            $table->integer("meter_akhir");
            $table->integer("meter_pemakaian");
            $table->string('tanggal_pencatatan')->nullable();
            $table->string("nama_petugas_pencatat")->nullable();
            $table->string('status_pencatatan')->default('belum dicatat');
            $table->string('tanggal_pembayaran')->nullable();
            $table->string('status_pembayaran')->default("belum lunas"); //Lunas dan Belum Lunas
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
