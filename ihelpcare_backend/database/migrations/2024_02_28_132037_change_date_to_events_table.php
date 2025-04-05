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
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->time('event_time_form')->nullable()->after('start_time');
            $table->time('event_time_to')->nullable()->after('end_time');
            $table->date('start_time')->nullable()->change();
            $table->date('end_time')->nullable()->change();

            // Rename columns
            $table->renameColumn('start_time', 'event_date_form');
            $table->renameColumn('end_time', 'event_date_to');

            // Modify status column
            DB::statement("ALTER TABLE `events` CHANGE `status` `status` ENUM('Draft','Active','Disabled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Draft';");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->time('event_date_form')->nullable()->change();
            $table->time('event_date_to')->nullable()->change();

            // Reverse column renaming
            $table->renameColumn('event_date_form', 'start_time');
            $table->renameColumn('event_date_to', 'end_time');
            // Check if the status column has the new boolean values
            $currentStatusValues = DB::table('events')->pluck('status')->toArray();

            if (in_array('true', $currentStatusValues) || in_array('false', $currentStatusValues)) {
                // Rollback to boolean field with default true
                DB::statement("ALTER TABLE `events` CHANGE `status` `status` BOOLEAN DEFAULT true;");
            } else {
                // Rollback to ENUM field with default 'Draft'
                DB::statement("ALTER TABLE `events` CHANGE `status` `status` ENUM('Draft','Active','Disabled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Draft';");
            }
            $table->dropColumn('event_time_form');
            $table->dropColumn('event_time_to');
        });
    }
};
