<?php

use App\Http\Controllers\HostController;
use App\Http\Controllers\VisitorController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\PropertyController;

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function(){
    return 'just so';
});

Route::apiResource('visitor', VisitorController::class);
Route::apiResource('host', HostController::class);

Route::Post('/register',[AuthController::class, 'register']);
Route::Post('/login',[AuthController::class, 'login']);
Route::Post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');

//------------------------------------------------------------------------------------------------------

Route::prefix('v1')->group(function () {

    Route::prefix('auth')->group(function () {

        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);
        });

    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('properties', PropertyController::class);
    });

});


// "token": "1|iVlFRPVkJ2VQalH3EJM3Clk8f5cuqVS5bG57LTBB05cf06bf"
// "token": "2|l8uc0tLs1j0q3f5dRb25Q0uWQ4rGaXym8qslQRv226060bdd"

// {
//     "email": "test@example.com",
//     "password": "password123"
// }  3|8aKtuM0uYgoYyhzrKBS1jnSeUeD9uccAHYTBEHVa262381d6


// {
//     "message": "Registration successful",
//     "user": {
//         "name": "Second User",
//         "email": "second@example.com",
//         "updated_at": "2026-09-24T13:52:51.000000Z",
//         "created_at": "2026-09-24T13:52:51.000000Z",
//         "id": 5
//     },
//     "token": "4|BY0ZtLUTN8g2J1T0Ve1slJkaTQkrXgohZTXofUyt7bfcd834"
// }