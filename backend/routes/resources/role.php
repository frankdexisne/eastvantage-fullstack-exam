<?php
use App\Http\Controllers\RoleController;

Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');