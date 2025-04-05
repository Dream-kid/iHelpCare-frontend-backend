<?php

namespace App\Http\Controllers\V1\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponser;
class StaticApiController extends Controller
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
        } catch (\Exception $ex) {
            return $this->errorResponse(null, 'Something went wrong!', 500);
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
        } catch (\Exception $ex) {
            return $this->errorResponse(null, 'Something went wrong!', 500);
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
        } catch (\Exception $ex) {
            return $this->errorResponse(null, 'Something went wrong!', 500);
        }
    }
}
