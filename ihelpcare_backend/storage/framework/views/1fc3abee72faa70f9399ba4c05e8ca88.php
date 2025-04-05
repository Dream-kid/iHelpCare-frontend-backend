<div class="mt-5">
    <?php if($errors->any()): ?>
        <div class="col-12">
            <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="alert alert-danger"><?php echo e($error); ?></div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    <?php endif; ?>
    <?php if(session()->has('error')): ?>
        <div class="alert alert-danger"><?php echo e(session('error')); ?></div>
    <?php endif; ?>
    <?php if(session()->has('success')): ?>
        <div class="alert alert-success"><?php echo e(session('success')); ?></div>
    <?php endif; ?>
</div>
<form  action="<?php echo e(route('user.registration')); ?>" method="POST" >
    <?php echo csrf_field(); ?>
    <div class="row">
        <div class="col-lg-6">
            <div class="mb-3">
                <label for="firstName" class="form-label"><?php echo e(__('home.first_name')); ?><span
                        class="req">*</span></label>
                <input type="text" class="form-control" id="firstName" name="first_name"
                       value="<?php echo e(old('first_name')); ?>" required>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="mb-3">
                <label for="lastName" class="form-label"><?php echo e(__('home.last_name')); ?><span
                        class="req">*</span></label>
                <input type="text" class="form-control" id="lastName" name="last_name"
                       value="<?php echo e(old('last_name')); ?>" required>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="emailSignUp" class="form-label"><?php echo e(__('home.email_address')); ?><span
                class="req">*</span></label>
        <input type="email" class="form-control" id="emailSignUp" name="email" value="<?php echo e(old('email')); ?>" required>
    </div>
    <div class="mb-3">
        <label for="passwordSignUp" class="form-label"><?php echo e(__('home.password')); ?><span
                class="req">*</span></label>
        <input type="password" class="form-control" id="passwordSignUp" name="password" required>
    </div>
    <div class="mb-3">
        <label for="confirmPasswordSignUp" class="form-label"><?php echo e(__('home.confirm_password')); ?><span class="req">*</span></label>
        <input type="password" class="form-control" id="confirmPasswordSignUp" name="password_confirmation" required>
    </div>
    <button type="submit" class="btn btn-primary"><?php echo e(__('home.sign_up')); ?></button>
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
<?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/resources/views/auth/sign-attempts/registration.blade.php ENDPATH**/ ?>