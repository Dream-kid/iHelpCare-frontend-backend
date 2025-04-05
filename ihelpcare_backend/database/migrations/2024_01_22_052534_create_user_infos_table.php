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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users','id')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->enum('gender',[
                'Male',
                'Female',
                'Others'
            ])->default('Male');
            $table->string('phone', 20)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('blood_group',[
                'O+',
                'O-',
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-',
            ])->nullable();
            $table->string('street', 256)->nullable();
            $table->string('city',256)->nullable();
            $table->string('state',256)->nullable();
            $table->string('postal_code',256)->nullable();
            $table->string('country',256)->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
