<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionOption extends Model
{
    use HasFactory;
    protected $fillable = [
        'survey_question_id',
        'option_title_en',
        'option_title_ph',
        'option_value'
    ];
    public $timestamps = false;
}
