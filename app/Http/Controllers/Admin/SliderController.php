<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SliderController extends Controller
{
    public function index(Request $request)
    {
        $query = Slider::query();
        $slider = $query->latest()->get();
        return inertia('Admin/Blog/Slider/Slider', compact('slider'));
    }
    public function create(Request $request)
    {

        try {
            $request->validate(['foto' => 'required|mimes:png,jpeg,jpg,svg']);
            if ($request->hasFile('foto')) {
                $foto = $request->file('foto')->store('slider');
                $slider = Slider::create(['foto' => $foto]);
                return redirect()->back()->with(['type' => 'success', 'message' => 'berhasil menambahkan slider baru']);
            } else {
                return redirect()->back()->with(['type' => 'error', 'message' => 'Silahkan memilih gambar terlebih dahulu']);
            }
        } catch (ValidationException $e) {
            // dd($e->validator->errors()->toArray()[1][0]);
            return redirect()->back()->with(['type' => 'error', 'message' => 'gagal menambahkan slider, silahkan masukkan gambar ' . $e->validator->errors()->toArray()['foto']]);
        }
    }

    public function delete(Request $request)
    {
        $slider = Slider::findOrFail($request->id);
        $slider->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil menghapus slider']);
    }
}
