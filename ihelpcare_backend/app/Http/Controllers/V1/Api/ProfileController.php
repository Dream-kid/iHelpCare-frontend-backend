<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Traits\UploadTrait;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    use ApiResponser;
    use UploadTrait;

    public function getUserProfile()
    {
        try {
            $userId = auth()->user()->id;
            $data = User::with('info','permissions')->find($userId);
            return $this->successResponse($data, 'User profile details retrieved successfully', 200);
        } catch (\Exception $ex) {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function profilePicture(Request $request) {
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|mimes:jpeg,png,jpg'
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $userInfo = auth()->user()->info;
            $file = $request->image;
            $dir = '/media_file/profile_picture/';
            if($file)
            {
                $this->deleteFileIfExists($userInfo->image);
                $file_name = $this->uploadFile($file, $dir);
            }
            $userInfo->image = $dir.$file_name;
            $userInfo->save();

            return $this->successResponse([], 'User profile picture uploaded successfully', 200);
        } catch (\Exception $ex) {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name'=>'nullable|string|max:255',
            'last_name'=>'nullable|string|max:255',
            'gender'  => 'required|string|max:20',
            'phone'  => 'required|string|max:20',
            'birthday'  => 'nullable|date',
            'blood_group'  => 'required|string|max:20',
            'street'  => 'nullable',
            'city'  => 'nullable',
            'state'  => 'nullable',
            'postal_code'  => 'nullable',
            'country'  => 'nullable|string|max:256',
            'image'  => 'nullable|file|mimes:jpeg,png,jpg',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $user = auth()->user();
            $user->update(['first_name'=>$request->first_name,'last_name'=>$request->last_name,'name'=>$request->first_name.' '.$request->last_name]);
            $file = $request->image;
            $file_name = null;
            $dir = '/media_file/profile_picture/';
            if($file)
            {
                $this->deleteFileIfExists($dir . $user->info->image);
                $file_name = $this->uploadFile($file, $dir);
            }
            $data =
            [
                'gender' => $request->gender,
                'phone' => $request->phone,
                'date_of_birth'=>$request->date_of_birth,
                'blood_group'=>$request->blood_group,
                'street'=>$request->street,
                'city'=>$request->city,
                'state'=>$request->state,
                'postal_code'=>$request->postal_code,
                'country'=>$request->country,
                'image'=>$file_name != null ?$dir.$file_name:null
            ];
            $user->info()->update($data);
            return $this->successResponse([], 'User profile updated successfully', 200);
        } catch (\Exception $ex) {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

}
