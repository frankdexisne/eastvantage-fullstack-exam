<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;

class UserController extends BaseCrudController
{
    public function __construct(UserService $userService){
        $this->storeRequest = UserRequest::class;
        $this->updateRequest = UserRequest::class;
        $this->service = $userService;
        $this->modelQuery = new User();
    }
    
}
