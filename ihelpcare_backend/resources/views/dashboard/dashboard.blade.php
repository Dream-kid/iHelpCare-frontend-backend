@extends('template.index')

@section('styles')
    <style>
    </style>
@append
@section('content')

    <section class="our-services our-facilities border-top">
        {{-- <div class="container py-0 py-sm-4 py-lg-1">
            <h1 class="fw-bold mb-3 mt-3">Profile</h1>
            <div class="row">
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <div class="text-center">
                        <i class="fa fa-user fa-4x icon-color-red" aria-hidden="true"></i>
                        <h3 class="sub-title fw-semibold mt-3">
                            <a class="dashboard-blocks-url" href="{{route('myprofile')}}">My Profile</a>
                        </h3>
                    </div>
                </div>
            </div>
        </div> --}}
        <div class="container py-0 py-sm-4 py-lg-1">
            <h1 class="fw-bold mb-3 mt-3">{{ __('dashboard.community')}}</h1>
            <div class="row">
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('community.learning')}}">
                        <div class="text-center">
                            <i class="fa fa-book fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url"> {{ __('dashboard.learning')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('community.service.directory')}}">
                        <div class="text-center">
                            <i class="fa fa-bars fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url"> {{ __('dashboard.service_directory')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('community.event.activities')}}">
                        <div class="text-center">
                            <i class="fa fa-calendar fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url">{{ __('dashboard.events_activities')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('community.support.communities')}}">
                        <div class="text-center">
                            <i class="fa fa-comment fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url">{{ __('dashboard.support_communities')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('community.blog')}}">
                        <div class="text-center">
                            <i class="fa fa-clipboard fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                                <span class="dashboard-blocks-url">{{ __('dashboard.blog')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="our-services our-facilities ">
        <div class="container py-0 py-sm-4 py-lg-0">
            <h1 class="fw-bold mb-3 mt-3">{{ __('dashboard.emergency')}}</h1>
            <div class="row">
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="#">
                        <div class="text-center">
                            <i class="fa fa-plus fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url"> {{ __('dashboard.emergency_visit')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('emergency.support')}}">
                        <div class="text-center">
                            <i class="fa fa-heartbeat fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url"> {{ __('dashboard.emergency_support')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
                <div class="col-lg-2 mb-5 dashboard-blocks">
                    <a class="text-decoration-none" href="{{route('emergency.info')}}">
                        <div class="text-center">
                            <i class="fa fa-phone fa-4x icon-color-red" aria-hidden="true"></i>
                            <h3 class="sub-title fw-semibold mt-3">
                               <span class="dashboard-blocks-url"> {{ __('dashboard.helpline_info')}}</span>
                            </h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>


@endsection
