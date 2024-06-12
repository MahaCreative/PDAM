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
        Schema::create('sambungan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('permintaan_sambungan_id')->constrained('permintaan_sambungan_barus')->onDelete('cascade');
            $table->foreignId('wilayah_id')->constrained('wilayahs')->onDelete('cascade');
            $table->foreignId('harga_tarif_per_meter_id')->constrained('harga_tarif_per_meters')->onDelete('cascade');
            $table->string('no_sambungan')->unique();
            $table->string('nama_pelanggan');
            $table->text('alamat');
            $table->string('nama_golongan');
            $table->string('nama_kelompok');
            $table->string('uang_pendaftaran');
            $table->string('biaya_perencanaan');
            $table->string('biaya_pemasangan');
            $table->string('biaya_instalasi');
            $table->string('total_biaya');
            $table->string('tanggal_pemasangan')->nullable();
            $table->string('status_pembayaran')->default('menunggu pembayaran');
            $table->string('status_pemasangan')->default('proses pemasangan');
            $table->string('petugas_id');
            $table->string('petugas_yang_memasang');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sambungan_barus');
    }
};
