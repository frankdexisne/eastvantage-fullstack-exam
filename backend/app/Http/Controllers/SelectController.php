<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class SelectController extends Controller
{
    public function roles() {
        $options = Role::select(['id As value', 'name As label'])->get();
        return response($options, 200);
    }
}
