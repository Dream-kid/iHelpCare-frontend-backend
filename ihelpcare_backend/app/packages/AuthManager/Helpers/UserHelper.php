<?php

namespace App\packages\AuthManager\Helpers;

use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;

class UserHelper
{
    protected User $table;
    private const SUCCESS = "success";
    private const ERROR = "error";
    private const REGISTRATION_FAILED = "Registration failed, try again!";
    private const REGISTRATION_SUCCESSFUL = "Registration successful. Please login.";
    private const INVALID_LOGIN = "The shared credentials are not valid.";

    public function __construct(User $user)
    {
        $this->table = $user;
    }

    /**
     * @return User
     */
    public function modelOf(): User
    {
        return $this->table;
    }

    /**
     * @param $request
     * @return bool
     */
    public function matchPassword($request): bool
    {
        if ($request->password != $request->password_confirmation)
            return false;
        return true;
    }

    /**
     * @return Application|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function registrationFailed(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect(route('registration'))->with(self::ERROR, self::REGISTRATION_FAILED);
    }

    /**
     * @return Application|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function registrationSuccessful(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect(route('login'))->with(self::SUCCESS, self::REGISTRATION_SUCCESSFUL);
    }

    /**
     * @return Application|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function invalidLogin(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        return redirect(route('login'))->with(self::ERROR, self::INVALID_LOGIN);
    }

    /**
     * @return RedirectResponse
     */
    public function loginSuccessful(): RedirectResponse
    {
        return redirect()->intended(route('dashboard'));
    }


}
