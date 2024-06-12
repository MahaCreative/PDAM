<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Sejarah;
use App\Models\Status;
use Illuminate\Http\Request;

class SejarahController extends Controller
{
    public function index(Request $request)
    {
        $status = Status::first();
        $sejarah = Sejarah::all();

        return inertia('Guest/Sejarah/Index', compact('sejarah', 'status'));
    }
}
