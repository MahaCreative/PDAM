<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Reset style untuk email */
        body,
        html {
            margin: 0;
            padding: 0;
            width: 100%;
            font-family: Arial, sans-serif;
        }

        /* Gaya untuk header */
        .header {
            background-color: #3b82f6;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        /* Gaya untuk judul */
        .title {
            font-size: 24pt;
            font-weight: bold;
        }

        /* Gaya untuk konten */
        .content {
            padding: 20px;
        }

        /* Gaya untuk tabel */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table td,
        table th {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
        }

        /* Gaya untuk tombol */
        .btn {
            display: inline-block;
            background-color: #3b82f6;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
        }

        .btn:hover {
            background-color: #2563eb;
        }

        .btn:active {
            background-color: #1e40af;
        }

        .btn:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }

        /* Gaya untuk teks penting */
        .important-text {
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h3 class="title">Sistem Informasi Pelayanan PDAM</h3>
    </div>

    <div class="content">
        <p>Hy, {{ $data['pelanggan']['nama_pendaftar'] }}</p>
        <p>Anda telah mengajukan pendaftaran sambungan baru pada sistem informasi kami dengan rincian pendaftaran
            seperti
            berikut</p>

        <table>
            <tr>
                <th>Kode Pendaftaran</th>
                <th>NIK Pendaftar</th>
                <th>Nama Pendaftar</th>
                <th>Alamat Pendaftaran</th>
                <th>Tanggal Permintaan</th>
            </tr>

            <tr>
                <td>{{ $data['pelanggan']['kd_pendaftaran'] }}</td>
                <td>{{ $data['pelanggan']['nik_pendaftar'] }}</td>
                <td>{{ $data['pelanggan']['nama_pendaftar'] }}</td>
                <td>{{ $data['pelanggan']['alamat_pemasangan'] }}</td>
                <td>{{ date('d-m-Y', strtotime($data['pelanggan']['created_at'])) }}</td>
            </tr>
        </table>

        <p class="important-text">Silahkan melakukan pembayaran terlebih dahulu agar kami dapat melanjutkan pemasangan
            meteran anda. Berikut
            rincian pembayaran anda</p>

        <table>
            <tr>
                <th>Biaya Pendaftaran</th>
                <th>Biaya Perencanaan</th>
                <th>Biaya Pemasangan</th>
                <th>Biaya Instalasi</th>
                <th>Total Pembayaran</th>
            </tr>

            <tr>
                <td>{{ number_format($data['pembayaran']['biaya_pendaftaran']) }}</td>
                <td>{{ number_format($data['pembayaran']['biaya_pendaftaran']) }}</td>
                <td>{{ number_format($data['pembayaran']['biaya_pemasangan']) }}</td>
                <td>{{ number_format($data['pembayaran']['biaya_instalasi']) }}</td>
                <td>{{ number_format($data['pembayaran']['total_pembayaran']) }}</td>
            </tr>
        </table>

        <div class="footer">
            <p>Setelah pembayaran anda telah diterima kami akan melanjutkan proses pemasangan meteran baru anda.
                Terimakasih</p>
            <p><a href="{{ $data['link_pembayaran'] }}" class="btn">Klick Disini</a></p>
        </div>
    </div>
</body>

</html>
