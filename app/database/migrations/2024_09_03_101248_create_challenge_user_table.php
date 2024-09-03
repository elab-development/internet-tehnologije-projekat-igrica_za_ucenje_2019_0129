<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('challenge_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID korisnika, sa spoljnim ključem
            $table->foreignId('challenge_id')->constrained()->onDelete('cascade'); // ID izazova, sa spoljnim ključem
            $table->timestamp('attempted_at')->nullable(); // Datum i vreme pokušaja
            $table->string('status')->default('pending'); // Status pokušaja (npr. 'completed' ili 'pending')
            $table->timestamps(); // Kreiranje 'created_at' i 'updated_at' kolona
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('challenge_user');
    }
};
