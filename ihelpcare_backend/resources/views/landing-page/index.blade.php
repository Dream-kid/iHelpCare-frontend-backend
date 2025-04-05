@extends('template.index')

@section('content')
    <main>
        @include('modules.primary')
        @include('modules.services')
        @include('modules.facilities')
        @include('modules.stories')
        @include('modules.how-it-works')
        @include('modules.emergency')
    </main>
@endsection
