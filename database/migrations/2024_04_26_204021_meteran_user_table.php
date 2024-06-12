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
        Schema::create('meteran_pelanggan_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('meteran_pelanggan_id');
            $table->unsignedBiginteger('user_id');


            $table->foreign('meteran_pelanggan_id')->references('id')
                ->on('meteran_pelanggans')->onDelete('cascade');
            $table->foreign('user_id')->references('id')
                ->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meteran_user');
    }
};
