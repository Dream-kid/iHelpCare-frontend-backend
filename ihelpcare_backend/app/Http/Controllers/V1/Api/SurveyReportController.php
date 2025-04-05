<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Models\SurveyQuestionResponse;
use App\Models\SurveyResponse;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\Log;

class SurveyReportController extends Controller
{
    use ApiResponser;
    public function surveyReport($surveyId)
    {
        try {
            $perPage = request('per_page') ?? 10;
            $currentPage = request('current_page') ?? 1;
            $sort = explode(',',request('sort'));

            $search = request('search');
            $offset = ($currentPage - 1) * $perPage;
            $surveyResponse = SurveyResponse::with(['user' => function($q){
                $q->select('id','name','first_name','last_name');
            },'survey' => function($q){
                $q->select('id','title_ph','title_en','status');
            }])->where('survey_id',$surveyId)->skip($offset)->take($perPage)->orderby($sort[0],$sort[1])->get();
            $data = [];
            foreach ($surveyResponse as $key=>$item)
            {
                $val['id'] = $item->id;
                $val['user_id'] = $item->user_id;
                $val['first_name'] = $item->user->first_name;
                $val['last_name'] = $item->user->last_name;
                $val['survey_id'] = $item->survey_id;
                $val['survey_title_en'] = $item->survey->title_en;
                $val['survey_title_ph'] = $item->survey->title_ph;
                $val['survey_status'] = $item->survey->status;
                $val['created_at'] = $item->created_at;
                $val['updated_at'] = $item->updated_at;
                $data[] = $val;
            }
            $totalItems = SurveyResponse::where('survey_id',$surveyId)->count();

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
            return $this->successResponse($response,'Report found successfully!',200);
        } catch (\Exception $ex)
        {
            Log::error($ex->getFile() . ':' . $ex->getLine() . ' ' . $ex->getMessage());
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }

    }



    /**
     * Show the form for editing the specified resource.
     */
    public function surveyResponseDetails($survey_response_id)
    {
        if(!SurveyResponse::where('id',$survey_response_id)->exists())
        {
            return $this->errorResponse(null, 'Survey response not found', 404);
        }
        try {
            $user = SurveyResponse::find($survey_response_id)->pluck('user_id')->first();
            $user_info = User::with('info')->where('id',$user)->first();
            $response = SurveyQuestionResponse::with(['question','question.type','question.options','options'])->where('survey_response_id',$survey_response_id)->get();
            $data = [];
            foreach ($response as $key=>$item)
            {
                $question = [];
                $question['id'] = $item->question->id;
                $question['title_en'] = $item->question->title_en;
                $question['title_ph'] = $item->question->title_ph;
                $question['tag_en'] = $item->question->tag_en;
                $question['tag_ph'] = $item->question->tag_ph;
                $question['question_type_id'] = $item->question->question_type_id;
                $question['type'] = $item->question->type->value;
                $question['multi_select'] = ($item->question->multi_select == 1) ? true: false;
                $question['options'] = $item->question->options;
                $answer = $item->answer;
                if($item->question->multi_select == 1 || ($item->question->type->value != 'input' && $item->question->type->value != 'essay'))
                {
                    $answer = [];
                    foreach ($item->options as $val)
                    {
                        array_push($answer,$val->option_id);
                    }
                }
                $question['answer'] = $answer;
                $data[] = $question;
            }
            $Response['user_info'] = $user_info;
            $Response['response'] = $data;
            return $this->successResponse($Response,'Survey details found successfully',200);
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
}
