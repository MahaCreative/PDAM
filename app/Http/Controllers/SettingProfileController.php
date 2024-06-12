<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use App\Models\Petugas;
use App\Models\ProfilePelanggan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class SettingProfileController extends Controller
{
    public function index(Request $request)
    {
        return inertia('SettingProfile/SettingProfile');
    }
    public function update_image(Request $request)
    {

        $foto = $request->file('foto') ? $request->file('foto')->store('Foto') : null;
        if ($request->roles == 'pelanggan') {
            $pelanggan = ProfilePelanggan::findOrFail($request->id);
            $pelanggan->update(['foto' => $foto]);
        }
        if ($request->roles !== 'pelanggan') {
            $pelanggan = Petugas::findOrFail($request->id);
            $pelanggan->update(['foto' => $foto]);
        }
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data']);
    }

    public function update_profile(Request $request)
    {

        if ($request->roles == 'pelanggan') {
            $pelanggan = ProfilePelanggan::findOrFail($request->id);
            $user = User::where('id', $pelanggan->user_id)->first();
            $user->update(['name' => $request->nama_pelanggan]);
            $request->validate([
                'no_ktp' => ['required', 'numeric', 'min:16', Rule::unique('pelanggans', 'no_ktp')->ignore($pelanggan->id)],
                'nama_pelanggan' => ['required', 'string', 'min:3'],
                'alamat' => ['required', 'string', 'min:6'],
                'kecamatan' => ['required', 'min:6'],
                'no_telp' => ['required', 'min:16', 'numeric', Rule::unique('pelanggans', 'no_telp')->ignore($pelanggan->id)],
            ]);

            $pelanggan->update([
                'no_ktp' => $request->no_ktp,
                'nama_pelanggan' => $request->nama_pelanggan,
                'alamat' => $request->alamat,
                'kecamatan' => $request->kecamatan,
                'no_telp' => $request->no_telp,
            ]);
        } else {
            $petugas = Petugas::findOrFail($request->id);
            $request->validate([
                'nama' =>  'required|min:3|string',
                'no_hp' =>  ['required', 'min:12', 'numeric', Rule::unique('petugas', 'no_hp')->ignore($petugas->id)],
            ]);
            $petugas->update([
                'nama' => $request->nama,
                'no_hp' => $request->no_hp,
            ]);
        }
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui data']);
    }

    public function update_user(Request $request)
    {

        $user = User::findOrFail($request->id);

        $request->validate([
            'newEmail' => ['nullable', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'min:6', 'confirmed'],
            'password_lama' => ['required', 'string', 'min:8'],
        ]);
        if (Hash::check($request->password_lama, $user->password)) {
            if ($request->newEmail == '' && $request->password == '') {
                return redirect()->back()->with(['type' => 'error', 'message' => 'Tidak ada perubahan yang berhasil disimpan']);
            } else {
                $email = $request->newEmail ? $request->newEmail : $user->email;
                $password = $request->password ? bcrypt($request->password) : $user->password;
                $user->update([
                    'email' => $email,
                    'password' => $password
                ]);
                return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil melakukan perubahan data']);
            }
        } else {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Tidak ada perubahan yang berhasil disimpan']);
        }
    }
}
