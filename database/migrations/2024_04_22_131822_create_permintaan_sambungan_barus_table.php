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
        Schema::create('permintaan_sambungan_barus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('kd_pendaftaran')->unique();
            $table->string('nik_pendaftar');
            $table->string('nama_pendaftar');
            $table->string('alamat_pemasangan');
            $table->string('blok');
            $table->string('no_telph');
            $table->string('peruntukan');
            $table->string('wilayah_pemasangan');
            $table->string('tempat_lahir_pendaftar');
            $table->date('tanggal_lahir_pendaftar');
            $table->string('jenis_kelamin_pendaftar');
            $table->string('foto_rekening_air_tetangga_pendaftar');
            $table->string('foto_ktp_pelanggan_pendaftar');
            $table->string('foto_kk_pelanggan_pendaftar');
            $table->string('foto_pbb_pendaftar');
            $table->string('status_pendaftaran')->default('menunggu pengecekan'); // menunggu pengecekan, pendaftarn di terima, pendaftaran di tolak
            $table->string('keterangan')->nullable();
            $table->string('petugas_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_sambungan_barus');
    }
};
