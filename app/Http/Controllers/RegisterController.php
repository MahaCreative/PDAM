<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Register');
    }
    public function store(Request $request)
    {

        $request->validate([
            'email' =>  "required|email|unique:users,email",
            'password' =>  "required|string|min:6|string",
            'no_ktp' =>  "required|numeric|min:16|unique:pelanggans,no_ktp",
            'nama_pelanggan' =>  "required|string",
            'alamat' =>  "required|string",
            'kecamatan' =>  "required|string",
            'foto' =>  "required|mimes:png,jpg,jpeg",
            'no_telp' =>  "required|numeric|min:13|unique:pelanggans,no_telp",
        ]);
        $foto = $request->file('foto') ? $request->file('foto')->store('Foto') : null;
        $user = User::create([
            'name' => $request->nama_pelanggan,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->assignRole('pelanggan');
        $kdPelanggan = 'P/0' . Pelanggan::count() + 1 . '/D/' . now()->format('ymd');

        $pelanggan = Pelanggan::create([
            'kd_pelanggan' => $kdPelanggan,
            'no_ktp' => $request->no_ktp,
            'nama_pelanggan' => $request->nama_pelanggan,
            'alamat' => $request->alamat,
            'kecamatan' => $request->kecamatan,
            'foto' => $foto,
            'pelanggan_id' => $user->id,
            'no_telp' => $request->no_telp,
        ]);
        Auth::login($user);
        return redirect()->route('dashboard')->with(['type' => 'success', 'message' => 'Anda telah login']);
    }
}
