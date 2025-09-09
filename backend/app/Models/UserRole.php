<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;

     protected $guards = ['id'];

    protected $dates = ['created_at', 'updated_at'];

}
