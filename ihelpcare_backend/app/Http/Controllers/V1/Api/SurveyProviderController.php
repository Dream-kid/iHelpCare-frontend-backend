<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\SurveyProvider;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class SurveyProviderController extends Controller
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

            $data = SurveyProvider::skip($offset)->take($perPage)->orderby('created_at','desc')->get();

            $totalItems = SurveyProvider::count();

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
            return $this->successResponse($response,'Survey Provider list retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'var'  => 'required|string|max:255',
            'title'  => 'required|string|max:255',
            'btn_text_en'  => 'required|string|max:255',
            'btn_text_ph'  => 'required|string|max:255',
            'status'  => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $data = [
                'var'=>$request->var,
                'title'=>$request->title,
                'btn_text_en'=>$request->btn_text_en,
                'btn_text_ph'=>$request->btn_text_ph,
                'status'=>$request->status,
                'created_at'=>date('Y-m-d H:i:s'),
                'updated_at'=>date('Y-m-d H:i:s'),
            ];
            SurveyProvider::insert($data);
            return $this->successResponse($data,'Survey Provider created successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $data = SurveyProvider::find($id);
            if ($data == null) {
                return $this->errorResponse(null, 'Provider does not exist', 404);
            }
            return $this->successResponse($data,'Survey Provider retrieved successfully',200);
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
        $validator = Validator::make($request->all(), [
            'var'  => 'required|string|max:255',
            'title'  => 'required|string|max:255',
            'btn_text_en'  => 'required|string|max:255',
            'btn_text_ph'  => 'required|string|max:255',
            'status'  => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $provider = SurveyProvider::find($id);
            if($provider != null)
            {
                $provider->update([
                    'var'=>$request->var,
                    'title'=>$request->title,
                    'btn_text_en'=>$request->btn_text_en,
                    'btn_text_ph'=>$request->btn_text_ph,
                    'status'=>$request->status]);
                return $this->successResponse([],'Provider updated successfully',200);
            } else {
                return $this->errorResponse([],'Provider not found',404);
            }

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
            $data = SurveyProvider::where('id',$id)->first();
            if($data != null)
            {
                $data->delete();
                return $this->successResponse([],'Survey Provider deleted successfully',200);
            } else {
                return $this->errorResponse([],'Survey Provider not found',404);
            }

        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
}
