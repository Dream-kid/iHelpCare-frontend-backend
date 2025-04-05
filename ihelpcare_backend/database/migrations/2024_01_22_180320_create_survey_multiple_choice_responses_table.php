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
        Schema::create('survey_multiple_choice_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sq_response_id')->constrained('survey_question_responses','id')->cascadeOnDelete();
            $table->foreignId('option_id')->constrained('survey_question_options','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_multiple_choice_responses');
    }
};
