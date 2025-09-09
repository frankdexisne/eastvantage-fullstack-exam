<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $route = app('request')->route();
        $routeName = $route ? $route->getName() : null;

        if ($routeName === 'users.update') {
            $params = $route->parameters();
            $id = $params['id'] ?? null;

            return [
                'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($id)],
                'name' => 'required|string|max:255',
                'role_ids' => 'array',
                'role_ids.*' => 'exists:roles,id',
            ];
        } 

        return [
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string|max:255',
            'role_ids' => 'array',
            'role_ids.*' => 'exists:roles,id',
        ];
    }
}
