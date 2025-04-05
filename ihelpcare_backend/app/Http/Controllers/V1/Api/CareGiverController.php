<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Notifications\CareGiverRegNotification;
use App\Http\Requests\CareGiver\CareGiverRequest;
use App\Models\User;
use App\Models\UserInfo;
use App\Traits\ApiResponser;
use App\Traits\UploadTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CareGiverController extends Controller
{
    use ApiResponser;
    use UploadTrait;

    /**
     * Getting list of all care givers
     * @param per_page
     * @param current_page
     * @param sort
     * @param search
     */

     public function getCareGiverList()
     {
        try{
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;
            $sort = explode(',',request('sort'));
            $search = request('search');
            $offset = ($currentPage - 1) * $perPage;
            $data = User::where('role_id', 3)->with(['info'])->when($search, function ($query, $search) {
                return $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })->orderBy($sort[0], $sort[1])->offset($offset)->limit($perPage)->get();
            if(count($data) == 0){
                return $this->errorResponse(null, 'No care givers found', 404);
            }

            $totalItems = User::where('role_id', 3)->when($search, function ($query, $search) {
                return $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })->orderby($sort[0],$sort[1])->count();

            $pagination = [
                'current_page' => $currentPage,
                'per_page' => $perPage,
                'total_items' => $totalItems,
                'total_pages' => ceil($totalItems / $perPage),
            ];
            $response = [
                'data'=>$data,
                'pagination'=>$pagination
            ];
            return $this->successResponse($response, 'Care givers retrieved successfully', 200);
        }catch (\Exception $ex){
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
     }

     /**
     * Getting detail of all care givers
     * @param id
     */
     public function getCareGiverDetails()
     {
        try{
            $id = request('id');
            $data = User::where('id', $id)
                    ->where('role_id', 3)
                    ->with(['info'])->first();
            if(!$data){
                return $this->errorResponse(null, 'No care givers found', 404);
            }
            return $this->successResponse($data, 'Care givers retrieved successfully', 200);
        }catch (\Exception $ex){
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
     }  

    /**
     * Getting detail of all care givers
     * @param CareGiverRequest
     */
     public function createCareGiver(CareGiverRequest $request)
     {
        try{
            DB::beginTransaction();
            $user = new User();
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->name = $request->first_name.' '.$request->last_name;
            $user->email = $request->email;
            $password = rand(111111, 999999);
            $user->email_verified_at = Carbon::now();
            $user->password = bcrypt($password);
            $user->role_id = 3;
            $saveUser = $user->save();
            if($saveUser){
               $userInfo = new UserInfo();
                $userInfo->user_id = $user->id;
                $userInfo->gender = $request->gender;
                $userInfo->date_of_birth = $request->date_of_birth;
                $userInfo->blood_group = $request->blood_group;
                $userInfo->phone = $request->phone;
                $userInfo->street = $request->street;
                $userInfo->city = $request->city;
                $userInfo->state = $request->state;
                $userInfo->postal_code = $request->postal_code;
                $userInfo->country = $request->country;
                $saveInfo = $userInfo->save();
            }
            DB::commit();
            if ($user AND $saveInfo) {
                $details = [
                    'from' => 'noreply@ihelp.com',
                    'subject' => 'Account Registration - IHelp',
                    'email' => 'Login Email: ' . $user->email,
                    'password' => 'Login Password: ' . $password,
                    'greetings'=> 'Hi '.$user->name."\r\n".' Your account has been registered as a care giver by admin!'."\n\n".'Please use the email and password for login.'."\r\n\n"
                ];
                $user->notify(new CareGiverRegNotification($details));
            } else {
                return $this->errorResponse( [],'Mail not sent successfully', Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            return $this->successResponse(null, 'Care givers created successfully', 200);
        }catch (\Exception $ex){
            DB::rollBack();
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
     }

     /**
     * Getting detail of all care givers
     * @param id
     * @param CareGiverRequest
     */
     public function updateCareGiver(CareGiverRequest $request)
     {
        try{
            $id = request('care_giver_id');
            $user = User::where('id', $id)
                    ->where('role_id', 3)
                    ->with(['info'])->first();
            if(!$user){
                return $this->errorResponse(null, 'No care givers found', 404);
            }
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->name = $request->first_name.' '.$request->last_name;
            $user->status = $request->status;
            $saveUser = $user->save();
            if($saveUser){
               $userInfo = UserInfo::where('user_id', $user->id)->first();
                $userInfo->user_id = $user->id;
                $userInfo->gender = $request->gender;
                $userInfo->date_of_birth = $request->date_of_birth;
                $userInfo->blood_group = $request->blood_group;
                $userInfo->phone = $request->phone;
                $userInfo->street = $request->street;
                $userInfo->city = $request->city;
                $userInfo->state = $request->state;
                $userInfo->postal_code = $request->postal_code;
                $userInfo->country = $request->country;
                $saveInfo = $userInfo->save();
            }
            if ($user AND $saveInfo) {
                return $this->successResponse(null, 'Care givers updated successfully', 200);
            } else {
                return $this->errorResponse( [],'Care givers not updated successfully', Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }catch (\Exception $ex){
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
     }
}
