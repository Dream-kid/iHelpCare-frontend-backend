<nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
        <?php if(auth()->guard()->check()): ?>
            <a class="navbar-brand text-uppercase" href="<?php echo e(route('dashboard')); ?>">iHelp</a>
        <?php else: ?>
            <a class="navbar-brand text-uppercase" href="<?php echo e(route('home')); ?>">iHelp</a>
        <?php endif; ?>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
                aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample02">
            <ul class="navbar-nav ms-auto">
                <?php if(auth()->guard()->check()): ?>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="<?php echo e(route('dashboard')); ?>"><?php echo e(__('home.home')); ?></a>
                    </li>
                <?php endif; ?>
                <li class="nav-item">
                    <a class="nav-link text-uppercase" href="#"><?php echo e(__('home.support_and_helpline')); ?></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-uppercase" href="#">
                        <?php if(session()->get('locale') == 'ph'): ?>
                            <label class="changeLang" style="cursor: pointer" data-value="en">English</label>
                        <?php endif; ?>
                        <?php if(session()->get('locale') == 'en'): ?>
                            <label class="changeLang" style="cursor: pointer" data-value="ph">Filipino</label>
                        <?php endif; ?>
                    </a>
                </li>

                <?php if(auth()->guard()->check()): ?>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="<?php echo e(route('myprofile')); ?>"><?php echo e(__('home.my_profile')); ?></a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link text-uppercase active" href="<?php echo e(route('logout')); ?>"><?php echo e(__('home.logout')); ?></a>
                    </li>
                <?php else: ?>
                        <li class="nav-item">
                            <a class="nav-link text-uppercase btn active sign-up" data-bs-target="#registrationModal"
                               data-bs-toggle="modal"><?php echo e(__('home.sign_up')); ?></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-uppercase btn" data-bs-toggle="modal" href="#registrationModal"><?php echo e(__('home.sign_in')); ?></a>
                        </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</nav>
<?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/resources/views/include/header/menu.blade.php ENDPATH**/ ?>