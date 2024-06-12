<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StrukturOrganisasiController extends Controller
{
    public function index(Request $request)
    {
        $struktur = StrukturOrganisasi::first();
        return inertia('Admin/StrukturOrganisasi/StrukturOrganisasi', compact('struktur'));
    }

    public function update(Request $request)
    {
        try {
            $request->validate(['foto' => 'required|image|mimes:jpg,jpeg,png']);
            $struktur = StrukturOrganisasi::first();
            $struktur->update(['foto' => $request->file('foto')->store('struktur')]);
            return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui struktur perusahaan']);
        } catch (ValidationException $e) {
            return redirect()->back()->with(['type' => 'error', 'message' => $e->validator->errors()->toArray()['foto']]);
        }
    }
}
