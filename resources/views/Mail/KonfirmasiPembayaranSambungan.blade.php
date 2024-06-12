<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
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

        .content {
            padding: 20px;
        }

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

        <p>Hy, {{ $data['nama_pelanggan'] }}</p>
        @if ($data['status'] == 'pembayaran di terima')
            <p>Kami senang untuk memberitahu Anda bahwa bukti pembayaran sambungan baru yang Anda unggah telah berhasil
                diterima
                oleh petugas kami. </p>
        @else
            <p>
                Kami mohon untuk memberitahu Anda bahwa bukti pembayaran sambungan baru yang Anda unggah telah kami
                tolak, silahkan mengunggah bukti pembayaran baru melalui Link Dibawah Ini</p>
        @endif
        <p>Rincian bukti pembayaran:</p>
        <p>Kode : Permintaan {{ $data['kd_permintaan'] }}</p>
        <p>Tanggal Permintaan : {{ $data['created_at'] }}</p>
        <table>
            <tr>
                <th>Biaya Pendaftaran</th>
                <th>Biaya Perencanaan</th>
                <th>Biaya Pemasangan</th>
                <th>Biaya Instalasi</th>
                <th>Total Pembayaran</th>
            </tr>

            <tr>
                <td>{{ number_format($data['biaya_pendaftaran']) }}</td>
                <td>{{ number_format($data['biaya_pendaftaran']) }}</td>
                <td>{{ number_format($data['biaya_pemasangan']) }}</td>
                <td>{{ number_format($data['biaya_instalasi']) }}</td>
                <td>{{ number_format($data['total_pembayaran']) }}</td>
            </tr>
        </table>
        <p>Silahkan menunggu petugas datang kerumah anda untuk melakukan pemasangan Meteran Baru Dirumah anda.
            Terima
            Kasih
        </p>
        @if ($data['status'] == 'pembayaran di tolak')
            <p><a href="{{ $data['link_pembayaran'] }}" class="btn">Klick Disini</a></p>
        @endif
    </div>

</body>

</html>
