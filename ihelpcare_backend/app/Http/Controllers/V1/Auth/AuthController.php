<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\ForgotPasswordNotification;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;


// for API
class AuthController extends Controller
{
    use ApiResponser;
    public function signUp(Request $request){
        $validator = Validator::make($request->all(), [
            "first_name" => "required",
            "last_name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:6",
            "confirm_password" => "required|min:6|same:password",
            "role_id" => "required"
        ]);
        if ($validator->fails()) {
            return $this->errorResponse([],$validator->errors()->all(),400);
        }

        try {
            if (in_array($request->role_id, [3,4])) {
                $user = User::create([
                    "first_name" => $request->first_name,
                    "last_name" => $request->last_name,
                    "email" => $request->email,
                    "password" => Hash::make($request->password),
                    "role_id" => $request->role_id,
                    "name" => $request->first_name.' '.$request->last_name
                ]);
                $user->assignRole(intval($request->role_id));
                $user->info()->create();
                return $this->successResponse([],'User Created Successfully',200);
            } else {
                return $this->errorResponse([],'Given role is not permitted', 403);
            }
        } catch (\Exception $ex)
        {
            return $this->errorResponse([],'Something went wrong', 500);
        }

    }

    public function signIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $error  = $validator->errors()->first();
            return $this->errorResponse(null, $error, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            if (Auth::attempt(['email' => $request->get('email'), 'password' => $request->get('password')])) {
                $user =  User::with(['role','permissions'])->where('status',1)->where('id',Auth::user()->id)->select('id','name as full_name','first_name','last_name','role_id','status','email','created_at','updated_at')->first();
                if(empty($user)){
                    Auth::logoutCurrentDevice();
                    return $this->errorResponse(null, 'Your account is inactive.', Response::HTTP_UNPROCESSABLE_ENTITY);
                }
                $token = $user->createToken('iHelpToken',['*'],now()->addDay())->plainTextToken;

                /*end tracking user logins*/
                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'User sign in successfully',
                    'data' => $user,
                    'token' => $token

                ], 200);

            } else {
                return $this->errorResponse(null,'These credentials do not match with our records.', 400);
            }
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse([],'Something went wrong', 500);
        }

    }

    // Login API (POST, formdata)
    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens()->delete();
            $data = [];
            return $this->successResponse($data, 'User sign out successfully');
        } catch (\Exception $ex)
        {
            return $this->errorResponse([],'Something went wrong', 500);
        }

    }
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'  => 'required|email|exists:users,email',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        $user = User::where('email', $request->email)->first();
        if ($validator->fails()) {
            return $this->errorResponse( [], $validator->errors()->all(),400);
        } else {
            try {
                $reset = DB::table('password_reset_tokens')->whereEmail($request->email)->first();
                if(null == $reset)
                {
                    DB::table('password_reset_tokens')->insert([
                        'email' => $request->email,
                        'token' => Str::random(6),
                        'created_at' => Carbon::now()
                    ]);
                }
                else
                {
                    DB::table('password_reset_tokens')->whereEmail($request->email)->update([
                        'token' => Str::random(6),
                        'created_at' => Carbon::now()
                    ]);
                }

                $tokenData = DB::table('password_reset_tokens')
                    ->where('email', $request->email)->first();
                $details = [
                    'from' => 'noreply@ihelp.com',
                    'subject' => 'Forgot password notification',
                    'token' => $tokenData->token,
                    'validity'=>'OTP will expire after 10 minutes.',
                    'greetings'=> 'Hi '.$user->name."\r\n".'There was a request to change your password!'."\n\n".'If you did not make this request then please ignore this email. Otherwise, please copy this OTP to change your password.'."\r\n\n"
                ];
                if ($tokenData) {
                    $user->notify(new ForgotPasswordNotification($details));
                    return $this->successResponse('', 'Mail sent successfully', 200);
                } else {
                    return $this->errorResponse( [],'Mail not sent successfully', Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            } catch (\Exception $ex) {
                return $this->errorResponse([],'Something went wrong', 500);
            }
        }
    }
    public function resetPassword(Request $request){
        if($request->password)
        {
            $password = bcrypt($request->password);
        }
        try {
            $validator = Validator::make($request->all(), [
                'otp' => 'required|exists:password_reset_tokens,token',
                'password' => 'required|string|min:6|confirmed',
                'password_confirmation' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->errorResponse([],$validator->errors()->first(), 400);
            }
            $token = DB::table('password_reset_tokens')->where('token',$request->otp)->whereBetween('created_at', [now()->subMinutes(10), now()])->first();
            if($token == null){
                return $this->errorResponse([],'The OTP is expired', 400);
            }
            else{
                $user = User::where('email', $token->email)->first();
                $reset = DB::table('password_reset_tokens')->whereEmail($token->email)->whereToken($request->otp)->first();
                if ($reset && $user) {
                    User::where('email', $user->email)->update(['password' => $password]);
                    return $this->successResponse([], 'Password updated successfully', 200);
                }
                else{
                    return $this->errorResponse([],'User Not Found',404);
                }
            }
        } catch (\Exception $ex) {
            return $this->errorResponse([],'Something went wrong', 500);
        }
    }

    public function changePassword(Request $request){
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
            'new_password_confirmation' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse([],$validator->errors()->first(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try{
            $user = Auth::user();
            $data =[];
            if (Hash::check($request->old_password, $user->password)) {
                $user->password = bcrypt($request->new_password);
                $user->save();
                return $this->successResponse([], 'Password updated successfully', 200);
            }
            else{
                return $this->errorResponse([],'The old password didn\'t match', 404);
            }
        } catch (\Exception $ex) {
            return $this->errorResponse([],'Something went wrong', 500);
        }


    }

    public function destroy(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'user_id' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->errorResponse([],$validator->errors()->first(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = User::find($request->user_id);
            if(empty($user)){
                return $this->errorResponse([], 'User not found', 404);
            }
            $user->delete();
            return $this->successResponse([], 'User deleted successfully', 200);
        }catch (\Exception $ex) {
            return $this->errorResponse([],'Something went wrong to delete user', 500);
        }
         
    }
}
