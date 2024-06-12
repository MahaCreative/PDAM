<?php

namespace App\Http\Middleware;

use App\Models\Golongan;
use App\Models\Kelompok;
// use App\Models\Pelanggan;
use App\Models\PermintaanSambunganBaru;
use App\Models\Petugas;
use App\Models\ProfilePelanggan;
use App\Models\SettingProfile;
use App\Models\TagihanBulanan;
use App\Models\User;
use App\Models\Wilayah;
use Carbon\Carbon;
use Database\Seeders\SettingProfileSeeder;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $wilayah = Wilayah::all();
        $golongan = Golongan::all();
        $kelompok = Kelompok::all();
        // $countPelanggan = Pelanggan::count();
        $settingApps = SettingProfile::first();
        $profile = [];
        $roles = [];
        $get_petugas_lapangan = User::with('roles')->whereHas('roles', function ($query) {
            $query->where('name', 'petugas lapangan');
        })->get();

        if ($request->user() != null) {
            $roles = $request->user()->getRoleNames()[0];
            if ($request->user()->getRoleNames()[0] == 'pelanggan') {
                $profile = ProfilePelanggan::where('user_id', $request->user()->id)->first();
            } else {
                $profile = Petugas::where('user_id', $request->user()->id)->first();
            }
        }


        return [
            ...parent::share($request),
            'get_petugas_lapangan' => $get_petugas_lapangan,
            'auth' => [
                'user' => $request->user(),
                'roles' => $roles,
                'profile' => $profile
            ],
            'count_pendaftar' => PermintaanSambunganBaru::count(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'wilayah' => $wilayah,
            'golongan' => $golongan,
            'kelompok' => $kelompok,
            // 'countPelanggan' => $countPelanggan,
            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),
            ],
            'settingApps' => $settingApps,
        ];
    }
}
