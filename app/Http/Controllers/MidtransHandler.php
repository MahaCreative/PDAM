<?php

namespace App\Http\Controllers;

use App\Models\PembayaranTagihan;
use App\Models\PencatatanMeter;
use App\Models\TagihanBulanan;
use Illuminate\Http\Request;

class MidtransHandler extends Controller
{
    public function create_token(Request $request)
    {
        \Midtrans\Config::$serverKey = config('midtrans.MID_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;


        $tagihan = TagihanBulanan::with('meteran', 'periode')->findOrFail($request->tagihan_id);
        $token = null;
        $pembayaran = PembayaranTagihan::where('tagihan_bulanan_id', $tagihan->id)->first();
        if ($pembayaran) {
            return response()->json($pembayaran->token);
        } else {
            $orderId = $tagihan->id . $tagihan->meteran_pelanggan_id . $tagihan->periode_tagihan_id . now()->format('dmy') . rand(0, 1000);
            $bayarTagihan = PembayaranTagihan::create([
                "tagihan_bulanan_id" => $tagihan->id,
                "order_id" => $orderId,
                "no_meter" => $tagihan->meteran->no_meteran,
                "no_sambungan" =>  $tagihan->meteran->no_sambungan,
                "periode_tagihan" => $tagihan->periode->periode_tagihan,
                "total_pembayaran" => $tagihan->total_tagihan,
            ]);
            $params = array(
                'transaction_details' => array(
                    'order_id' => $orderId,
                    'gross_amount' => $tagihan->total_tagihan,
                ),
                'customer_details' => array(
                    'first_name' => $tagihan->meteran->nama,
                    'last_name' => $tagihan->meteran->nama,
                    'email' => 'gunturmadjid.3@gmail.com',
                    'phone' => $tagihan->meteran->no_telph,
                ),
                // 'item_details' => (
                //     [
                //         "id" => $tagihan->id,
                //         "price" => $tagihan->total_tagihan,
                //         "quantity" => 1,
                //         "name" => "Pembayaran Tagihan Bulanan"
                //     ]
                // )

            );
            $token = \Midtrans\Snap::getSnapToken($params);
            $bayarTagihan->update([
                'token' => $token
            ]);
            return response()->json($token);
        }
    }

    public function midtrans_callback(Request $request)
    {
        $serverKey = config('midtrans.MID_SERVER_KEY');
        $hashed = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);
        if ($hashed == $request->signature_key) {
            if ($request->transaction_status == 'capture' or $request->transaction_status == 'settlement') {
                $pembayaran = PembayaranTagihan::where('order_id', $request->order_id)->first();
                $tagihan = TagihanBulanan::findOrFail($pembayaran->tagihan_bulanan_id);
                $cekTagihan = TagihanBulanan::where('meteran_pelanggan_id', $tagihan->meteran_pelanggan_id)
                    ->whereNot('id', $tagihan->id)
                    ->where('status_pembayaran', 'belum lunas')
                    ->first();
                $pencatatanMeter = PencatatanMeter::findOrFail($tagihan->pencatatan_meter_id);
                $paymentInfo = array();
                if ($request->payment_type == 'csstore') {
                    $paymentInfo['store'] = $request->store;
                } else  if ($request->payment_type == 'bank_transfer') {

                    $paymentInfo['bank'] = $request->va_numbers[0]['bank'];
                    $paymentInfo['va_number'] = $request->va_numbers[0]['va_number'];
                }
                if ($cekTagihan) {
                } else {

                    $pembayaran->update([
                        'tanggal_pembayaran' => now(),
                        'payment_type' => $request->payment_type,
                        'payment_info' => $paymentInfo,
                        'payment_status' => 'lunas'
                    ]);
                }
                $tagihan->update([
                    'status_pembayaran' => 'lunas',
                    'tanggal_pembayaran' => now(),
                ]);
                $pencatatanMeter->update([
                    'tanggal_pembayaran' => now(),
                    'status_pembayaran' => 'lunas',
                ]);
            }
        }
    }
}
