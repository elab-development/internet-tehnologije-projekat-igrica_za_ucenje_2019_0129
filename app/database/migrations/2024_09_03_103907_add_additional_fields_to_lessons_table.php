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
        Schema::table('lessons', function (Blueprint $table) {
            $table->string('difficulty')->nullable()->after('user_id'); // Polje za težinu
            $table->string('description')->nullable()->after('difficulty'); // Polje za opis
            $table->string('video_url')->nullable()->after('description'); // Polje za video link
            $table->string('image_url')->nullable()->after('video_url'); // Polje za sliku
            $table->integer('estimated_time')->nullable()->after('image_url'); // Polje za procenu vremena
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn(['difficulty', 'description', 'video_url', 'image_url', 'estimated_time']);
        });
    }
};
