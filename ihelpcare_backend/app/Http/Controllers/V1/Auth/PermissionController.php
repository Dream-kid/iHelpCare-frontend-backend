<?php

namespace App\Http\Controllers\V1\Auth;

use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Http\Controllers\Controller;
use App\Models\User;

class PermissionController extends Controller
{
    use ApiResponser;
    public function index()
    {

        try {
            $permissions = Permission::all();
            return $this->successResponse($permissions,'Permissions found successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }

    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'  => 'required|unique:permissions',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),422);
        }

        try {
            Permission::create([
                'name' => $request->name,
                'guard_name' => 'web'
            ]);
            return $this->successResponse([],'Permissions created successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function show($permission)
    {
        try {
            $permissions = Permission::find($permission);
            return $this->successResponse($permissions,'Permissions found successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function update(Request $request, Permission $permission)
    {
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                Rule::unique('permissions')->ignore($permission->id)
            ],
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),422);
        }

        try {
            $permission->update([
                'name' => $request->name
            ]);
            return $this->successResponse([],'Permissions updated successfully',200);
        }  catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();
            return $this->successResponse([],'Permission deleted successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function assignPermission($permission_id, Request $request)
    {
        $request->validate(['user_id' => 'required']);

        try {
            $user_id = $request->user_id;
            $user = User::find($user_id);
            $permission = Permission::where(['id'=>$permission_id,'guard_name'=>'web'])->first();
            if($permission == null )
            {
                return $this->errorResponse([],'Permission does not exists',400);
            } elseif ($user == null)
            {
                return $this->errorResponse([],'User does not exists',400);
            }
            if ($user->hasPermissionTo($permission->name))
            {
                return $this->successResponse([], 'Permission already exists.',200);
            } else {
                app()[PermissionRegistrar::class]->forgetCachedPermissions();
                $user->givePermissionTo($permission->name);
                return $this->successResponse([],'Permission assigned.');
            }
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function removePermission($permission_id, $user_id)
    {
        try {
            $user = User::find($user_id);
            $permission = Permission::where(['id'=>$permission_id,'guard_name'=>'web'])->first();
            if($permission == null )
            {
                return $this->errorResponse([],'Permission does not exists',400);
            } elseif ($user == null)
            {
                return $this->errorResponse([],'User does not exists',400);
            }
            if ($user->hasPermissionTo($permission->name))
            {
                app()[PermissionRegistrar::class]->forgetCachedPermissions();
                $user->revokePermissionTo($permission->name);
                return $this->successResponse([],'Permission removed.',200);
            } else {
                return $this->successResponse([],'Permission not exists.',200);
            }
        }  catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

}

