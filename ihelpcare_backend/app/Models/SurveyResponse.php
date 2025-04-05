<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'survey_id'
    ];
    public function response()
    {
        return $this->hasMany(SurveyQuestionResponse::class);
    }
    public function user()
    {
        return $this->hasOne(User::class, 'id','user_id');
    }
    public function survey()
    {
        return $this->hasOne(Survey::class, 'id','survey_id');
    }
}
