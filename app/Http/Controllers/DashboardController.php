<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->getRoleNames()[0] !== 'pelanggan') {
            return inertia('Admin/Dashboard/Dashboard');
        }
        return inertia('Pelanggan/Dashboard/Dashboard');
    }
}
