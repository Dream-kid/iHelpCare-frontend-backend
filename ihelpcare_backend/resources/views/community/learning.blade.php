@extends('template.index')
@section('styles')
    <style>
        .profile-card {
            max-width: 800px;
            margin: 30px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #ffffff;
        }
        .info {
            gap: 5px;
            background-color: #ffffff;
            border-radius: 5px;
            white-space: normal;
        }
    </style>
@append
@section('content')
<section class="our-services pb-5">
    <div class="profile-card">
        <div class="row bg-light">
            <div class="col-md-12 p-3 information">
                <p class="ml-2 text-dark fs-5 text-center">Educational Module</p>
                <div class="info mb-2">
                    <div class="row text-dark p-2 pb-1">
                        <a href="{{route('community.learning.details')}}" class="text-decoration-none">
                            <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/learning_sample.png')}}"/>
                        </a>
                    </div>
                </div>
                <div class="info mb-2">
                    <div class="row text-dark p-2 pb-1">
                        <a href="{{route('community.learning.details')}}" class="text-decoration-none">
                            <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/learning_sample.png')}}"/>
                        </a>
                    </div>
                </div>
                <div class="info mb-2">
                    <div class="row text-dark p-2 pb-1">
                        <a href="{{route('community.learning.details')}}" class="text-decoration-none">
                            <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/learning_sample.png')}}"/>
                        </a>
                    </div>
                </div>
                <div class="info mb-2">
                    <div class="row text-dark p-2 pb-1">
                        <a href="{{route('community.learning.details')}}" class="text-decoration-none">
                            <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/learning_sample.png')}}"/>
                        </a>
                    </div>
                </div>
                <div class="info mb-2">
                    <div class="row text-dark p-2 pb-1">
                        <a href="{{route('community.learning.details')}}" class="text-decoration-none">
                            <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/learning_sample.png')}}"/>
                        </a>
                    </div>
                </div>
            </div>
            <p class="text-center fs-4">
                <a href="{{ route('dashboard') }}" class="text-decoration-none text-dark" title="Go Back"><i class="fa fa-arrow-circle-left" ></i>&nbsp;Go Back</a>
            </p>
        </div>
    </div>  
</section>
@endsection