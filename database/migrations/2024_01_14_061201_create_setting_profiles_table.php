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
        Schema::create('setting_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perusaaan');
            $table->string('alamat_perusahaan');
            $table->string('email_perusahaan');
            $table->string('telp_perusahaan');
            $table->string('logo_perusahaan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_profiles');
    }
};
