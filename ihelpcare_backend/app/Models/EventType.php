<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_type_en',
        'event_type_ph',
        'type_value',
        'status',
        'updated_at',
        'created_at'
    ];
}
