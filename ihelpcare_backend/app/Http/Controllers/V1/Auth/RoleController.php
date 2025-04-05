<?php

namespace App\Http\Controllers\V1\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\QueryException;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponser;
class RoleController extends Controller
{
    use ApiResponser;
    public function index()
    {

        try {
            $roles = Role::where('name','<>','SuperAdmin')->get();
            return $this->successResponse($roles,'Roles found successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:roles']);

        try {
            Role::create([
                'name' => $request->name,
                'guard_name' =>$request->guard_name
            ]);
            return $this->successResponse([],'Role created successfully',201);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function show($role)
    {
        try {
            $data = Role::find($role);
            return $this->successResponse($data,'Role found successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function update(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                Rule::unique('roles')->ignore($role->id)
            ],
        ]);

        if($validator->fails()) {
            return $this->errorResponse([],$validator->errors()->all(),422);
        }
        try {
            $role->update([
                'name' => $request->name,
                'guard_name' =>$request->guard_name
            ]);
            return $this->successResponse([],'Role updated successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function destroy(Role $role)
    {
        try {
            $role->delete();
            return $this->successResponse([],'Role deleted successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function givePermission($role, Request $request)
    {
        $request->validate(['permission_id' => 'required']);

        try {
            $role = Role::find($role);
            app()[PermissionRegistrar::class]->forgetCachedPermissions();
            $permission = $request->permission_id;
            if ($role->hasPermissionTo(intval($permission)))
            {
                return $this->successResponse(null,'Permission already exists',200);
            } else {
                $role->givePermissionTo(intval($permission));
                return $this->successResponse(null,'Permission given.',200);
            }
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    public function revokePermission($role, $permission)
    {
        try {
            $role = Role::find($role);
            $permission = Permission::find($permission);
            if($role == null || $permission == null)
            {
                return $this->errorResponse(null,'Role or Permission not exists',404);
            } else
            {
                if ($role->hasPermissionTo($permission))
                {
                    $role->revokePermissionTo($permission);
                    return $this->successResponse([],'Permission revoked.',200);
                } else {
                    return $this->successResponse([],'Permission not exists.',200);
                }
            }

        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
}
