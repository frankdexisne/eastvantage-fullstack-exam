<?php

namespace App\Services;

use App\Models\Role;

class RoleService
{
    public function paginated($modelQuery, $pageSize) {
        return $modelQuery->paginate($pageSize);
    }

    public function create(array $data) {
        return Role::create($data);
    }

    public function find($id) {
        return Role::find($id);
    }

    public function update($id, array $data) {
        $user = $this->find($id);

        $user->update($data);

        return $user;
    }

    public function delete($id) {
        return Role::destroy($id);
    }
}