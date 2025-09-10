<?php
use App\Http\Controllers\RoleController;

Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');

// I ADD THIS IF EVER TO MAKE A ROLE MANAGEMENT

// Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
// Route::get('/roles/{id}', [RoleController::class, 'show'])->name('roles.show');
// Route::put('/roles/{id}', [RoleController::class, 'update'])->name('roles.update');
// Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('roles.destroy');

// I ADD THIS IF EVER TO MAKE A ROLE MANAGEMENT