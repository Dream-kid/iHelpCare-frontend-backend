@extends('template.index')
@section('styles')
    <style>
    </style>
@append
@section('content')
<section class="our-services pb-5">
    <div class="container">
        <h1 class="fw-bold py-5 text-center">Service Directory</h1>
        <div class="row g-4 g-lg-5 text-center mb-4 mb-lg-5">
            <div class="col-lg-2 col-sm-4 col-6">
                <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/our-service.png')}}"/>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
                <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/our-service.png')}}"/>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
                <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/our-service.png')}}"/>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
                <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/our-service.png')}}"/>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
                <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/our-service.png')}}"/>
            </div>
            <div class="col-lg-2 col-sm-4 col-6">
                <img class="img img-fluid rounded mb-4 w-100" src="{{asset('/images/our-service.png')}}"/>
            </div>
        </div>
        <!--            <div class="text-center">-->
        <!--                <button type="button" class="btn btn-primary btn-lg fw-bold px-4 px-lg-5">Read More</button>-->
        <!--            </div>-->
    </div>
</section>
@endsection