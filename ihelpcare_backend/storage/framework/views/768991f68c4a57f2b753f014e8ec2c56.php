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
<form  action="<?php echo e(route('user.login')); ?>" method="POST">
    <?php echo csrf_field(); ?>
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"><?php echo e(__('home.email_address')); ?><span
                class="req">*</span></label>
        <input type="email" class="form-control" id="exampleInputEmail1" name="email" required>
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label"><?php echo e(__('home.password')); ?><span class="req">*</span></label>
        <input type="password" class="form-control" id="exampleInputPassword1" name="password" required>
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1"><?php echo e(__('home.remember_me')); ?></label>
    </div>
    <button type="submit" class="btn btn-primary"><?php echo e(__('home.sign_in')); ?></button>
</form>
<?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/resources/views/auth/sign-attempts/sign-in.blade.php ENDPATH**/ ?>