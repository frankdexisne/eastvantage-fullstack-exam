<?php

use App\Http\Controllers\SelectController;

Route::get('/selects/roles', [SelectController::class, 'roles']);