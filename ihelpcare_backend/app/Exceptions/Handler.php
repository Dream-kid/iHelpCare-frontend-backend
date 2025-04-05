<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Traits\ApiResponser;

class Handler extends ExceptionHandler
{
    use ApiResponser;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $e)
    {
        if ($request->wantsJson()) {   //add Accept: application/json in request
            return $this->handleException($request, $e);
        }else {
            return parent::render($request, $e);
        }
    }
    public function handleException($request, Exception $exception)
    {

        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->errorResponse([],'The specified method for the request is invalid', 405);
        }

        if ($exception instanceof NotFoundHttpException) {
            return $this->errorResponse([],'The specified URL cannot be found', 404);
        }

        if ($exception instanceof HttpException) {
            return $this->errorResponse([],$exception->getMessage(), $exception->getStatusCode());
        }

        if (config('app.debug')) {
            return $this->errorResponse([],$exception->getMessage(), 500);
        }
        return $this->errorResponse([],'Unexpected Exception. Try later', 500);

    }
}
