<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HargaTarifPerMeter;
use App\Models\MeteranPelanggan as ModelsMeteranPelanggan;
use App\Models\Wilayah;
use Illuminate\Http\Request;

class MeteranPelanggan extends Controller
{
    public function index(Request $request)
    {
        $query = ModelsMeteranPelanggan::query()->with('wilayah');

        $count_status = ModelsMeteranPelanggan::count_status();
        if ($request->status) {
            $query->where('status_meteran', '=', $request->status);
        }
        if ($request->cari) {
            $query->where('nama', 'like', '%' . $request->cari . '%')
                ->orwhere('no_sambungan', 'like', '%' . $request->cari . '%')
                ->orwhere('no_meteran', 'like', '%' . $request->cari . '%');
        }
        $meteran = $query->latest()->get();
        return inertia('Admin/MeteranPelanggan/Index', compact('meteran', 'count_status'));
    }
    public function cetak(Request $request)
    {
        $query = ModelsMeteranPelanggan::query()->with('wilayah');

        $count_status = ModelsMeteranPelanggan::count_status();
        if ($request->status) {
            $query->where('status_meteran', '=', $request->status);
        }
        if ($request->cari) {
            $query->where('nama', 'like', '%' . $request->cari . '%')
                ->orwhere('no_sambungan', 'like', '%' . $request->cari . '%')
                ->orwhere('no_meteran', 'like', '%' . $request->cari . '%');
        }
        $meteran = $query->latest()->get();
        return inertia('Admin/MeteranPelanggan/Cetak', compact('meteran', 'count_status'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            "nik" => "required|unique:meteran_pelanggans,nik|digits:16|numeric",
            "nama" => "required|string|min:4",
            "alamat" => "required|string|min:10",
            "blok" => "required|string|min:3|max:4",
            "no_telph" => "required|numeric",
            "no_meteran" => "required|numeric|unique:meteran_pelanggans,no_meteran",
            "no_sambungan" => "required|numeric|unique:meteran_pelanggans,no_sambungan",
            "nama_golongan" => "required",
            "nama_kelompok" => "required",
        ]);
        $harga = HargaTarifPerMeter::where('golongan', '=', $request->nama_golongan)->where('kelompok', '=', $request->nama_kelompok)->first();
        $attr['harga_tarif_per_meter_id'] = $harga->id;
        $attr['tanggal_pemasangan'] = now();
        $meteran = ModelsMeteranPelanggan::create($attr);
    }

    public function update(Request $request)
    {

        $attr = $request->validate([
            "nik" => "required|unique:meteran_pelanggans,nik|digits:16|numeric",
            "nama" => "required|string|min:4",
            "alamat" => "required|string|min:10",
            "blok" => "required|string|min:3|max:4",
            "no_telph" => "required|numeric",
            "no_meteran" => "required|numeric|unique:meteran_pelanggans,no_meteran",
            "no_sambungan" => "required|numeric|unique:meteran_pelanggans,no_sambungan",
            "nama_golongan" => "required",
            "nama_kelompok" => "required",

        ]);
        $harga = HargaTarifPerMeter::where('golongan', '=', $request->nama_golongan)->where('kelompok', '=', $request->nama_kelompok)->first();

        $attr['harga_tarif_per_meter_id'] = $harga->id;
        $meteran = ModelsMeteranPelanggan::findOrFail($request->id);
        $meteran->update($attr);
    }

    public function delete(Request $request)
    {

        $meteran = ModelsMeteranPelanggan::findOrFail($request->id);
        $meteran->delete();
    }
}
