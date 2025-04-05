<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class EventTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('event_types')->insert([
            [
                'event_type_en'   => 'Online',
                'event_type_ph'   => 'Online',
                'type_value'  => 'online',
                'status' => '1',
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ],
            [
                'event_type_en'   => 'Offline',
                'event_type_ph'   => 'Offline',
                'type_value'  => 'offline',
                'status' => '1',
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ],
            [
                'event_type_en'   => 'Hybrid',
                'event_type_ph'   => 'Hybrid',
                'type_value'  => 'hybrid',
                'status' => '1',
                'created_at'  => date('Y-m-d H:i:s'),
                'updated_at'  => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
