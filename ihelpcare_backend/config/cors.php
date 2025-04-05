<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3041',
        'http://127.0.0.1:3041',
    ],

    'allowed_origins_patterns' => [],

'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization', 'X-CSRF-TOKEN'],


    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
