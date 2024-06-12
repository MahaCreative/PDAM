<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::create([
            'text' => '
            <div class="content-font-larger">
			<div class="mb-4">Berdirinya PDAM Surya Sembada Kota Surabaya merupakan peninggalan jaman Belanda, dimana pembentukan sebagai BUMD berdasarkan :</div>
			<ul>
				<li>Peraturan Daerah No. 7 tahun 1976 tanggal 30 Maret 1976</li>
				<li>Disahkan dengan Surat Keputusan Gubernur Kepala Daerah Tingkat I Jawa Timur, tanggal 06 Nopember 1976 No. II/155/76</li>
				<li>Diundangkan dalam Lembaran Daerah Kotamadya Daerah Tingkat II Surabaya tahun 1976 seri C pada tanggal 23 Nopember 1976 No. 4/C</li>
			</ul>
		</div>'
        ]);
    }
}
