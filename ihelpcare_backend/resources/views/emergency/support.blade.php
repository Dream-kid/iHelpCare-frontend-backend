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
        /* background-color: #d8d6d6; */
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
            <div class="row bg-light">
                <div class="col-md-12 p-3 information">
                    <p class="ml-2 text-dark fs-3 text-center">USER INFORMATION</p>
                    <form>
                        <div class="info p-2">
                            <div class="form-group my-2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="float-left text-dark "><h3>User Type</h3></div>
                                    </div>
                                    <div class="col-md-6"><select class="form-control">
                                        <option value="">Patient</option>
                                        <option value="">Caregiver</option>
                                    </select></div>
                                </div>
                            </div>
                            <div class="form-group my-2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="float-left text-dark "><h3>Emergency Type</h3></div>
                                    </div>
                                    <div class="col-md-6"><select class="form-control">
                                        <option value="">Medical Emergencies</option>
                                    </select></div>
                                </div>
                            </div>
                            <div class="form-group my-2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="float-left text-dark "><h3>Prefered Language</h3></div>
                                    </div>
                                    <div class="col-md-6"><select class="form-control">
                                        <option value="">English</option>
                                        <option value="">Filipino</option>
                                    </select></div>
                                </div>
                            </div>
                            <div class="form-group my-2">
                               <textarea placeholder="Location" class="form-control"></textarea>
                            </div>
                            <div class="form-group my-2">
                                <textarea placeholder="Message" class="form-control"></textarea>
                             </div>
                             <div class="form-group my-2">
                                <input type="text" placeholder="Contact Number" class="form-control">
                             </div>
                             <div class="form-group mt-5">
                                <button type="submit" class="form-control btn btn-info text-white">Submit</button>
                             </div>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>  
    </div>
</section>
@endsection