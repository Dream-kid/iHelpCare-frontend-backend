<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\Auth\UserManageController;
use App\Http\Controllers\V1\Dashboard\DashboardController;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $modal = '';
    $value = Session::get('locale');
    if(isset($value)){
        $lang = $value;
    }else{
        $lang = 'en';
    }
    App::setLocale($lang);
    session()->put('locale', $lang);
    return view('landing-page.index', compact( 'modal'));
//    return view('landing-page.index');
})->name('home');


Route::get('/login', [UserManageController::class, 'loginView'])->name('login');
Route::post('/login', [UserManageController::class, 'userLogin'])->name('user.login');
Route::get('/registration', [UserManageController::class, 'registrationView'])->name('registration');
Route::post('/registration', [UserManageController::class, 'userRegistration'])->name('user.registration');
Route::get('/logout', [UserManageController::class, 'logout'])->name('logout');
Route::get('survey', [DashboardController::class, 'servey'])->name('servey');
Route::get('change-language', [DashboardController::class, 'switchLanguage'])->name('changeLanguage');
Route::get('contact-us',[DashboardController::class, 'contactUs'])->name('contactUs');
Route::get('about-us',[DashboardController::class, 'aboutUs'])->name('aboutUs');


Route::group(['middleware' => 'auth'], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [DashboardController::class, 'myProfile'])->name('myprofile');
    Route::get('/emergency-support', [DashboardController::class, 'emergencySupport'])->name('emergency.support');
    Route::get('/helpline-info', [DashboardController::class, 'emergencyInfo'])->name('emergency.info');
    Route::get('/community-learning', [DashboardController::class, 'learning'])->name('community.learning');
    Route::get('/community-events-activities', [DashboardController::class, 'communityEventActivities'])->name('community.event.activities');
    Route::get('/community-service-directory', [DashboardController::class, 'communityServiceDirectory'])->name('community.service.directory');
    Route::get('/community-support-communities', [DashboardController::class, 'communitySupportCommunities'])->name('community.support.communities');
    Route::get('/community-blog', [DashboardController::class, 'communityBlog'])->name('community.blog');
    Route::get('/community-learning-details', [DashboardController::class, 'communityLearningDetails'])->name('community.learning.details');
});
