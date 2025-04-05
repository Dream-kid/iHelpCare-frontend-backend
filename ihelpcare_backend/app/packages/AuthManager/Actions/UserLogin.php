<?php

namespace App\packages\AuthManager\Actions;

use Illuminate\Support\Facades\Auth;

class UserLogin
{
    /**
     * @param $request
     * @return bool
     */
    public function handle($request): bool
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return true;
        }

        return false;
    }

}
