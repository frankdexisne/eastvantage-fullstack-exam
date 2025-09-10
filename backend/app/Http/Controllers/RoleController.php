<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Services\RoleService;
use App\Http\Requests\RoleRequest;

class RoleController extends BaseCrudController
{

    public function __construct(RoleService $roleService){
        $this->storeRequest = RoleRequest::class;
        $this->updateRequest = RoleRequest::class;
        $this->service = $roleService;
        $this->modelQuery = Role::with(['users']);
    }

}
