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
        .fakeimg {
            height: 200px;
            background: #aaa;
        }
    </style>
@append
@section('content')
<section class="our-services pb-5">
    <div class="profile-card">
        <div class="row bg-light">
            <div class="col-md-12 p-3 information">
                <p class="ml-2 text-dark fs-5 text-center">Module Details</p>
                <div class="info mb-2">
                    <div class="row text-dark p-2 pb-1">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/GRf5m2zgNp0?si=m-U9tDJOrLdfmbP9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="info mb-2 py-2">
                    <div class="row text-dark p-2 pb-1">
                        <h3>TITLE HEADING</h3>
                        <h5>Title description, Dec 7, 2020</h5>
                        <div class="fakeimg">Fake Image</div>
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                  
                        <h3 class="mt-5">TITLE HEADING</h3>
                        <h5>Title description, Sep 2, 2020</h5>
                        <div class="fakeimg">Fake Image</div>
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>
                <div class="info mb-2 py-2">
                    <div class="row text-dark p-2 pb-1">
                        <h3>TITLE HEADING</h3>
                        <h5>Title description, Dec 7, 2020</h5>
                        <div class="fakeimg">Fake Image</div>
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                  
                        <h3 class="mt-5">TITLE HEADING</h3>
                        <h5>Title description, Sep 2, 2020</h5>
                        <div class="fakeimg">Fake Image</div>
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>
                <p class="text-center fs-4">
                    <a href="{{ URL::previous() }}" class="text-decoration-none text-dark" title="Go Back"><i class="fa fa-arrow-circle-left" ></i>&nbsp;Go Back</a>
                </p>
                
            </div>
        </div>
    </div>  
</section>
@endsection
@section('scripts')
<script>
    $(document).ready(function() {
       
    });
  </script>
  @endsection