<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionResponse extends Model
{
    use HasFactory;
    protected $fillable = [
        'survey_question_id',
        'survey_response_id',
        'answer'
    ];
    public $timestamps = false;
    public function question()
    {
        return $this->hasOne(SurveyQuestion::class,'id','survey_question_id');
    }
    public function options()
    {
        return $this->hasMany(SurveyMultipleChoiceResponse::class,'sq_response_id','id');
    }
}
