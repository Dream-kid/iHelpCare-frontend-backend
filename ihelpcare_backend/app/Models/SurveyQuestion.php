<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;
    protected $fillable = [
        'survey_id',
        'title_en',
        'tag_en',
        'title_ph',
        'tag_ph',
        'question_type_id',
        'multi_select'
    ];
    public $timestamps = false;

    public function options()
    {
        return $this->hasMany(SurveyQuestionOption::class);
    }
    public function type()
    {
        return $this->hasOne(QuestionType::class,'id','question_type_id');
    }
}
