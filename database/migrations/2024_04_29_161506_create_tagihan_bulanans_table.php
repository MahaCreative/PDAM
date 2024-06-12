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
        Schema::create('tagihan_bulanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId("pencatatan_meter_id")->constrained("pencatatan_meters")->onDelete("cascade");
            $table->foreignId("meteran_pelanggan_id")->constrained("meteran_pelanggans")->onDelete("cascade");
            $table->foreignId("periode_tagihan_id")->constrained("periode_tagihans")->onDelete("cascade");
            $table->string("stand_meter_awal");
            $table->string("stand_meter_akhir");
            $table->string("total_pemakaian");
            $table->string("pemakaian_10");
            $table->string("pemakaian_20");
            $table->string("pemakaian_30");
            $table->string("pemakaian_30_keatas");
            $table->string("tarif_pemakaian_10");
            $table->string("tarif_pemakaian_20");
            $table->string("tarif_pemakaian_30");
            $table->string("tarif_pemakaian_30_keatas");
            $table->string("adm");
            $table->string("denda");
            $table->string("total_tagihan");
            $table->string('tanggal_pembayaran')->nullable();
            $table->string("status_pembayaran")->default("belum lunas");
            $table->string("nama_petugas_konfirmasi")->nullable();
            $table->string("status_tunggakan")->default("tidak menunggak"); // Menunggak, Tidak Menunggak
            $table->string('pembayaran_aktif')->default('tidak');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_bulanans');
    }
};
