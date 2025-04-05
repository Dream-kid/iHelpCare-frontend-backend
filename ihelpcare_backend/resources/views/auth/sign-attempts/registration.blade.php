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
<form  action="{{route('user.registration')}}" method="POST" >
    @csrf
    <div class="row">
        <div class="col-lg-6">
            <div class="mb-3">
                <label for="firstName" class="form-label">{{ __('home.first_name')}}<span
                        class="req">*</span></label>
                <input type="text" class="form-control" id="firstName" name="first_name"
                       value="{{ old('first_name') }}" required>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="mb-3">
                <label for="lastName" class="form-label">{{ __('home.last_name')}}<span
                        class="req">*</span></label>
                <input type="text" class="form-control" id="lastName" name="last_name"
                       value="{{ old('last_name') }}" required>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="emailSignUp" class="form-label">{{ __('home.email_address')}}<span
                class="req">*</span></label>
        <input type="email" class="form-control" id="emailSignUp" name="email" value="{{ old('email') }}" required>
    </div>
    <div class="mb-3">
        <label for="passwordSignUp" class="form-label">{{ __('home.password')}}<span
                class="req">*</span></label>
        <input type="password" class="form-control" id="passwordSignUp" name="password" required>
    </div>
    <div class="mb-3">
        <label for="confirmPasswordSignUp" class="form-label">{{ __('home.confirm_password')}}<span class="req">*</span></label>
        <input type="password" class="form-control" id="confirmPasswordSignUp" name="password_confirmation" required>
    </div>
    <button type="submit" class="btn btn-primary">{{ __('home.sign_up')}}</button>
</form>

<script>
    const password = document.getElementById("passwordSignUp");
    const confirm_password = document.getElementById("confirmPasswordSignUp");

    function validatePassword(){
        if(password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
</script>
