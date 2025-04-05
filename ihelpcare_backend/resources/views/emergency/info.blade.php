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
        background-color: #fffdfd;
        text-align: center;
    }
    .info-container{
        gap: 5px;
        background-color: #ffffff;
        padding: 30px;
        margin-left: auto;
        margin-right: auto;
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
            <div class="row bg-light">
                <div class="col-md-12 p-3 information">
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.0809344730073!2d-84.52167142379868!3d33.93904642369817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5115f6c085b19%3A0x25b591da392ef372!2s1100%20South%20Marietta%20Pkwy%20SE%2C%20Marietta%2C%20GA%2030060%2C%20USA!5e0!3m2!1sen!2sbd!4v1703055256573!5m2!1sen!2sbd" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col-md-12 text-dark">
                            <h2>iHelp</h2>
                            <p>1100 South Marietta Pkwy SE, Marietta, GA 30060</p>
                            <p>Operating: 24/7</p>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-info bg-info text-white w-50"><i class="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;123-456-7890</button>
                        </div>
                    </div>
                    <div class="row py-2">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-info bg-info text-white w-50" mail-to><i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;&nbsp;support@ihelp.com</button>
                        </div>
                    </div>             
                </div>
            </div>
        </div>  
    </div>
</section>
@endsection