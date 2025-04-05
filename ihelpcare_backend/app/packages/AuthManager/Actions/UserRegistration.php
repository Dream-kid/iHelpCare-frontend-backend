<?php

namespace App\packages\AuthManager\Actions;

use Illuminate\Support\Facades\Hash;

class UserRegistration
{

    /**
     * @param $request
     * @param $model
     * @return bool
     */
    public function handle($request, $model): bool
    {
        $data['first_name'] = $request->first_name;
        $data['last_name'] = $request->last_name;
        $data['email'] = $request->email;
        $data['password'] = Hash::make($request->password);
        $data['role_id'] = 2; 

        $user = $model::create($data);
        if (!$user) {
            return false;
        }

        return true;
    }

}
