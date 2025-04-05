<?php

namespace App\Http\Controllers\V1\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class DashboardController extends Controller
{
    public function __construct()
    {
        // If needed.
    }

    /**
     * @return Application|Factory|View|\Illuminate\Foundation\Application
     */
    public function index()
    {
        $modal = '';
        return view('dashboard.dashboard', compact('modal'));
    }
    public function myProfile(Request $request)
    {
        $modal = '';
        return view('profile.my_profile', compact('modal'));
    }
    public function learning(Request $request)
    {
        $modal = '';
        return view('community.learning', compact('modal'));
    }
    public function emergencySupport(Request $request)
    {
        $modal = '';
        return view('emergency.support', compact('modal'));
    }
    public function emergencyInfo(Request $request)
    {
        $modal = '';
        return view('emergency.info', compact('modal'));
    }
    public function communityEventActivities(Request $request)
    {
        $modal = '';
        return view('community.event_activities', compact('modal'));
    }
    public function communitySupportCommunities(Request $request)
    {
        $modal = '';
        return view('community.support_community', compact('modal'));
    }
    public function communityServiceDirectory(Request $request)
    {
        $modal = '';
        return view('community.service_directory', compact('modal'));
    }
    public function communityBlog(Request $request)
    {
        $modal = '';
        return view('community.blog', compact('modal'));
    }
    public function servey(Request $request)
    {
        $modal = '';
        return view('include.survey', compact('modal'));
    }
    public function communityLearningDetails()
    {
        $modal = '';
        return view('community.learning.details', compact('modal'));
    }
    public function aboutUs()
    {
        $modal = '';
        return view('features.about_us', compact('modal'));
    }
    public function contactUs()
    {
        $modal = '';
        return view('features.contact_us', compact('modal'));
    }
    public function home()
    {
        $modal = '';
        return view('landing-page.index', compact( 'modal'));
    }
    public function switchLanguage(Request $request)
    {
        App::setLocale($request->lang);
        session()->put('locale', $request->lang);
  
        return redirect()->back();
    }
}
