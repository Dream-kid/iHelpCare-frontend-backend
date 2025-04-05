<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Super Admin',
            'first_name'=>'Super',
            'last_name'=>'Admin',
            'email'=>'admin@admin.com',
            'role_id'=> 1,
            'password'=> bcrypt('admin123'),
        ])->assignRole('SuperAdmin');
        $userInfo = $user->info()->create();
    }
}
