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
        Schema::create('harga_tarif_per_meters', function (Blueprint $table) {
            $table->id();
            $table->string('golongan');
            $table->string('kelompok');
            $table->integer('tarif1');
            $table->integer('tarif2');
            $table->integer('tarif3');
            $table->integer('tarif4');
            $table->integer('adm')->default(2500);
            $table->integer('denda')->default(5000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harga_tarif_per_meters');
    }
};
