<?php

namespace App\Http\Controllers;

class MediaFileController extends Controller
{
    public function show($path)
    {
        return response()->download(storage_path('app/media_file/' . $path), null, [], null);
    }
}
