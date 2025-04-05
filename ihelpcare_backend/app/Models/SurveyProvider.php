<?php

namespace App\Models;

use App\Models\Survey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SurveyProvider extends Model
{
    use HasFactory;
    protected $fillable = [
        'var',
        'title',
        'btn_text_en',
        'btn_text_ph',
        'status',
        'updated_at',
        'created_at'
    ];
    public function survey()
    {
        return $this->hasMany(Survey::class);
    }
}
