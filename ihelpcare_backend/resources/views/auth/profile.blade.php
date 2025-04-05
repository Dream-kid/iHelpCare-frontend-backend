<div class="modal profile-modal fade" id="profileModal" aria-hidden="true"
     aria-labelledby="profileModal"
     tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-shadow">
            <!--            <div class="modal-header">-->
            <!--                <h1 class="modal-title fs-5"></h1>-->
            <!--                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
            <!--            </div>-->
            <div class="modal-body border-0 p-0">
                <div class="card border-0">
                    <div class="card-header"></div>
                    <div class="card-body">
                        <div class="inner">
                            <div class="user-name">
                                {{ auth()->user()->first_name ?? '' }} {{ auth()->user()->last_name ?? '' }}
                            </div>
                            <div class="user-address">Mail</div>
                            <div class="user-address">{{ auth()->user()->email ?? '' }}</div>
                            <div class="user-address">London</div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="inner">
                            <div>80K</div>
                            <div class="color__gray">Followers</div>
                        </div>
                        <div class="inner">
                            <div>803K</div>
                            <div class="color__gray">Likes</div>
                        </div>
                        <div class="inner">
                            <div>1.4K</div>
                            <div class="color__gray">Following</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--            <div class="modal-footer">-->
            <!--            </div>-->
        </div>
    </div>
</div>
