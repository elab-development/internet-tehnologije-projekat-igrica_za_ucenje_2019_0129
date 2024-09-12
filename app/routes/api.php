<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChallengeUserPivotController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Ruta za pretragu lekcija, dostupna svim ulogama
Route::get('/lessons/search', [LessonController::class, 'search']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('challenges', ChallengeController::class);
    Route::apiResource('lessons', LessonController::class);
    Route::get('/admin/statistics', [ChallengeUserPivotController::class, 'statistics']);

    Route::get('/challenge-user-pivot', [ChallengeUserPivotController::class, 'index']);
    Route::get('/challenge-user-pivot/{id}', [ChallengeUserPivotController::class, 'show']);
    Route::post('/challenge-user-pivot', [ChallengeUserPivotController::class, 'store']);
    Route::put('/challenge-user-pivot/{id}', [ChallengeUserPivotController::class, 'update']);
    Route::delete('/challenge-user-pivot/{id}', [ChallengeUserPivotController::class, 'destroy']);
});



// Rute za autentifikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
 