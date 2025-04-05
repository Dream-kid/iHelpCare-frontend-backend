<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\EventMedia;
use App\Models\Event;
use App\Traits\ApiResponser;
use App\Traits\UploadTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class EventMediaController extends Controller
{
    use ApiResponser;
    use UploadTrait;
    /**
     * Display a listing of the resource.
     */
    public function index($event_id)
    {
        try {
            $event = Event::find($event_id);
            if($event == null)
            {
                return $this->errorResponse([], 'Event does not exist', 404);
            }
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;

            $offset = ($currentPage - 1) * $perPage;

            $data = EventMedia::where('event_id',$event_id)->skip($offset)->take($perPage)->get();
            if ($data->isEmpty()){
                return $this->errorResponse([], 'There is no event media', 404);
            }

            $totalItems = EventMedia::where('event_id',$event_id)->count();

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
            return $this->successResponse($response,'Event media files retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($event_id)
    {
        try {
            $event = Event::find($event_id);
            if($event == null)
            {
                return $this->errorResponse([], 'Event does not exist', 404);
            }
            return $this->successResponse($event,'Event exists',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$event_id)
    {
        $event = Event::find($event_id);
        if($event == null)
        {
            return $this->errorResponse([], 'Event does not exist', 404);
        }
        $validator = Validator::make($request->all(), [
            'media_file'  => 'required|file|mimes:mp4,avi,mkv,mp3,wmv,jpeg,png,jpg,pdf,doc,docx,xls,xlsx',
            'media_file_title_en'  => 'nullable',
            'media_file_title_ph'  => 'nullable',
            'status'  => 'nullable',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $data = [];
            $file = $request->media_file;
            if ($file) {
                $file_name = $this->uploadFile($file, '/media_file/'.$file->getClientOriginalExtension().'/');
                $data[]=[
                    'event_id'=>$event_id,
                    'media_file'=>'media_file/'.$file->getClientOriginalExtension().'/' .$file_name,
                    'media_file_type'=>$file->getClientOriginalExtension(),
                    'media_file_title_en'=>$request->media_file_title_en ?? null,
                    'media_file_title_ph'=>$request->media_file_title_ph ?? null,
                    'status'=>$request->status ?? 1
                ];
                EventMedia::insert($data);
                return $this->successResponse([],'Event media file stored successfully',200);
            }
            
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($event_id,$eventMedia)
    {
        try {
            $event = Event::find($event_id);
            if($event == null)
            {
                return $this->errorResponse([], 'Event does not exist', 404);
            }
            $media = EventMedia::where(['event_id'=>$event_id,'id'=>$eventMedia])->first();
            if($media == null)
            {
                return $this->errorResponse(null, 'Media file not found!', 404);
            }
            
            return $this->successResponse($media,'Media file retrieved successfuly',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($event_id,$eventMedia)
    {
        try {
            $event = Event::find($event_id);
            if($event == null)
            {
                return $this->errorResponse([], 'Event does not exist', 404);
            }
            $media = EventMedia::where(['event_id'=>$event_id,'id'=>$eventMedia])->first();
            if($media == null)
            {
                return $this->errorResponse(null, 'Media file not found!', 404);
            }
            return $this->successResponse($media,'Media file retrieved successfuly',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $media_file_id)
    {
        $media = EventMedia::find($media_file_id);
        if($media == null)
        {
            return $this->errorResponse([], 'Event media does not exist', 404);
        }
        $validator = Validator::make($request->all(), [
            'media_file'  => 'required|file|mimes:mp4,avi,mkv,mp3,wmv,jpeg,png,jpg,pdf,doc,docx,xls,xlsx',
            'media_file_title_en'  => 'nullable|string|max:255',
            'media_file_title_ph'  => 'nullable|string|max:255',
            'status'  => 'nullable',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $file = $request->media_file;
            if ($file) {
                $this->deleteFileIfExists('/media_file/' . $media->media_file);
                $file_name = $this->uploadFile($file, '/media_file/'.$file->getClientOriginalExtension().'/');
                $data=[
                    'media_file'=>'media_file/'.$file->getClientOriginalExtension().'/' .$file_name,
                    'media_file_type'=>$file->getClientOriginalExtension(),
                    'media_file_title_en'=>$request->media_file_title_en ?? null,
                    'media_file_title_ph'=>$request->media_file_title_ph ?? null,
                    'status'=>$request->status ?? 1
                ];
                $media->update($data);
            }
            return $this->successResponse([],'Event media file updated successfully!',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($eventMedia)
    {
        try {
            $media = EventMedia::where(['id'=>$eventMedia])->first();
            if($media == null)
            {
                return $this->errorResponse(null, 'Event media file does not exists!', 404);
            }
            $this->deleteFileIfExists($media->media_file);
            $media->delete();
            return $this->successResponse([],'Event media file deleted successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
}
