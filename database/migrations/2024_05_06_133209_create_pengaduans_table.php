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
        Schema::create('pengaduans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_pengaduan_id')->constrained('jenis_pengaduans')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('kd_pengaduan');
            $table->string('nama_pelapor');
            $table->string('alamat');
            $table->string('no_telp');
            $table->string('langtitude');
            $table->string('longtitude');
            $table->longText('pengaduan');
            $table->string('foto');
            $table->date('tanggal_pengaduan');
            $table->date('tanggal_proses_pengaduan')->nullable();
            $table->string('status_fakta')->nullable();
            $table->string('hasil_lapangan')->nullable();
            $table->string('status')->default('belum di proses');
            $table->string('nama_petugas_menangani')->nullable();
            $table->string('status_konfirmasi')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
    }
};
