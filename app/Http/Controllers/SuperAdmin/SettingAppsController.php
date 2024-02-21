<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\SettingProfile;
use Illuminate\Http\Request;

class SettingAppsController extends Controller
{
    public function index(Request $request)
    {
        $profile = SettingProfile::first();
        return inertia('SuperAdmin/SettingApplikasi/SettingApplikasi', compact('profile'));
    }
    public function store(Request $request)
    {

        return;
    }
    public function sow(Request $request)
    {
        dd($request->all());
        return;
    }
    public function update(Request $request)
    {
        dd($request->all());
        return;
    }
    public function delete(Request $request)
    {
        dd($request->all());
        return;
    }
}
