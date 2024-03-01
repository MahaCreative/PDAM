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
    public function updateFoto(Request $request)
    {

        $setting = SettingProfile::findOrFail(1);
        $foto = $request->file('foto')->store('setting profiles');
        $setting->update([
            'logo_perusahaan' => $foto
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil memperbaharui profile perusahaan']);
    }
    public function update(Request $request)
    {

        $attr = $request->validate([
            'nama_perusaaan' => ['required', 'string'],
            'email_perusahaan' => ['required', 'string', 'email'],
            'telp_perusahaan' => ['required', 'numeric', 'min:12'],
            'alamat_perusahaan' => ['required', 'string'],
        ]);
        $setting = SettingProfile::findOrFail(1);
        $setting->update($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil memperbaharui profile perusahaan']);
    }
}
