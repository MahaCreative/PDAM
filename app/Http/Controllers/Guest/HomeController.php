<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\galery;
use App\Models\Info;
use App\Models\Pengaduan;
use App\Models\Slider;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $slide = Slider::get()->take(10);
        $galery = galery::latest()->get()->take(10);
        $info = Info::latest()->get()->take(10);
        $berita = Berita::latest()->get()->take(10);
        $pengaduan = Pengaduan::latest()->get()->take(10);
        return inertia('Guest/Home/Index', compact(
            'slide',
            'galery',
            'info',
            'berita',
            'pengaduan',
        ));
    }
}
