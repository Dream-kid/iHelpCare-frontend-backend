<?php

use App\Http\Controllers\MediaFileController;
use App\Http\Controllers\V1\Api\SurveyProviderController;
use App\Http\Controllers\V1\Api\EventController;
use App\Http\Controllers\V1\Api\EventMediaController;
use App\Http\Controllers\V1\Api\EventTypeController;
use App\Http\Controllers\V1\Api\ProfileController;
use App\Http\Controllers\V1\Api\QuestionTypeController;
use App\Http\Controllers\V1\Api\SurveyController;
use App\Http\Controllers\V1\Api\SurveyResponseController;
use App\Http\Controllers\V1\Api\SurveyReportController;
use App\Http\Controllers\V1\Auth\AuthController;
use App\Http\Controllers\V1\Auth\PermissionController;
use App\Http\Controllers\V1\Auth\RoleController;
use App\Http\Controllers\V1\Api\StaticApiController;
use App\Http\Controllers\V1\Api\CareGiverController;
use App\Http\Controllers\V1\Api\PatientController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('v1')->group(function () {
    Route::post('signup',[AuthController::class,'signUp']);
    Route::post('signin',[AuthController::class,'signIn']);
    Route::get('media_file/{path}',[MediaFileController::class,'show'])->where('path', '.*');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    Route::get('helpline-info',[StaticApiController::class,'helpline']);
    Route::get('survey-list',[SurveyController::class,'surveyList']);
    Route::get('event-list',[EventController::class,'eventList']);
    Route::get('education/learning-modules/{id}',[StaticApiController::class,'learningModuleDetails']);
    Route::get('education/learning-modules',[StaticApiController::class,'learningModule']);
    Route::get('events/{event}', [EventController::class,'show']);
    //authenticated url
    Route::group(['middleware' => ['auth:sanctum']], function() {
        Route::post('signout', [AuthController::class, 'logout']);
        Route::post('change-password', [AuthController::class, 'changePassword']);
        Route::get('user-profile', [ProfileController::class, 'getUserProfile']);
        Route::post('user-update',[ProfileController::class,'updateProfile']);
        Route::post('user-profile-picture',[ProfileController::class,'profilePicture']);

        Route::group(['middleware' => ['role:SuperAdmin|Admin']], function () {
            Route::resource('roles', RoleController::class);
            Route::resource('permissions', PermissionController::class);

        });
        ###Care Giver###
        Route::post('admin/create/care-giver',[CareGiverController::class,'createCareGiver']);
        Route::put('admin/update/care-giver',[CareGiverController::class,'updateCareGiver']);
        Route::get('admin/care-giver/list',[CareGiverController::class,'getCareGiverList']);
        Route::get('admin/care-giver/details',[CareGiverController::class,'getCareGiverDetails']);

        ###Patient###
        Route::post('admin/create/patient',[PatientController::class,'createPatient']);
        Route::put('admin/update/patient',[PatientController::class,'updatePatient']);
        Route::get('admin/patient/list',[PatientController::class,'getPatientList']);
        Route::get('admin/patient/details',[PatientController::class,'getPatientDetails']);

        ###User Delete###
        Route::delete('admin/user/delete',[AuthController::class,'destroy']);

        Route::group(['middleware' => ['role_or_permission:SuperAdmin|Admin|user.management']], function () {
            // assign permission to role
            Route::post('roles/{role_id}/permission', [RoleController::class, 'givePermission']);
            Route::delete('roles/{role_id}/permissions/{permission_id}', [RoleController::class, 'revokePermission']);

            // assign permission to user
            Route::post('permissions/{permission_id}/user', [PermissionController::class, 'assignPermission']);
            Route::delete('permissions/{permission_id}/user/{user_id}/', [PermissionController::class, 'removePermission']);
        });

        // Question Type
//        Route::group(['middleware'=>['role_or_permission:SuperAdmin|Admin|question.type']], function (){
            Route::get('question-type',[QuestionTypeController::class,'index']);
            Route::get('question-type-list',[QuestionTypeController::class,'list']);
            Route::post('question-type',[QuestionTypeController::class,'store']);
            Route::get('question-type/{question_type_id}',[QuestionTypeController::class,'edit']);
            Route::post('question-type/update/{question_type_id}',[QuestionTypeController::class,'update']);
            Route::delete('question-type/delete/{question_type_id}',[QuestionTypeController::class,'destroy']);
//        });

        // Survey
//        Route::group(['middleware' =>['role_or_permission:SuperAdmin|Admin|survey.create|survey.edit']],function (){
            Route::get('survey',[SurveyController::class,'survey']);
            Route::post('survey',[SurveyController::class,'surveyStore']);
            Route::post('survey/{survey_id}',[SurveyController::class,'surveyUpdate']);
            Route::delete('survey/{survey_id}',[SurveyController::class,'surveyDelete']);
        //     ->middleware('can:survey.delete');
            Route::post('survey-status-update',[SurveyController::class,'surveyStatusUpdate']);
//        });
        // survey response
//        Route::group(['middleware'=>['role_or_permission:SuperAdmin|Admin|survey.view']], function (){
            Route::get('survey/{survey_id}',[SurveyController::class,'surveyView']);
            Route::get('survey-response/{survey_id}',[SurveyResponseController::class,'index']);
            Route::post('survey-response/{survey_id}',[SurveyResponseController::class,'store']);
            Route::get('view-survey-response/{survey_id}',[SurveyResponseController::class,'edit']);
//        });

        // survey report
//        Route::group(['middleware'=>['role_or_permission:SuperAdmin|Admin|survey.view']], function (){
            Route::get('survey-report/{survey_id}',[SurveyReportController::class,'surveyReport']);
            Route::get('survey-response-details/{survey_response_id}',[SurveyReportController::class,'surveyResponseDetails']);
//        });
        // event type
//        Route::group(['middleware'=>['role_or_permission:SuperAdmin|Admin|event.type']], function (){
            // evnet type
            Route::get('event-type', [EventTypeController::class,'index']);
            Route::post('event-type', [EventTypeController::class,'store']);
            Route::get('event-type/{event_type_id}', [EventTypeController::class,'show']);
            Route::get('event-type/{event_type_id}/edit', [EventTypeController::class,'edit']);
            Route::post('event-type/{event_type_id}', [EventTypeController::class,'update']);
            Route::delete('event-type/{event_type_id}', [EventTypeController::class,'destroy']);

            // Survey Provider
            Route::get('survey-provider', [SurveyProviderController::class,'index']);
            Route::post('survey-provider', [SurveyProviderController::class,'store']);
            Route::get('survey-provider/{id}', [SurveyProviderController::class,'show']);
            Route::post('survey-provider/{id}', [SurveyProviderController::class,'update']);
            Route::delete('survey-provider/{id}', [SurveyProviderController::class,'destroy']);
//        });

        // event
//        Route::group(['middleware'=>['role_or_permission:SuperAdmin|Admin|event']], function (){
            // evnet
            Route::get('events', [EventController::class,'index']);
            Route::post('events', [EventController::class,'store']);
            // Route::get('events/{event}', [EventController::class,'show']);
            Route::get('events/{event}/edit', [EventController::class,'edit']);
            Route::post('events/{event}', [EventController::class,'update']);
            Route::delete('events/{event}', [EventController::class,'destroy']);
            Route::post('events-status-update',[EventController::class,'eventStatusUpdate']);

            // event media file
            Route::group(['middleware'=>['role_or_permission:Admin']], function () {
                // Route::get('events/{event}/media-file', [EventMediaController::class,'index']);
                // Route::get('events/media-file/{event}/create', [EventMediaController::class,'create']);
                Route::post('events/media-files/{event}', [EventMediaController::class,'store']);
                // Route::get('events/media-file/{mediaFile}', [EventMediaController::class,'show']);
                // Route::get('events/media-file/{event}/{mediaFile}/edit', [EventMediaController::class,'edit']);
                Route::post('events/media-files/update/{mediaFile}', [EventMediaController::class,'update']);
                Route::delete('events/media-files/{mediaFile}', [EventMediaController::class,'destroy']);
            });

//        });

//        Route::get('events',[EventController::class,'eventList']);
//        ->middleware('role_or_permission:SuperAdmin|Admin|event.view');



    });

});
