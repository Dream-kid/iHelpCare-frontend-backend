<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\QuestionType;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class QuestionTypeController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;

            $offset = ($currentPage - 1) * $perPage;

            $data = QuestionType::orderby('type','asc')->skip($offset)->take($perPage)->orderby('created_at','desc')->get();

            $totalItems = QuestionType::count();

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
            return $this->successResponse($response,'Question types retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }

    }
    public function list()
    {
        try {
            $data = QuestionType::where('status',1)->orderby('type','asc')->select('id','type','value')->get();
            return $this->successResponse($data,'Question types retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'type'=>'required|array|max:255',
            'type.*'=>'required|string|max:255',
            'value'=>'required|array|max:255',
            'value.*'=>'required|string|max:255',
            'status'=>'required|array',
            'status.*'=>'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        if(count($request->type) != count($request->value) || count($request->type) != count($request->status)){
            return $this->errorResponse( null, 'value or status length is not same as type length',400);
        }
        try {
            foreach ($request->type as $key=>$value)
            {
                $data[]=[
                    'type'=>$value,
                    'value'=>$request->value[$key],
                    'status'=>$request->status[$key],
                    'created_at'=>date('Y-m-d H:i:s'),
                    'updated_at'=>date('Y-m-d H:i:s')
                ];
            }
            QuestionType::insert($data);
            return $this->successResponse($data,'Question type created successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $type = QuestionType::find($id);
            if($type!= null)
            {
                return $this->successResponse($type,'Question type found successfully',200);
            }
            return $this->successResponse([],'Question type not found',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $type = QuestionType::find($id);
        if($type == null)
        {
            return $this->errorResponse([],'Question type not found', 404);
        }
        $validator = Validator::make($request->all(),[
            'type'=>'required|max:255',
            'value'=>'required|max:255',
            'status'=>'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $type->type=$request->type;
            $type->value=$request->value;
            $type->status=$request->status;
            $type->save();
            return $this->successResponse($type,'Question type updated successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $type = QuestionType::find($id);
            if($type == null)
            {
                return $this->errorResponse([],'Question type not found', 404);
            }
            $type->delete();
            return $this->successResponse([],'Question type deleted successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
}
