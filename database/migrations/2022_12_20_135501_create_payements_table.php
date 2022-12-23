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
        Schema::create('payements', function (Blueprint $table) {
            $table->id();
            $table->string('user');
            $table->integer('Dnumero')->require();
            $table->foreignId('filiere_id')->nullable();
            $table->foreignId('classe_id')->nullable();
            $table->foreignId('evenement_id')->require();
            $table->string('ecole')->nullable();
            $table->boolean('is_valide')->default(false)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payements');
    }
};
