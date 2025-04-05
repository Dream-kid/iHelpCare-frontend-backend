<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title><?php echo e(config('app.name')); ?></title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,700;1,900&display=swap"
        rel="stylesheet">
    
    <link href="<?php echo e(asset('/bootstrap/css/bootstrap.min.css')); ?>" rel="stylesheet">
    <link href="<?php echo e(asset('/scss/style.css')); ?>" rel="stylesheet">
    <link href="<?php echo e(asset('/styles/style.css')); ?>" rel="stylesheet">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="<?php echo e(asset('plugins/fontawesome-free/css/all.min.css')); ?>">
    <!-- IonIcons -->
    <link rel="stylesheet" href="<?php echo e(asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css')); ?>">
    <?php echo $__env->yieldContent('styles'); ?>
    <style>
        .content-min-height {
            min-height: 700px;
        }
    </style>

</head>
<body>

<?php echo $__env->make('include.header.menu', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

<div class="content-min-height">
    <?php echo $__env->yieldContent('content'); ?>
</div>













<?php echo $__env->make('include.footer.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>


<?php echo $__env->make('auth.profile', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php echo $__env->make('auth.sign-attempts.sign-modal', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>


<script src="<?php echo e(asset('/bootstrap/js/jquery.min.js')); ?>" ></script>
<script type="text/javascript">
    let modal = "<?php echo $modal; ?>";
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
    var url = "<?php echo e(route('changeLanguage')); ?>";
    $(document).on('click','.changeLang', function(){
        var val = $(this).data('value');
        window.location.href = url + "?lang="+ val;
        
    })
</script>
<?php echo $__env->yieldContent('scripts'); ?>
<script src="<?php echo e(asset('/bootstrap/js/bootstrap.bundle.min.js')); ?>"></script>
<script src="<?php echo e(asset('/bootstrap/js/bootstrap.min.js')); ?>"></script>

</body>
</html>
<?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/resources/views/template/index.blade.php ENDPATH**/ ?>