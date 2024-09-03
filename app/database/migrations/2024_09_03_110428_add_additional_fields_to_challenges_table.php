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
            $table->integer('max_attempts')->nullable()->after('hint'); // Dodavanje kolone 'max_attempts'
            $table->integer('time_limit')->nullable()->after('max_attempts'); // Dodavanje kolone 'time_limit'
            $table->string('type')->nullable()->after('time_limit'); // Dodavanje kolone 'type'
            $table->integer('points')->nullable()->after('type'); // Dodavanje kolone 'points'
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
            $table->dropColumn(['max_attempts', 'time_limit', 'type', 'points']);
        });
    }
};
