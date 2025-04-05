<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\SurveyMultipleChoiceResponse;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyQuestionResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyResponse;
use App\Traits\ApiResponser;


class SurveyResponseController extends Controller
{
    use ApiResponser;
    public function index($survey_id)
    {
        try {
            if(!Survey::where('id',$survey_id)->exists())
            {
                return $this->errorResponse([],'Survey not found',404);
            }
            $user_id = auth()->user()->id;
            $response = SurveyResponse::where(['user_id'=>$user_id,'survey_id'=>$survey_id]);
            if($response->exists())
            {
                $data = $response->first();
                return $this->successResponse($data,'You have already responded this survey',200);
            }
            $data = Survey::with(['question','question.type','question.options'])->where('id',$survey_id)->first();
            return $this->successResponse($data,'Survey retrieved successfully',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$survey_id)
    {
        $survey = Survey::where('id',$survey_id)->first();
        if($survey == null)
        {
            return $this->errorResponse([],'Survey not found',404);
        }
        $user_id = auth()->user()->id;
        $response = SurveyResponse::where(['user_id'=>$user_id,'survey_id'=>$survey_id]);
        if($response->exists())
        {
            $data = $response->first();
            return $this->successResponse($data,'You have already responded this survey',200);
        }
        try {

            DB::beginTransaction();
            $user_response = SurveyResponse::create(['user_id'=>$user_id,'survey_id'=>$survey_id]);
            if ($survey->survey_link == null) {
                $dataArray = json_decode($request->getContent(), true);

                if ($dataArray === null && json_last_error() !== JSON_ERROR_NONE) {
                    // Handle JSON decoding error
                    DB::rollBack();
                    return response()->json(['error' => 'Invalid JSON payload'], 400);
                }
    
                foreach ($dataArray as $key=>$payload) {
                    $data = $this->storeResponse($user_response->id, $payload, $key);
                    if ($data['code'] == 400) {
                        $message = $data['message'];
                        foreach ($message as &$msg) {
                            $msg = $msg;
                        }
                        DB::rollBack();
                        return $this->errorResponse([],$message,400);
                    }
                }
            }
            DB::commit();
            return $this->successResponse([],'Responded successfully',200);
        } catch (\Exception $ex)
        {
            DB::rollBack();
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($survey_id)
    {
        try {
            if(!Survey::where('id',$survey_id)->exists())
            {
                return $this->errorResponse([],'Survey not found',404);
            }
            $user_id = auth()->user()->id;
            $response = SurveyResponse::with(['response','response.question','response.question.type','response.options.option'])->where(['user_id'=>$user_id,'survey_id'=>$survey_id]);
            if($response->exists())
            {
                $data = $response->first();
                return $this->successResponse($data,'Survey response retrieved successfully',200);
            }
            return $this->errorResponse([],'Survey response not found',404);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            return $this->successResponse([],'',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            return $this->successResponse([],'',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }

    protected function storeResponse($survey_response_id,$array,$key)
    {
        try {
            $validator = Validator::make($array, [
                'question_id'         => 'required',
                'answer'         => 'required_with:question_id',
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
            $question_id = $array['question_id'];
            $answer = $array['answer'];
            if(!SurveyQuestion::where('id',$question_id)->exists())
            {
                return [
                    'status' => 'error',
                    'code'    => 400,
                    'message' => array_map(function ($msg) use ($key) {
                        return ($key+1) . '.' . $msg;
                    }, ['Question not exists']),
                    'data' => null
                ];
            }
            $SurveyQuestion = SurveyQuestion::with('type')->where('id',$question_id)->first();
            $options = null;
            if($SurveyQuestion->multi_select || ($SurveyQuestion->type->value != 'input' && $SurveyQuestion->type->value != 'essay'))
            {
                $options = explode(', ',$answer);
            }
            $data = [
                'survey_response_id'=>$survey_response_id,
                'survey_question_id'=>$question_id,
                'answer'=> $answer,
            ];
            $survey_question_response = SurveyQuestionResponse::create($data);
            if(isset($options))
            {
                foreach ($options as $item => $option)
                {
                    if(!SurveyQuestionOption::where(['id'=>$option,'survey_question_id'=>$question_id])->exists())
                    {
                        return [
                            'status' => 'error',
                            'code'    => 400,
                            'message' => array_map(function ($msg) use ($key,$item) {
                                return 'Question '.($key+1) . ': '.($item+1).'. ' . $msg;
                            }, ['Answered option does not exists']),
                            'data' => null
                        ];
                    } else
                    {
                        SurveyMultipleChoiceResponse::create(['sq_response_id'=>$survey_question_response->id,'option_id'=>$option]);
                    }
                }
            }
            return [
                'status' => 'success',
                'code' =>200,
                'message'=>'working fine',
                'data'=>[]
            ];

        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse([],$ex->getMessage(),$ex->getCode());
        }
    }
}
