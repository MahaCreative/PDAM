<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Petugas;
use App\Models\User;
use Illuminate\Http\Request;

class DataPetugasController extends Controller
{
    public function index(Request $request)
    {
        $query = Petugas::query()->with(['user' => function ($q) {
            $q->with('roles');
        }]);
        if ($request->cari) {
            $query->where('nama', 'like', '%' . $request->cari . '%')
                // ->orWhere('nip', 'like', '%' . $request->cari . '%')
            ;
        }
        $dataPetugas = $query->latest()->get();
        // dd($dataPetugas);
        return inertia('Admin/DataPetugas/Index', compact('dataPetugas'));
    }

    public function store(Request $request)
    {

        $request->validate([
            'nip' => 'required|numeric|min:3',
            'name' => 'required|string|min:4',
            'no_hp' => 'required|numeric|digits:12',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|alpha_dash',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $foto = $request->file('foto')->store('foto_petugas');
        $user->assignRole('petugas lapangan');
        Petugas::create([
            'user_id' => $user->id,
            'nip' => $request->nip,
            'nama' => $request->name,
            'no_hp' => $request->no_hp,
            'foto' => $foto,
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menambahkan 1 data petugas baru']);
    }

    public function delete(Request $request)
    {
        $petugas = Petugas::find($request->id);
        $user = User::findOrFail($petugas->user_id);
        $user->delete();
        $petugas->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus 1 data petugas']);
    }
}
