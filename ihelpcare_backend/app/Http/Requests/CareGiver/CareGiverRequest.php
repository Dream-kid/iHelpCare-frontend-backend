<?php

namespace App\Http\Requests\CareGiver;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class CareGiverRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        switch ($this->method()) {
            case 'DELETE':
            case 'PUT':
            {
                return [
                    'first_name' => 'required',
                    'last_name' => 'required',
                 ];
            }
            case 'GET':
            {
                return [ ];
            }
            case 'POST':
            {
                return [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users',
                ];
            }

            default:break;
        }
    }
}
