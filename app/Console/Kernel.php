<?php

namespace App\Console;

use App\Models\TagihanBulanan;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
            $tagihanBulanan = TagihanBulanan::with('tarif')->whereMonth('tanggal_tagihan', Carbon::now()->subMonth()->month)
                ->whereYear('tanggal_tagihan', Carbon::now()->subYear()->year)
                ->where('status_pembayaran', 'belum dibayar')->get();
            foreach ($tagihanBulanan as $tagihan) {
                $tagihan->status_tunggakan = 'menunggak';
                $tagihan->denda = $tagihan->tarif->denda;
                $tagihan->total_tagihan = $tagihan->total_tagihan +
                    $tagihan->tarif->denda;
                $tagihan->save();
            }
        })->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
