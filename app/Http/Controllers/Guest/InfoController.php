<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Info;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function index(Request $request)
    {
        $query = Info::query();
        if ($request->cari) {
            $query->where('judul', 'like', '%' . $request->cari . '%');
        }
        $info = $query->latest()->get();
        return inertia('Guest/InfoPdam/InfoPdam', compact('info'));
    }
}
