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
        Schema::create('meteran_pelanggans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sambungan_baru_id')->nullable();
            $table->string('nik');
            $table->string('nama');
            $table->string('alamat');
            $table->string('blok');
            $table->string('no_telph');
            $table->string('no_meteran');
            $table->string('no_sambungan');
            $table->string('nama_golongan');
            $table->string('nama_kelompok');
            $table->string('tanggal_pemasangan');

            $table->foreignId('harga_tarif_per_meter_id')->constrained('harga_tarif_per_meters')->onDelete('cascade');
            $table->string('status_meteran')->default("aktif"); //Aktif, Pencabutan Sementara , Non Aktif
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meteran_pelanggans');
    }
};
