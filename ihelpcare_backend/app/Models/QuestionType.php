<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionType extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'value',
        'status'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
