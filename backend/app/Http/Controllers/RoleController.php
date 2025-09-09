<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request) {
        $pageSize = $request->pageSize ?? 10;
        return Role::whereHas('users')->with(['users'])->paginate($pageSize);   
    }
}
