<div class="footer-section mt-auto pt-3 bg-light">
    <div class="border-bottom pb-5 mb-4">
        <div class="container">
            <div class="row">
                <?php echo $__env->make('include.footer.footer-partials.socials', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                <?php echo $__env->make('include.footer.footer-partials.news-letter', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
            </div>
        </div>
    </div>
    <div class="border-bottom ">
        <div class="container">
            <?php echo $__env->make('include.footer.footer-partials.footer-menu', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    </div>
</div>
<footer class="footer mt-auto py-3">
    <div class="container text-center">
        <span class="">1100 South Marietta Pkwy SE, Marietta, GA 30060, USA © <?php echo e(date('Y')); ?> IHELP.  <?php echo e(__('home.all_rights_reserved')); ?>.</span>
    </div>
</footer>
<?php /**PATH /Applications/XAMPP/xamppfiles/htdocs/ihelpcare_backend/resources/views/include/footer/footer.blade.php ENDPATH**/ ?>