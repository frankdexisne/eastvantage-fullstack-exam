<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {   
        $prefix = 'roles';
        $route = app('request')->route();
        $routeName = $route ? $route->getName() : null;

        if ($routeName === $prefix.'.update') {
            $params = $route->parameters();
            $id = $params['id'] ?? null;

            return [
                'name' => ['required', 'string', 'max:255', Rule::unique('roles', 'name')->ignore($id)],
            ];
        } 

        return [
            'name' => 'required|string|max:255|unique:roles,name',
        ];
    }
}
