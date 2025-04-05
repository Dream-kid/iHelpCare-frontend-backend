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
    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 20px;
    }
    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .information{
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #d8d6d6;
    }
    .info {
        gap: 5px;
        background-color: #ffffff;
        border-radius: 5px;
        white-space: normal;
    }
    h3{
        font-size: 20px;
        text-align: left;
    }
    h4 {
        font-size: 17px;
        text-align: right;
    }
    </style>
@append
@section('content')
<section class="py-0">
    <div class="container">
        <div class="profile-card">
            <div class="profile-image">
            <img src="{{asset('/images/profile/user.jpeg')}}" alt="Profile Image">
            </div>
            <h2 class="text-center">John Doe</h2>
            <hr>
            <div class="row bg-light">
                <div class="col-md-12 p-3 information">
                    <p class="ml-2 text-dark fs-5">{{ __('profile.personal_information')}}</p>
                    <div class="info">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.user_name')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>John Doe</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.user_type')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>patient</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.email')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>john.doe@example.com</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.phone')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>1990-05-15</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                    </div>
                    <p class="ml-2 text-dark fs-5">{{ __('profile.address')}}</p>
                    <div class="info">
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.street')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>123 Main Street</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.city_or_state')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>Anytown, GA</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.postal_code')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>12345</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                        <div class="row text-dark p-2 pb-1">
                            <div class="col-md-4 float-left"><h3>{{ __('profile.country')}}</h3></div>
                            <div class="col-md-8 float-right"><h4>United States</h4></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="border"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</section>
@endsection