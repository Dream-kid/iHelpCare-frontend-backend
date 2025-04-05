<div class="footer-section mt-auto pt-3 bg-light">
    <div class="border-bottom pb-5 mb-4">
        <div class="container">
            <div class="row">
                @include('include.footer.footer-partials.socials')
                @include('include.footer.footer-partials.news-letter')
            </div>
        </div>
    </div>
    <div class="border-bottom ">
        <div class="container">
            @include('include.footer.footer-partials.footer-menu')
        </div>
    </div>
</div>
<footer class="footer mt-auto py-3">
    <div class="container text-center">
        <span class="">1100 South Marietta Pkwy SE, Marietta, GA 30060, USA © {{date('Y')}} IHELP.  {{ __('home.all_rights_reserved')}}.</span>
    </div>
</footer>
