<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    protected $fillable = [
        'title_en',
        'description_en',
        'title_ph',
        'description_ph',
        'start_date',
        'end_date',
        'participator_role',
        'status',
        'created_by',
        'survey_link',
        'provider_type'
    ];
    public function question(){
        return $this->hasMany(SurveyQuestion::class);
    }
}
