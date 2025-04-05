<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    use ApiResponser;

    public function helpline()
    {
        try {
            $additional = [
                "faq_url" => "https://ihelp.com/faq",
                "user_guide_url"=> "https://ihelp.com/user-guide"
            ];
            $data = [
                "helpline_number"=> "123-456-7890",
                "email"=> "support@ihelp.com",
                "physical_address"=> "1100 South Marietta Pkwy SE, Marietta, GA 30060",
                "operating_hours"=> "24/7",
                "languages_supported"=> ["English", "Filipino", "Tagalog"],
                "emergency_categories"=> ["Medical Emergencies", "Crisis Support", "General Inquiries"],
                "additional_resources"=> $additional
            ];
            return $this->successResponse($data, 'Helpline information retrieved successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function questionnaire()
    {
        try {
            {
                $questions = [
                    [
                        "type"=> "binary",
                        "title"=> "Are you a caregiver for someone with Alzheimer's or dementia?",
                        "tag"=> "is-caregiver",
                        "option"=> ["Yes", "No"]
                    ],
                    [
                        "type"=> "mcq",
                        "multiSelect"=> false,
                        "title"=> "How long have you been a caregiver for someone with Alzheimer's or dementia?",
                        "tag"=> "caregiver-duration",
                        "option"=> ["Less than 6 months", "6-12 months", "1-2 years", "More than 2 years"]
                    ],
                    [
                        "type"=> "binary",
                        "title"=> "Have you used the iHELP platform before?",
                        "tag"=> "used-ihelp",
                        "option"=> ["Yes", "No"]
                    ],
                    [
                        "type"=> "mcq",
                        "multiSelect"=> false,
                        "title"=> "How would you rate the ease of use of the iHELP website?",
                        "tag"=> "ease-of-use",
                        "option"=> ["Very Easy", "Easy", "Moderate", "Difficult", "Very Difficult"]
                    ],
                    [
                        "type"=> "mcq",
                        "multiSelect"=> false,
                        "title"=> "Which section of the iHELP website did you find most useful?",
                        "tag"=> "most-useful-section",
                        "option"=> ["Education modules", "Videos", "Resources", "Blog posts", "Support group information", "Workshop and seminar announcements"]
                    ],
                    [
                        "type"=> "input",
                        "title"=> "Please describe any challenges you faced while using the iHELP website/app.",
                        "tag"=> "challenges-faced"
                    ],
                    [
                        "type"=> "mcq",
                        "multiSelect"=> true,
                        "title"=> "Which features would you like to see improved or added to the iHELP website?",
                        "tag"=> "desired-improvements",
                        "option"=> ["User interface design", "More educational content", "Interactive elements", "Community forums", "Support group matching", "Mobile app availability", "Other"]
                    ],
                    [
                        "type"=> "scale",
                        "title"=> "On a scale of 1-5, how likely are you to recommend the iHELP website to other caregivers?",
                        "tag"=> "likelihood-to-recommend",
                        "scale"=> [1, 2, 3, 4, 5],
                        "scale_labels"=> ["Very Unlikely", "Unlikely", "Neutral", "Likely", "Very Likely"]
                    ],
                    [
                        "type"=> "mcq",
                        "multiSelect"=> False,
                        "title"=> "Have you noticed any improvement in your caregiving approach since using the iHELP platform?",
                        "tag"=> "improvement-in-caregiving",
                        "option"=> ["Significant improvement", "Moderate improvement", "Slight improvement", "No improvement", "Not applicable/I haven't used the platform"]
                    ],
                    [
                        "type"=> "essay",
                        "title"=> "Please share any success stories or positive experiences you've had as a result of using the iHELP website.",
                        "tag"=> "success-stories"
                    ],
                ];
              }
            $data = [
                "question"=> $questions,
            ];
            return $this->successResponse($data, 'Data found', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function emergencySupport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'  => 'required',
        ]);
        if ($validator->fails()) {
            $error  = [
                "error_description" => "You are unauthorized!"
            ];
            return $this->errorResponse( $error, 'Unauthorized',401);
        }
        try {
            $data = [
                "request_id" => "12345",
                "timestamp" => "2023-11-20T12:00:00Z"
            ];
            return $this->successResponse($data, 'Emergency support request submitted successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function serviceDirectoryDetails($id)
    {
        try {
            if($id == 1){
                $data = [
                    "facility_id"=> 1,
                    "name"=> "ABC Dementia Care Center",
                    "location"=> "123 Main Street, Anytown, CA",
                    "type"=> "Dementia Care Center",
                    "cost"=> "$$$",
                    "website"=> "https://abcdementiacarecenter.com"
                ];
                return $this->successResponse($data, 'Service/Facility retrieved successfully', 200);
            } else
            {
                $error  = [
                    "error_description" => "You are unauthorized!"
                ];
                return $this->errorResponse( $error, 'Unauthorized',401);
            }
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function serviceDirectory()
    {
        try {
            $data = [
                [
                  "facility_id"=> 1,
                  "name"=> "Care Center A",
                  "type"=> "Dementia Care Center",
                  "location"=> "123 Elm Street, Anytown, CA 12345",
                  "cost"=> "$$$",
                  "website"=> "https://example.com/care-center-a"
                ],
                [
                  "facility_id"=> 2,
                  "name"=> "Daycare Center B",
                  "type"=> "Daycare Center",
                  "location"=> "456 Oak Avenue, Newville, NY 54321",
                  "cost"=> "$$",
                  "website"=> "https://example.com/daycare-center-b"
                ],
                [
                  "facility_id"=> 3,
                  "name"=> "Facility C",
                  "type"=> "Other Facility",
                  "location"=> "789 Maple Road, Researchville, CA 98765",
                  "cost"=> "$",
                  "website"=> "https://example.com/facility-c"
                ]
              ];
            return $this->successResponse($data, 'List of Community-Based Services & Facilities retrieved successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function learningModuleDetails($id)
    {
        try {
            if($id == 1){
                $data = [
                    "module_id"=> 1,
                    "title"=> "Understanding Alzheimer's Disease",
                    "description"=> "An overview of Alzheimer's disease and its impact on patients and caregivers.",
                    "video_url"=> "https://example.com/module1_video",
                    "resource_url"=> "https://example.com/module1_resources"
                ];
                return $this->successResponse($data, 'Education Training Module retrieved successfully', 200);
            } else
            {
                $error  = [
                    "error_description" => "You are unauthorized!"
                ];
                return $this->errorResponse( $error, 'Unauthorized',401);
            }
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function learningModule()
    {
        try {
            $data = [
                [
                    "module_id"=> 1,
                    "type"=> "video",
                    "title"=> "Understanding Alzheimer's and Related Dementias",
                    "description"=> "To provide an overview of ADRD, its symptoms, and the impact on individuals and caregivers.",
                    "link"=> "https://www.youtube.com/watch?v=GRf5m2zgNp0"
                ],
                [
                    "module_id"=> 2,
                    "type"=> "pdf",
                    "title"=> "Medication Management in ADRD",
                    "description"=> "To explain the importance of medication adherence and provide guidance on managing medications for ADRD patients.",
                    "link"=> "https://www.alzheimers.org.uk/sites/default/files/pdf/factsheet_drug_treatments_for_alzheimers_disease.pdf"
                ],
                [
                    "module_id"=> 3,
                    "type"=> "website",
                    "title"=> "Legal and Financial Planning for Caregivers",
                    "description"=> "To guide caregivers through the legal and financial aspects of caring for a loved one with ADRD.",
                    "link"=> "https://www.alz.org/help-support/caregiving/financial-legal-planning"
                ],
                [
                    "module_id"=> 4,
                    "type"=> "video",
                    "title"=> "Caring for Your Emotional Well-being",
                    "description"=> "To address the emotional challenges faced by caregivers and provide self-care techniques.",
                    "link"=> "https://youtu.be/sgpEZm5anlo?si=qw9LJjajqhUiR9T2"
                ]
            ];
            return $this->successResponse($data, 'List of Education Training Modules retrieved successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function signout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'  => 'required',
        ]);
        if ($validator->fails()) {
            $error  = [
                "error_description" => "You are unauthorized!"
            ];
            return $this->errorResponse( $error, 'Unauthorized',401);
        }
        try {
            $data = null;
            return $this->successResponse($data, 'User sign-out successful', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function userProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'  => 'required',
        ]);
        if ($validator->fails()) {
            $error  = [
                "error_description" => "You are unauthorized!"
            ];
            return $this->errorResponse( $error, 'Unauthorized',401);
        }
        try {
            $data = [
                "user_id"=> 123,
                "username"=> "john_doe",
                "user_type"=> "patient",
                "email"=> "john.doe@example.com",
                "first_name"=> "John",
                "last_name"=> "Doe",
                "birthdate"=> "1990-05-15",
                "address"=> "123 Main Street",
                "city"=> "Anytown",
                "state"=> "CA",
                "postal_code"=> "12345",
                "country"=> "United States",
                "additional_user_field"=> "Additional field specific to the user type"
            ];
            return $this->successResponse($data, 'User profile details updated successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function getUserProfile()
    {
        try {
            $data = [
                "user_id"=> 123,
                "username"=> "john_doe",
                "user_type"=> "patient",
                "email"=> "john.doe@example.com",
                "first_name"=> "John",
                "last_name"=> "Doe",
                "birthdate"=> "1990-05-15",
                "address"=> "123 Main Street",
                "city"=> "Anytown",
                "state"=> "CA",
                "postal_code"=> "12345",
                "country"=> "United States",
                "additional_user_field"=> "Additional field specific to the user type"
            ];
            return $this->successResponse($data, 'User profile details retrieved successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function signIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id'  => 'required',
        ]);
        if ($validator->fails()) {
            $error  = [
                "error_description" => "You are unauthorized!"
            ];
            return $this->errorResponse( $error, 'Unauthorized',401);
        }
        try {
            $data = [
                "user_id"=> 123,
                "username"=> "john_doe",
                "user_type"=> "patient",
                "email"=> "john.doe@example.com",
                "access_token"=> "jhfbsdjhfbjhbjhbjhasfdbj34igjfbdsjhbcjfdjshb"
            ];
            return $this->successResponse($data, 'Sign-in successful', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'  => 'required',
        ]);
        if ($validator->fails()) {
            $error  = [
                "error_description" => "The request is missing required parameters."
            ];
            return $this->errorResponse( $error, 'Bad Request',400);
        }
        try {
            $data = [
                "user_id"=> 123,
                "username"=> "john_doe",
                "user_type"=> "patient",
                "email"=> "john.doe@example.com",
                "access_token"=> "jhfbsdjhfbjhbjhbjhasfdbj34igjfbdsjhbcjfdjshb"
            ];
            return $this->successResponse($data, 'Sign-in successful', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function eventDetails($id)
    {
        try {
            if($id == 1){
                $data = [
                    "event_id"=> 1,
                    "title"=> "Memory games and puzzles",
                    "location"=> "123 Main Street, Anytown, CA",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ];
                return $this->successResponse($data, 'Event details retrieved successfully', 200);
            } else
            {
                $error  = [
                    "error_description" => "You are unauthorized!"
                ];
                return $this->errorResponse( $error, 'Unauthorized',401);
            }
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function event()
    {
        try {
            $data = [
                [
                    "event_id"=> 1,
                    "title"=> "Memory games and puzzles",
                    "location"=> "123 Elm Street, Anytown, CA 12345",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 2,
                    "title"=> "Music therapy sessions",
                    "location"=> "456 Oak Avenue, Newville, NY 54321",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 3,
                    "title"=> "Arts and crafts workshops",
                    "location"=> "789 Maple Road, Researchville, CA 98765",
                    "type"=> "Announcement",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 4,
                    "title"=> "Gardening activities",
                    "location"=> "123 Elm Street, Anytown, CA 12345",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 5,
                    "title"=> "Gentle exercise or yoga classes",
                    "location"=> "456 Oak Avenue, Newville, NY 54321",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 6,
                    "title"=> "Storytelling sessions",
                    "location"=> "789 Maple Road, Researchville, CA 98765",
                    "type"=> "Announcement",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 7,
                    "title"=> "Cooking or baking classes with simple recipes",
                    "location"=> "123 Elm Street, Anytown, CA 12345",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 8,
                    "title"=> "Pet therapy sessions",
                    "location"=> "456 Oak Avenue, Newville, NY 54321",
                    "type"=> "Learning",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 9,
                    "title"=> "Nature walks or outdoor picnics",
                    "location"=> "789 Maple Road, Researchville, CA 98765",
                    "type"=> "Announcement",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ],
                [
                    "event_id"=> 10,
                    "title"=> "Sensory activities like scented oils or textured materials for touch",
                    "location"=> "789 Maple Road, Researchville, CA 98765",
                    "type"=> "Announcement",
                    "event_time_from"=> "2024-01-20T10:00:00Z",
                    "event_time_to"=> "2024-01-20T17:00:00Z",
                    "description"=> "This is an event description."
                ]
              ];
            return $this->successResponse($data, 'List of Events retrieved successfully', 200);
        } catch (QueryException $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $ex) {
            return $this->errorResponse($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
