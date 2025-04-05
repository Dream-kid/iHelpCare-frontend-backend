<nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
        @auth
            <a class="navbar-brand text-uppercase" href="{{route('dashboard')}}">iHelp</a>
        @else
            <a class="navbar-brand text-uppercase" href="{{route('home')}}">iHelp</a>
        @endauth
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
                aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav ms-auto">
                @auth
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="{{route('dashboard')}}">{{ __('home.home')}}</a>
                    </li>
                @endauth
                <li class="nav-item">
                    <a class="nav-link text-uppercase" href="#">{{ __('home.support_and_helpline')}}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-uppercase" href="#">
                        @if(session()->get('locale') == 'ph')
                            <label class="changeLang" style="cursor: pointer" data-value="en">English</label>
                        @endif
                        @if(session()->get('locale') == 'en')
                            <label class="changeLang" style="cursor: pointer" data-value="ph">Filipino</label>
                        @endif
                    </a>
                </li>

                @auth
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="{{route('myprofile')}}">{{ __('home.my_profile')}}</a>
                    </li>
                    {{-- <li class="nav-item">
                        <a class="nav-link text-uppercase active" data-bs-toggle="modal" href="#profileModal">My Profile</a>
                    </li> --}}
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="{{route('logout')}}">{{ __('home.logout')}}</a>
                    </li>
                @else
                        <li class="nav-item">
                            <a class="nav-link text-uppercase btn active sign-up" data-bs-target="#registrationModal"
                               data-bs-toggle="modal">{{ __('home.sign_up')}}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercase btn" data-bs-toggle="modal" href="#registrationModal">{{ __('home.sign_in')}}</a>
                        </li>
                @endauth
            </ul>
        </div>
    </div>
</nav>
