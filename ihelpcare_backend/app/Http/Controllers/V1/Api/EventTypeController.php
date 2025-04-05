<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\EventType;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EventTypeController extends Controller
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

            $data = EventType::skip($offset)->take($perPage)->orderby('created_at','desc')->get();

            $totalItems = EventType::count();

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
            return $this->successResponse($response,'Event list retrieved successfully',200);
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
            'event_type_en'  => 'required|array',
            'event_type_en.*'  => 'required|string|max:255',
            'event_type_ph'  => 'required|array',
            'event_type_ph.*'  => 'required|string|max:255',
            'type_value'  => 'required|array',
            'type_value.*'  => 'required|string|max:255',
            'status'  => 'required|array',
            'status.*'  => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            if(count($request->event_type_en) != count($request->event_type_ph) || count($request->event_type_en)!=count($request->type_value) || count($request->event_type_en)!=count($request->status))
            {
                return $this->errorResponse([],'Type value or status count is not same as event type',400);
            }
            $data = [];
            foreach ($request->event_type_en as $key=>$value)
            {
                $data[]=[
                    'event_type_en'=>$value,
                    'event_type_ph'=>$request->event_type_ph[$key],
                    'type_value'=>$request->type_value[$key],
                    'status'=>$request->status[$key],
                    'created_at'=>date('Y-m-d H:i:s'),
                    'updated_at'=>date('Y-m-d H:i:s'),
                ];
            }
            EventType::insert($data);
            return $this->successResponse($data,'Event type created successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($eventType)
    {
        try {
            $data = EventType::find($eventType);
            return $this->successResponse($data,'Event type retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($eventType)
    {
        try {
            $data = EventType::find($eventType);
            return $this->successResponse($data,'Event type retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $event_type_id)
    {
        $validator = Validator::make($request->all(), [
            'event_type_en'  => 'required|string|max:255',
            'event_type_ph'  => 'nullable|string|max:255',
            'type_value'  => 'required|string|max:255',
            'status'  => 'required',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $eventType = EventType::find($event_type_id);
            if($eventType != null)
            {
                $eventType->update(['event_type_en'=>$request->event_type_en,
                    'event_type_ph'=>$request->event_type_ph,
                    'type_value'=>$request->type_value,
                    'status'=>$request->status]);
                return $this->successResponse([],'Event type updated successfully',200);
            } else {
                return $this->errorResponse([],'Event type not found',404);
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
    public function destroy($event_type_id)
    {
        try {
            $data = EventType::where('id',$event_type_id)->first();
            if($data != null)
            {
                $data->delete();
                return $this->successResponse([],'Event type deleted successfully',200);
            } else {
                return $this->errorResponse([],'Event type not found',404);
            }

        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
}
