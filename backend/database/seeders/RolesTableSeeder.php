<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [['id'=> 1, 'name'=> 'Author'],
                  ['id'=> 2, 'name'=> 'Editor'],
                  ['id'=> 3, 'name'=> 'Subscriber'],
                  ['id'=> 4, 'name'=> 'Administrator']
        ];
        foreach ($roles as $role) {
            Role::updateOrCreate(['id' => $role['id']], $role);
        }
    }
}
