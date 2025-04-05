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
        Schema::create('survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('surveys','id')->cascadeOnDelete();
            $table->string('title_en',255);
            $table->string('tag_en',255)->nullable();
            $table->string('title_ph',255)->nullable();
            $table->string('tag_ph',255)->nullable();
            $table->foreignId('question_type_id')->constrained('question_types','id');
            $table->boolean('multi_select')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_questions');
    }
};
