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
        Schema::table('challenges', function (Blueprint $table) {
            // Dodavanje ograničenja
            $table->string('question')->change()->nullable(false); // Ograničenje da question ne može biti null
            $table->string('answer')->change()->nullable(false);   // Ograničenje da answer ne može biti null
            $table->string('difficulty')->change()->nullable(false); // Ograničenje da difficulty ne može biti null
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('challenges', function (Blueprint $table) {
            $table->string('question')->change()->nullable(); // Vraćanje na staro stanje
            $table->string('answer')->change()->nullable();   // Vraćanje na staro stanje
            $table->string('difficulty')->change()->nullable(); // Vraćanje na staro stanje
        });
    }
};
