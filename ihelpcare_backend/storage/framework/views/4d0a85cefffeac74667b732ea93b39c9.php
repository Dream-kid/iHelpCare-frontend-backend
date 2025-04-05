<div class="modal registration-modal fade" id="registrationModal" aria-hidden="true"
     aria-labelledby="registrationModal"
     tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-shadow">
            <!--            <div class="modal-header">-->
            <!--                <h1 class="modal-title fs-5" id="exampleModalToggleLabel2"></h1>-->
            <!--                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
            <!--            </div>-->
            <div class="modal-body">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="sign-in-tab" data-bs-toggle="tab"
                                data-bs-target="#for-sign-in"
                                type="button" role="tab" aria-controls="for-sign-in" aria-selected="true"><?php echo e(__('home.sign_in')); ?>

                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sign-up-tab" data-bs-toggle="tab" data-bs-target="#sign-up"
                                type="button" role="tab" aria-controls="sign-up" aria-selected="false"><?php echo e(__('home.sign_up')); ?>

                        </button>
                    </li>
                </ul>

                <div class="tab-content p-4">
                    <div class="tab-pane <?php echo e($modal == 'login' ? 'active' : ''); ?> <?php echo e($modal == '' ? 'active' : ''); ?>" id="for-sign-in" role="tabpanel" aria-labelledby="sign-in-tab">
                        <?php echo $__env->make('auth.sign-attempts.sign-in', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    </div>
                    <div class="tab-pane <?php echo e($modal == 'registration' ? 'active' : ''); ?>" id="sign-up" role="tabpanel" aria-labelledby="sign-up-tab">
                        <?php echo $__env->make('auth.sign-attempts.registration', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    </div>
                </div>

                <script>
                    // var firstTabEl = document.querySelector('#myTab li:last-child a')
                    // var firstTab = new bootstrap.Tab(firstTabEl)
                    //
                    // firstTab.show()
                </script>
            </div>
            <!--            <div class="modal-footer">-->
            <!--                <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to-->
            <!--                    first-->
            <!--                </button>-->
            <!--            </div>-->
        </div>
    </div>
</div>
<?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/resources/views/auth/sign-attempts/sign-modal.blade.php ENDPATH**/ ?>