<?php 
namespace App\Http\Middleware;
use Illuminate\Support\Facades\Session;
  
use Closure;
use App;
  
class LanguageManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $value = Session::get('locale');
        if(isset($value)){
            $lang = $value;
        }else{
            $lang = 'en';
        }
        App::setLocale($lang);
        session()->put('locale', $lang);
          
        return $next($request);
    }
}