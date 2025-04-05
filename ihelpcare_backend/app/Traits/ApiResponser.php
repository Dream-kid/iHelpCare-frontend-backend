<?php

namespace App\Traits;

trait ApiResponser
{
    protected function successResponse($data, $message, $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'code' => $code,
            'message' => $message,
            'data' => $data,

        ], $code);
    }

    protected function errorResponse($data,$message, $code)
    {
        return response()->json([
            'status' => 'error',
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ], $code);
    }
}
