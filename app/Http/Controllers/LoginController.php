<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('Login');
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'email' => "email|required|string",
            'password' => "min:8",
        ]);
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Autentikasi berhasil
            return redirect()->route('dashboard');
        }
    }
    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
