<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>{{config('app.name')}}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,700;1,900&display=swap"
        rel="stylesheet">
    {{--    <link rel="stylesheet" href="{{asset('/bootstrap/js/bootstrap.bundle.min.js')}}">--}}
    <link href="{{asset('/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('/scss/style.css')}}" rel="stylesheet">
    <link href="{{asset('/styles/style.css')}}" rel="stylesheet">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
    <!-- IonIcons -->
    <link rel="stylesheet" href="{{ asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css') }}">
    @yield('styles')
    <style>
        .content-min-height {
            min-height: 700px;
        }
    </style>

</head>
<body>
{{-- Menu --}}
@include('include.header.menu')

<div class="content-min-height">
    @yield('content')
</div>


{{-- Body Modules --}}
{{--<main>--}}
{{--    @include('modules.primary')--}}
{{--    @include('modules.services')--}}
{{--    @include('modules.facilities')--}}
{{--    @include('modules.stories')--}}
{{--    @include('modules.how-it-works')--}}
{{--    @include('modules.emergency')--}}
{{--</main>--}}

{{-- Footer --}}
@include('include.footer.footer')

{{-- Menu Modals --}}
@include('auth.profile')
@include('auth.sign-attempts.sign-modal')

{{--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" ></script>--}}
<script src="{{asset('/bootstrap/js/jquery.min.js')}}" ></script>
<script type="text/javascript">
    let modal = "{!! $modal !!}";
    window.onload = function () {
        if (modal === "registration")
            OpenSignUp();
        else if (modal === "login")
            OpenSignIn();
    };
    function OpenSignIn() {
        $("#registrationModal").modal('show');
    }
    function OpenSignUp() {
        $("#registrationModal").modal('show');
    }
    function OpenProfile() {
        $("#profileModal").modal('show');
    }
    var url = "{{ route('changeLanguage') }}";
    $(document).on('click','.changeLang', function(){
        var val = $(this).data('value');
        window.location.href = url + "?lang="+ val;
        
    })
</script>
@yield('scripts')
<script src="{{asset('/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{asset('/bootstrap/js/bootstrap.min.js')}}"></script>

</body>
</html>
