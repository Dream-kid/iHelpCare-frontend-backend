<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_type_id',
        'title_en',
        'title_ph',
        'description_en',
        'description_ph',
        'location_en',
        'location_ph',
        'event_time_from',
        'event_time_to',
        'event_date_from',
        'event_date_to',
        'status',
        'created_by'
    ];
    public function type()
    {
        return $this->hasOne(EventType::class,'id','event_type_id');
    }
    public function media()
    {
        return $this->hasMany(EventMedia::class)->where('status',1);
    }
}
