<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\QuestionType;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyResponse;
use App\Traits\ApiResponser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;


class SurveyController extends Controller
{
    use ApiResponser;
    /*
     *
     *  below functions are for survey CRUD
     *
     */

    public function survey()
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;
            $sort = explode(',',request('sort'));

            $search = request('search');
            $offset = ($currentPage - 1) * $perPage;

            $data = Survey::when($search, function ($query, $search) {
                return $query->where('title_en', 'like', '%' . $search . '%')->orWhere('title_ph', 'like', '%' . $search . '%');
            })->skip($offset)->take($perPage)->orderby($sort[0],$sort[1])->get();

            $totalItems = Survey::when($search, function ($query, $search) {
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
            return $this->successResponse($response,'Data found successfully!',200);
        } catch (\Exception $ex) {
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
    public function surveyList(Request $request)
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;

            $offset = ($currentPage - 1) * $perPage;

            $data = Survey::where('status','Active')->skip($offset)->take($perPage)->orderby('created_at','desc')->get();
            $tokenWithBearer = $request->header('Authorization');
            $hashedTooken = substr($tokenWithBearer, 7);

            $token = PersonalAccessToken::findToken($hashedTooken);
            if($token)
            {
                $user = $token->tokenable;
                $surveyResponse = SurveyResponse::where('user_id',$user->id)->select('survey_id','created_at','id')->get();
                $surveyIds = $surveyResponse->pluck('survey_id')->toArray();
                foreach ($data as $key => $item) {
                    $flag = in_array($item->id, $surveyIds);
                    $item->hasResponse = $flag;
                    $item->responsedDate = $surveyResponse->contains('survey_id', $item->id)
                        ? $surveyResponse->where('survey_id', $item->id)->first()->created_at
                        : null;
                    $item->surveyResoponseId = $surveyResponse->contains('survey_id', $item->id)
                        ? $surveyResponse->where('survey_id', $item->id)->first()->id
                        : null;
                }
            } else
            {
                foreach ($data as $key => $item) {
                    $item->hasResponse = false;
                    $item->responsedDate = null;
                    $item->surveyResoponseId = null;
                }
            }
            $totalItems = Survey::where('status','Active')->count();

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
            return $this->successResponse($response,'Data found successfully!',200);
        } catch (\Exception $ex) {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
    public function surveyStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title_en'  => 'required|max:255',
            'description_en'  => 'nullable|string',
            'title_ph'  => 'nullable|max:255',
            'description_ph'  => 'nullable|string',
            'start_date'  => 'nullable',
            'end_date'  => 'nullable',
            'survey_link'  => 'nullable|url',
            'provider_type'  => 'nullable|integer',
            'participator_role' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $user = auth()->user()->id;
            DB::beginTransaction();

            $data = [
                'title_en'=>$request->title_en,
                'title_ph'=>$request->title_ph,
                'description_en'=>$request->description_en,
                'description_ph'=>$request->description_ph,
                'start_date'=>Carbon::parse($request->start_date),
                'end_date'=>Carbon::parse($request->end_date),
                'created_by'=>$user,
                'survey_link'=>$request->survey_link,
                'provider_type'=>$request->provider_type,
                'participator_role'=>$request->participator_role,
            ];
            $survey = Survey::create($data);
            if($request->question)
            {
                foreach ($request->question as $key => $question)
                {
                    $questionData = $this->storeQuestionArray($survey->id,$question,$key);
                    if($questionData['code'] == 400)
                    {
                        $message = $questionData['message'];
                        foreach ($message as &$msg) {
                            $msg = $msg;
                        }
                        DB::rollBack();
                        return $this->errorResponse([],$message,400);
                    }
                    if(isset($question['option']))
                    {
                        foreach ($question['option'] as $item=>$option)
                        {
                            $optionData = $this->storeOptionArray($questionData['data']['id'],$option,$item);
                            if($optionData['code'] == 400)
                            {
                                $message = $optionData['message'];
                                foreach ($message as &$msg) {
                                    $msg = $msg;
                                }
                                DB::rollBack();
                                return $this->errorResponse([],$message,400);
                            }
                        }
                    }

                }
            }

            DB::commit();
            return $this->successResponse($data,'Survey created successfully!',200);
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
    public function surveyView($survey_id)
    {
        try {
//            $user = auth()->user();
//
//            if($user->hasAnyRole(['Admin','SuperAdmin']) || $user->hasAnyPermission(['survey.create', 'survey.edit']))
//            {
//                $filter = ['id'=>$survey_id];
//            } else {
//                $filter = ['id'=>$survey_id,'status'=>'Active'];
//            }
            $filter = ['id'=>$survey_id];
            $survey = Survey::with(['question','question.options','question.type'])->where($filter);
            if($survey->exists())
            {
                $survey = $survey->first();
                $questions = [];
                foreach ($survey->question as $item=>$question)
                {
                    if($question->type->status == 1)
                    {
                        $options = [];
                        $questions[$item]['id']=$question->id;
                        $questions[$item]['title_en']=$question->title_en;
                        $questions[$item]['title_ph']=$question->title_ph;
                        $questions[$item]['tag_en']=$question->tag_en;
                        $questions[$item]['tag_ph']=$question->tag_ph;
                        $questions[$item]['multi_select']=$question->multi_select == 1? true : false;
                        $questions[$item]['type']=$question->type->value;
                        $questions[$item]['question_type_id']=$question->question_type_id;
                        foreach ($question->options as $key=>$option)
                        {
                            $options[$key]['id'] = $option->id;
                            $options[$key]['option_title_en'] = $option->option_title_en;
                            $options[$key]['option_title_ph'] = $option->option_title_ph;
                            $options[$key]['option_value'] = $option->option_value;
                        }
                        $questions[$item]['options']=$options;
                    }
                }
                $data['id'] = $survey->id;
                $data['title_en'] = $survey->title_en;
                $data['title_ph'] = $survey->title_ph;
                $data['description_en'] = $survey->description_en;
                $data['description_ph'] = $survey->description_ph;
                $data['start_date'] = $survey->start_date;
                $data['end_date'] = $survey->end_date;
                $data['questions'] = $questions;
                $data['status'] = $survey->status;
                $data['survey_link'] = $survey->survey_link;
                $data['provider_type'] = $survey->provider_type;
                $data['participator_role'] = $survey->participator_role;

                return $this->successResponse($data,'Data found successfully!',200);
            } else
            {
                return $this->errorResponse([],'Survey Not Found',404);
            }
        } catch (\Exception $ex) {
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
    public function surveyUpdate($survey_id, Request $request)
    {
        $survey = Survey::find($survey_id);
        if($survey == null)
        {
            return $this->errorResponse([],'Invalid survey!',400);
        }
        $validator = Validator::make($request->all(), [
            'title_en'  => 'required|max:255',
            'description_en'  => 'nullable|string',
            'title_ph'  => 'nullable|max:255',
            'description_ph'  => 'nullable|string',
            'start_date'  => 'nullable',
            'end_date'  => 'nullable',
            'survey_link'  => 'nullable|url',
            'provider_type'  => 'nullable|integer',
            'participator_role' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse( null, $validator->errors()->all(),400);
        }
        try {
            $user = auth()->user()->id;
            $data = [
                'title_en'=>$request->title_en,
                'title_ph'=>$request->title_ph,
                'description_en'=>$request->description_en,
                'description_ph'=>$request->description_ph,
                'start_date'=>Carbon::parse($request->start_date),
                'end_date'=>Carbon::parse($request->end_date),
                'created_by'=>$user,
                'survey_link'=>$request->survey_link,
                'provider_type'=>$request->provider_type,
                'participator_role'=>$request->participator_role,
            ];
            DB::beginTransaction();
            $survey->update($data);
            $QuestionIds = SurveyQuestion::where('survey_id',$survey->id)->pluck('id')->toArray();
            if($request->question)
            {
                foreach ($request->question as $key => $question)
                {
                    $questionData = $this->storeQuestionArray($survey_id,$question,$key);
                    if(isset($question['id']))
                    {
                        $index = array_search($question['id'], $QuestionIds);
                        if ($index !== false) {
                            // Remove the element with the specified value
                            unset($QuestionIds[$index]);
                        }
                        $optionIds = SurveyQuestionOption::where('survey_question_id',$question['id'])->pluck('id')->toArray();
                    }
                    if($questionData['code'] == 400)
                    {
                        $message = $questionData['message'];
                        foreach ($message as &$msg) {
                            $msg = $msg;
                        }
                        DB::rollBack();
                        return $this->errorResponse([],$message,400);
                    }
                    if(isset($question['option']))
                    {
                        foreach ($question['option'] as $item=>$option)
                        {
                            $optionData = $this->storeOptionArray($questionData['data']['id'],$option,$item);
                            if(isset($option['id']))
                            {
                                $index = array_search($option['id'], $optionIds);
                                if ($index !== false) {
                                    // Remove the element with the specified value
                                    unset($optionIds[$index]);
                                }
                            }
                            if($optionData['code'] == 400)
                            {
                                $message = $optionData['message'];
                                foreach ($message as &$msg) {
                                    $msg = $msg;
                                }
                                DB::rollBack();
                                return $this->errorResponse([],$message,400);
                            }
                        }
                        SurveyQuestionOption::whereIn('id',$optionIds)->delete();
                    }
                }
            }
            SurveyQuestion::whereIn('id',$QuestionIds)->delete();
            DB::commit();
            return $this->successResponse([],'Survey updated successfully!',200);
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
    public function surveyStatusUpdate(Request $request)
    {
        $survey = Survey::find($request->id);
        if($survey == null)
        {
            return $this->errorResponse(null,'Survey not found',404);
        }
        try {
            $survey->update(['status'=>$request->status]);
            return $this->successResponse([],'Survey status updated successfully!',200);
        } catch (\Exception $ex) {
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
    public function surveyDelete($survey_id)
    {
        try {
            if(Survey::where('id',$survey_id)->exists())
            {
                Survey::where('id',$survey_id)->delete();
                return $this->successResponse([],'Data deleted successfully!',200);
            } else
            {
                return $this->successResponse([],'No data found!',200);
            }

        } catch (\Exception $ex) {
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }

    /*
     *
     * below functions are for survey question CRUD
     *
     */

    public function question($survey_id)
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;

            $offset = ($currentPage - 1) * $perPage;

            $data = SurveyQuestion::with(['options'])->where('survey_id',$survey_id)->skip($offset)->take($perPage)->get();

            $totalItems = SurveyQuestion::where('survey_id',$survey_id)->count();

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
            return $this->successResponse($response,'Question retrieved successfully',200);
        } catch (\Exception $ex) {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }

    /*
     *
     * below functions are for survey question option CRUD
     *
     */

    public function option($question_id)
    {
        try {
            $data = SurveyQuestionOption::where('survey_question_id',$question_id);
            if($data->exists())
            {
                return $this->successResponse($data->get(), 'Options found successfully!', 200);
            } else
            {
                return $this->successResponse([], 'No Data Found', 200);
            }
        } catch (\Exception $ex) {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null,'Something went wrong!',500);
        }
    }
      /*
      *
      * below functions are for support
      *
      */
    protected function storeQuestionArray($survey_id,$array, $key)
    {
        try {
            $validator = Validator::make($array, [
                'id'               => 'nullable|int',
                'title_en'         => 'required|max:255',
                'title_ph'         => 'nullable|max:255',
                'tag_en'           => 'nullable|string',
                'tag_ph'           => 'nullable|string',
                'question_type_id' => 'required|int',
                'multi_select'     => 'nullable',
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
            $type = QuestionType::find($array['question_type_id']);
            if($type == null)
            {
                return [
                    'code' =>400,
                    'message'=>['Question '.($key+1).'. Question type is not exist'],
                    'data'=>null,
                    'status' => 'error',
                ];
            }
            $data = [
                'survey_id'        => $survey_id,
                'title_en'         => $array['title_en'] ?? null,
                'title_ph'         => $array['title_ph'] ?? '',
                'tag_en'           => $array['tag_en'] ?? '',
                'tag_ph'           => $array['tag_ph'] ?? '',
                'question_type_id' => $array['question_type_id'] ?? null,
                'multi_select'     => $array['multi_select'] ?? true,
            ];

            if(isset($array['id']))
            {
                $question = SurveyQuestion::where('id',$array['id'])->first();
                $question->update($data);
            } else
            {
                $question = SurveyQuestion::create($data);
            }
            return [
                'code' =>200,
                'message'=>'working fine',
                'data'=>$question,
                'status' => 'success',
            ];
        }   catch (\Exception $ex)
        {
            return $this->errorResponse([],$ex->getMessage(),$ex->getCode());
        }

    }

    protected function storeOptionArray($question_id, $array, $key)
    {
        try {
            $validator = Validator::make($array, [
                'id'               =>'nullable|int',
                'option_title_en'  => 'required|max:255',
                'option_title_ph'  => 'nullable|max:255',
                'option_value'     => 'nullable|max:255',
            ]);
            if ($validator->fails()) {
                return [
                    'status' => 'error',
                    'code'    => 400,
                    'message' => array_map(function ($msg) use ($key) {
                        return ($key+1) . '.' . $msg;
                    }, $validator->errors()->all()),
                    'data' => null
                ];
            }
            $data = [
                'survey_question_id'=>$question_id,
                'option_title_en'=>$array['option_title_en'] ?? null,
                'option_title_ph'=>$array['option_title_ph'] ?? null,
                'option_value'=>$array['option_value'] ?? null
            ];
            if(isset($array['id']))
            {
                $option = SurveyQuestionOption::where('id',$array['id'])->first();
                $option->update($data);
            } else
            {
                $option = SurveyQuestionOption::create($data);
            }
            return [
                'status' => 'success',
                'code' =>200,
                'message'=>'working fine',
                'data'=>$option
            ];

        } catch (\Exception $ex)
        {
            return $this->errorResponse(null,'Something went wrong!',500);
        }

    }
}
