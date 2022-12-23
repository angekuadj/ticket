<?php

use App\Http\Controllers\EvenementController;
use App\Http\Controllers\PayementController;
use App\Http\Controllers\QrCodeGeneratorController;
use App\Http\Controllers\QrController;
use App\Models\Evenement;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/qr-code', function () {
//     return view('Q');
// });
Route::resource('/QrCode',QrController::class);

 Route::get('/welcome', function () {
     return view('welcome');
});




Route::resource('/acheter', EvenementController::class);
Route::resource('/acheter', PayementController::class);
