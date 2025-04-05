<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use App\packages\AuthManager\Actions\UserLogin;
use App\packages\AuthManager\Actions\UserRegistration;
use App\packages\AuthManager\Helpers\UserHelper;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class UserManageController extends Controller
{
    public function __construct()
    {
        // If needed.
    }

    /**
     * @return Application|Factory|View|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function loginView(): \Illuminate\Foundation\Application|View|Factory|Redirector|RedirectResponse|Application
    {
        $this->getLanguage();
        if (Auth::check())
            return redirect(route('home'));
        $modal = 'login';
        return view('landing-page.index', compact( 'modal'));
    }

    /**
     * @param LoginRequest $request
     * @param UserHelper $helpers
     * @param UserLogin $action
     * @return Application|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function userLogin(LoginRequest $request, UserHelper $helpers, UserLogin $action): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        $this->getLanguage();
        if (!$action->handle($request))
            return $helpers->invalidLogin();;

        return $helpers->loginSuccessful();
    }

    /**
     * @return Application|Factory|View|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function registrationView(): \Illuminate\Foundation\Application|View|Factory|Redirector|RedirectResponse|Application
    {
        $this->getLanguage();
        if (Auth::check()) {
            return redirect(route('home'));
        }
        $modal = 'registration';
        return view('landing-page.index', compact( 'modal'));
    }

    /**
     * @param RegistrationRequest $request
     * @param UserHelper $helpers
     * @param UserRegistration $action
     * @return Application|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function userRegistration(RegistrationRequest $request, UserHelper $helpers, UserRegistration $action): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        $this->getLanguage();
        if (!$helpers->matchPassword($request))
            return $helpers->registrationFailed();

        $user_model = $helpers->modelOf();
        if (!$action->handle($request, $user_model))
            return $helpers->registrationFailed();

        return $helpers->registrationSuccessful();
    }

    /**
     * @return Application|\Illuminate\Foundation\Application|RedirectResponse|Redirector
     */
    public function logout(): \Illuminate\Foundation\Application|Redirector|RedirectResponse|Application
    {
        Session::flush();
        Auth::logout();
        return redirect(route('home'));
    }
    private function getLanguage()
    {
        $value = Session::get('locale');
        if(isset($value)){
            $lang = $value;
        }else{
            $lang = 'en';
        }
        App::setLocale($lang);
        session()->put('locale', $lang);
    }

}
