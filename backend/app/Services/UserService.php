<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Arr;

class UserService
{
    public function paginated($modelQuery, $pageSize) {
        return $modelQuery->paginate($pageSize);
    }

    public function create(array $data) {
        $userData = Arr::except($data, ['role_ids']);
        $user = User::create(array_merge($userData, ['password' => bcrypt('password')]));

        if (isset($data['role_ids'])) {
            $user->roles()->attach($data['role_ids']);  
        }
        return $user->load('roles');
    }

    public function find($id) {
        return User::with('roles')->find($id);
    }

    public function update($id, array $data) {
        $user = $this->find($id);

        $user->update(Arr::except($data, ['role_ids']));

        if (isset($data['role_ids'])) {
            $user->roles()->sync($data['role_ids']);  
        }

        return $user;
    }

    public function delete($id) {
        return User::destroy($id);
    }
}