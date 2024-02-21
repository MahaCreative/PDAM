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
        Schema::disableForeignKeyConstraints();
        Schema::create('tagihan_bulanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pencatatan_meter_id')->references('id')->on('pencatatan_meters')->onDelete('cascade');
            $table->foreignId('tarif_id')->references('id')->on('harga_tarif_per_meters')->onDelete('cascade');
            $table->foreignId('pemasangan_baru_id')->references('id')->on('pemasangan_barus')->onDelete('cascade');
            $table->foreignId('wilayah_id')->references('id')->on('wilayahs')->onDelete('cascade');
            $table->string('kode_sambungan');
            $table->string('no_sambungan');
            $table->string('nama_pelanggan');
            $table->string('alamat');
            $table->date('periode_tagihan');
            $table->integer('stand_meter_awal');
            $table->integer('stand_meter_akhir');
            $table->integer('total_pemakaian');
            $table->integer('pemakaian_10');
            $table->integer('pemakaian_20');
            $table->integer('pemakaian_30');
            $table->integer('pemakaian_30_keatas');
            $table->integer('tarif_pemakaian_10');
            $table->integer('tarif_pemakaian_20');
            $table->integer('tarif_pemakaian_30');
            $table->integer('tarif_pemakaian_30_keatas');
            $table->integer('adm')->default(0);
            $table->integer('denda')->default(0);
            $table->integer('total_tagihan');
            $table->date('tanggal_tagihan');
            $table->string('status_pembayaran')->default('belum dibayar');
            $table->string('status_konfirmasi_pembayaran')->default('belum dikonfirmasi');
            $table->string('nama_petugas_konfirmasi')->nullable();
            $table->string('status_tunggakan')->default('Tidak Menunggak');
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_bulanans');
    }
};
