<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'gender',
        'phone',
        'date_of_birth',
        'blood_group',
        'street',
        'city',
        'state',
        'postal_code',
        'country',
        'image'
    ];
    protected $hidden = [
        'updated_at',
        'created_at'
    ];
}
