<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventMedia;
use App\Models\EventType;
use App\Traits\ApiResponser;
use App\Traits\UploadTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    use ApiResponser;
    use UploadTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;
            $sort = explode(',',request('sort'));

            $search = request('search');
            $offset = ($currentPage - 1) * $perPage;
            $data = Event::with(['type'=> function($q){
                return $q->select('id','event_type_en','type_value');
            },'media'])->when($search, function ($query, $search) {
                return $query->where('title_en', 'like', '%' . $search . '%')->orWhere('title_ph', 'like', '%' . $search . '%');
            })->skip($offset)->take($perPage)->orderby($sort[0],$sort[1])->get();

            $totalItems = Event::when($search, function ($query, $search) {
                return $query->where('title_en', 'like', '%' . $search . '%')->orWhere('title_ph', 'like', '%' . $search . '%');
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
            return $this->successResponse($response,'Event list retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
    public function eventList()
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;

            $offset = ($currentPage - 1) * $perPage;

            $data = Event::where('status','Active')->with(['type','media'])->skip($offset)->take($perPage)->orderby('created_at','desc')->get();

            $totalItems = Event::where('status', 'Active')->count();

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
        try {
            $type = EventType::where('status',1)->orderby('event_type_en','asc')->get();
            return $this->successResponse($type,'Event type list retrieved successfully',200);
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
        $validator = Validator::make($request->all(), [
            'event_type_id'  => 'required|int',
            'title_en'  => 'required|string|max:255',
            'title_ph'  => 'nullable|string|max:255',
            'description_en'  => 'nullable|string',
            'description_ph'  => 'nullable|string',
            'location_en'  => 'nullable|string|max:255',
            'location_ph'  => 'nullable|string|max:255',
            'event_time_from'  => 'nullable',
            'event_time_to'  => 'nullable',
            'event_date_from'  => 'nullable',
            'event_date_to'  => 'nullable',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $type = EventType::find($request->event_type_id);
            if($type == null)
            {
                return $this->errorResponse(null, 'Event type does not exists', 404);
            }
            if($request->media)
            {
                $validator = Validator::make($request->all(), [
                    'media'  => 'required|array',
                ]);
                if ($validator->fails()) {
                    return $this->errorResponse( null, $validator->errors()->all(),400);
                }
            }
            DB::beginTransaction();
            $user_id = auth()->user()->id;
            $data = [
                'event_type_id'=>$request->event_type_id,
                'title_en'=>$request->title_en,
                'title_ph'=>$request->title_ph,
                'description_en'=>$request->description_en,
                'description_ph'=>$request->description_ph,
                'location_en'=>$request->location_en,
                'location_ph'=>$request->location_ph,
                'event_time_from'=>Carbon::parse($request->event_time_from),
                'event_time_to'=>Carbon::parse($request->event_time_to),
                'event_date_from'=>Carbon::parse($request->event_date_from),
                'event_date_to'=>Carbon::parse($request->event_date_to),
                'created_by'=>$user_id
            ];
            $event = Event::create($data);
            if($request->media)
            {
                foreach ($request->media as $key=>$media)
                {
                    $eventMedia = $this->storeEventMediaFile($event->id,$media,$key);
                    if($eventMedia['code'] == 400)
                    {
                        $message = $eventMedia['message'];
                        foreach ($message as &$msg) {
                            $msg = $msg;
                        }
                        DB::rollBack();
                        return $this->errorResponse([],$message,400);
                    }
                }
            }
            DB::commit();
            return $this->successResponse([],'Event created successfully',200);
        } catch (\Exception $ex)
        {
            DB::rollBack();
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($event_id)
    {
        // try {
        //     $data = Event::with(['type','media'])->where('id',$event_id)->first();
        //     return $this->successResponse($data,'Event retrieved successfully',200);
        // } catch (\Exception $ex)
        // {
        //     Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
        //     return $this->errorResponse(null, 'Something went wrong!', 500);
        // }


        try {
            $filter = ['id'=>$event_id];
            $event = Event::with(['type','media'])->where($filter);
            if($event->exists())
            {
                $event = $event->first();
                $medias = [];
                foreach ($event->media as $item=>$media)
                {
                    if($event->type->status == 1)
                    {
                        $medias[$item]['id']=$media->id;
                        $medias[$item]['media_file']=$media->media_file;
                        $medias[$item]['media_file_type']=$media->media_file_type;
                        $medias[$item]['media_file_title_en']=$media->media_file_title_en;
                        $medias[$item]['media_file_title_ph']=$media->media_file_title_ph;
                        $medias[$item]['status']=$media->status;
                    }
                }
                $data['id'] = $event->id;
                $data['event_type_id'] = $event->event_type_id;
                $data['title_en'] = $event->title_en;
                $data['title_ph'] = $event->title_ph;
                $data['description_en'] = $event->description_en;
                $data['description_ph'] = $event->description_ph;
                $data['location_en'] = $event->location_en;
                $data['location_ph'] = $event->location_ph;
                $data['event_time_from'] = $event->event_time_from;
                $data['event_time_to'] = $event->event_time_to;
                $data['event_date_from'] = $event->event_date_from;
                $data['event_date_to'] = $event->event_date_to;
                $data['status'] = $event->status;
                $data['type']=$event->type->type_value;

                return $this->successResponse($data,'Data found successfully!',200);
            } else
            {
                return $this->errorResponse([],'Event Not Found',404);
            }
        } catch (\Exception $ex) {
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        try {
            return $this->successResponse($event,'Event retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validator = Validator::make($request->all(), [
            'event_type_id'  => 'required|int',
            'title_en'  => 'required|string|max:255',
            'title_ph'  => 'nullable|string|max:255',
            'description_en'  => 'nullable|string',
            'description_ph'  => 'nullable|string',
            'location_en'  => 'nullable|string|max:255',
            'location_ph'  => 'nullable|string|max:255',
            'event_time_from'  => 'nullable',
            'event_time_to'  => 'nullable',
            'event_date_from'  => 'nullable',
            'event_date_to'  => 'nullable',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $type = EventType::find($request->event_type_id);
            if($type == null)
            {
                return $this->errorResponse(null, 'Event type does not exists', 404);
            }
            $user_id = auth()->user()->id;
            $data = [
                'event_type_id'=>$request->event_type_id,
                'title_en'=>$request->title_en,
                'title_ph'=>$request->title_ph,
                'description_en'=>$request->description_en,
                'description_ph'=>$request->description_ph,
                'location_en'=>$request->location_en,
                'location_ph'=>$request->location_ph,
                'event_time_from'=>Carbon::parse($request->event_time_from),
                'event_time_to'=>Carbon::parse($request->event_time_to),
                'event_date_from'=>Carbon::parse($request->event_date_from),
                'event_date_to'=>Carbon::parse($request->event_date_to),
                'created_by'=>$user_id
            ];
            $event->update($data);
            return $this->successResponse([],'Event updated successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        try {
            $event->delete();
            return $this->successResponse([],'Event deleted successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
    private function storeEventMediaFile($event_id,$array, $key)
    {
        try {
            $validator = Validator::make($array, [
                'media_file'  => 'required|file|mimes:mp4,avi,mkv,mp3,wmv,jpeg,png,jpg,pdf,doc,docx,xls,xlsx',
                'media_file_title_en'  => 'nullable|string|max:255',
                'media_file_title_ph'  => 'nullable|string|max:255',
                'status'  => 'required',
            ]);
            if ($validator->fails()) {
                return [
                    'code'    => 400,
                    'message' => array_map(function ($msg) use ($key) {
                        return $key+1 . '. ' . $msg;
                    }, $validator->errors()->all()),
                    'data' => null,
                    'status' => 'error'
                ];
            }
            $file = $array['media_file'];
            $file_name = $this->uploadFile($file, '/media_file/'.$file->getClientOriginalExtension().'/');
            $data=[
                'event_id'=>$event_id,
                'media_file'=>'media_file/'.$file->getClientOriginalExtension().'/' .$file_name,
                'media_file_type'=>$file->getClientOriginalExtension(),
                'media_file_title_en'=>$array['media_file_title_en'] ?? null,
                'media_file_title_ph'=>$array['media_file_title_ph'] ?? null,
                'status'=>$array['status']
            ];

            $media = EventMedia::create($data);
            return [
                'code' =>200,
                'message'=>'working fine',
                'data'=>$media,
                'status' => 'success',
            ];
        }   catch (\Exception $ex)
        {
            return $this->errorResponse([],$ex->getMessage(),$ex->getCode());
        }
    }
    public function eventStatusUpdate(Request $request)
    {
        $event = Event::find($request->id);
        if($event == null)
        {
            return $this->errorResponse(null,'Event not found',404);
        }
        try {
            $event->update(['status'=>$request->status]);
            return $this->successResponse([],'Event status updated successfully!',200);
        } catch (\Exception $ex) {
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
}
