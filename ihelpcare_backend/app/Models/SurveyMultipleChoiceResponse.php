<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyMultipleChoiceResponse extends Model
{
    use HasFactory;
    protected $fillable = [
        'sq_response_id',
        'option_id'
    ];
    public $timestamps = false;
    public function option()
    {
        return $this->hasOne(SurveyQuestionOption::class,'id','option_id');
    }
}
