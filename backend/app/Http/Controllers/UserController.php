<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;

class UserController extends Controller
{
    public function store(UserRequest $request)
    {
        $data = $request->validated();
        $user = User::create(array_merge($data, ['password' => bcrypt('password')]));
        if (isset($data['role_ids'])) {
            $user->roles()->attach($data['role_ids']);  
        }

        return response($user->load('roles'), 201);
    }

    private function get($id) {
        return User::with('roles')->find($id);
    }

    public function show($id)
    {
       
        $user = $this->get($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response($user, 200);
    }

    public function update(UserRequest $request, $id)
    {

        $user = $this->get($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $data = $request->validated();


        $user->update($request->only(['name', 'email']));
        if (isset($data['role_ids'])) {
            $user->roles()->sync($data['role_ids']);  
        }
        return response(null, 204);
    }
    public function destroy($id)
    {

        $user = $this->get($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response(null, 204);
    }
}
