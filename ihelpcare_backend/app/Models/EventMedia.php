<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMedia extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'event_id',
        'media_file',
        'media_file_type',
        'media_file_title_en',
        'media_file_title_ph',
        'status'
    ];
}
