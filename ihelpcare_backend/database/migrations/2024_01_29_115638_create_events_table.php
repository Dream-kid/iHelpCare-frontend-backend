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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_type_id')->constrained('event_types','id')->cascadeOnDelete();
            $table->string('title_en',255);
            $table->string('title_ph',255)->nullable();
            $table->longText('description_en')->nullable();
            $table->longText('description_ph')->nullable();
            $table->string('location_en',255)->nullable();
            $table->string('location_ph',255)->nullable();
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->boolean('status')->default(true);
            $table->foreignId('created_by')->constrained('users','id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
