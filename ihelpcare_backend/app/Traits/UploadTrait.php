<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManagerStatic as Img;

trait UploadTrait
{
    public function uploadImage($image, $path = 'local/image/', $disk = 'local', $filename = null)
    {
        $name = !is_null($filename) ? $filename : md5(uniqid(rand(),true));
        $name .= '.'.$image->getClientOriginalExtension();

        $img = Img::make($image)->orientate();
        // image resize for preview
        if($img->width() > $img->height() && $img->width() > 1024)
        {
            $img->resize(1024, null, function ($constraint) {
                $constraint->aspectRatio();
            });

        }
        if($img->height() > $img->width()  && $img->height() > 1024)
        {
            $img->resize(null, 1024, function ($constraint) {
                $constraint->aspectRatio();
            });
        }
        Storage::disk($disk)->put($path. $name, $img->stream(),'public');
        return $name;
    }

    public function uploadFile($file, $path = 'local/files/', $disk = 'local', $filename = null)
    {
        $name = !is_null($filename) ? $filename : md5(uniqid(rand(),true));
        $name .= '.'.$file->getClientOriginalExtension();
        Storage::disk($disk)->put($path . $name, fopen($file, 'r+'), 'public');
        return $name;
    }

    public function deleteFileIfExists($path, $disk = 'local')
    {
        if (Storage::disk($disk)->exists($path)) {
            Storage::disk($disk)->delete($path);
        }
    }

    function createDirectory($path)
    {
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
    }
    public function uploadPhoto($image, $path = 'local/image/', $disk = 'local', $filename = null)
    {
        $name = !is_null($filename) ? $filename : md5(uniqid(rand(), true));
        $name .= '.' . $image->getClientOriginalExtension();

        $img = Img::make($image);

        Storage::disk($disk)->put($path . $name, $img->stream(), 'public');
        return $name;

    }
}
