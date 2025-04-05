<div class="mt-5">
    @if($errors->any())
        <div class="col-12">
            @foreach($errors->all() as $error)
                <div class="alert alert-danger">{{$error}}</div>
            @endforeach
        </div>
    @endif
    @if(session()->has('error'))
        <div class="alert alert-danger">{{session('error')}}</div>
    @endif
    @if(session()->has('success'))
        <div class="alert alert-success">{{session('success')}}</div>
    @endif
</div>
<form  action="{{route('user.login')}}" method="POST">
    @csrf
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">{{ __('home.email_address')}}<span
                class="req">*</span></label>
        <input type="email" class="form-control" id="exampleInputEmail1" name="email" required>
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">{{ __('home.password')}}<span class="req">*</span></label>
        <input type="password" class="form-control" id="exampleInputPassword1" name="password" required>
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">{{ __('home.remember_me')}}</label>
    </div>
    <button type="submit" class="btn btn-primary">{{ __('home.sign_in')}}</button>
</form>
