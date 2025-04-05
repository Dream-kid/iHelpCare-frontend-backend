<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('surveys', function (Blueprint $table) {
            // Change data type from TIME to TIMESTAMP
            $table->timestamp('start_time')->nullable()->change();
            $table->timestamp('end_time')->nullable()->change();

            // Rename columns
            $table->renameColumn('start_time', 'start_date');
            $table->renameColumn('end_time', 'end_date');

            // Modify status column
            DB::statement("ALTER TABLE `surveys` CHANGE `status` `status` ENUM('Draft','Active','Disabled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Draft';");
        });
    }

    public function down()
    {
        Schema::table('surveys', function (Blueprint $table) {
            // Change data type from TIMESTAMP to TIME
            $table->time('start_date')->nullable()->change();
            $table->time('end_date')->nullable()->change();

            // Reverse column renaming
            $table->renameColumn('start_date', 'start_time');
            $table->renameColumn('end_date', 'end_time');
            // Check if the status column has the new boolean values
            $currentStatusValues = DB::table('surveys')->pluck('status')->toArray();

            if (in_array('true', $currentStatusValues) || in_array('false', $currentStatusValues)) {
                // Rollback to boolean field with default true
                DB::statement("ALTER TABLE `surveys` CHANGE `status` `status` BOOLEAN DEFAULT true;");
            } else {
                // Rollback to ENUM field with default 'Draft'
                DB::statement("ALTER TABLE `surveys` CHANGE `status` `status` ENUM('Draft','Active','Disabled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Draft';");
            }
        });
    }
};
