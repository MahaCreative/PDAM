import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function ShowPemasanganBaru({ id }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`api/lihat-pemasangan-baru/${id}`);
                const result = await response.json();
                setData([result]); // Bungkus data dalam array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        {
            name: "Uang Pendaftaran",
            selector: (row) => row.tagihan_pemasangan.uang_pendaftaran,
        },
        {
            name: "Biaya Perencanaan",
            selector: (row) => row.tagihan_pemasangan.biaya_perencanaan,
        },
        {
            name: "Biaya Pemasangan",
            selector: (row) => row.tagihan_pemasangan.biaya_pemasangan,
        },
        {
            name: "Biaya Instalasi",
            selector: (row) => row.tagihan_pemasangan.biaya_instalasi,
        },
        {
            name: "Total iaya",
            selector: (row) => row.tagihan_pemasangan.total_biaya,
        },
    ];
    const columns2 = [
        { name: "Wilayah", selector: (row) => row.wilayah.nama_wilayah },
        { name: "Golongan", selector: (row) => row.nama_golongan },
        { name: "Kelompok", selector: (row) => row.nama_kelompok },
        { name: "0 - 10 m3", selector: (row) => row.harga_tarif.tarif1 },
        { name: "11 - 20 m3", selector: (row) => row.harga_tarif.tarif2 },
        { name: "21 - 30 m3", selector: (row) => row.harga_tarif.tarif3 },
        { name: "> 30 m3", selector: (row) => row.harga_tarif.tarif4 },
    ];

    if (!data) {
        // Tampilkan pesan atau loading spinner jika data belum tersedia
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className="bg-gray-200 py-1 5 px-3 rounded-md">
                <p className="font-bold">Detail Pemasangan Baru</p>
                <p>Nama Pemasang : {data[0].nama_pelanggan}</p>
                <p>Kode Pemasangan : {data[0].kode_pemasangan_baru}</p>
                <p>Nomor Pemasangan : {data[0].no_sambungan}</p>
                <p>Tgl Pemasangan : {data[0].tgl_pemasangan}</p>
            </div>
            <div className="my-3">
                <DataTable
                    title="Tabel Tarif Permeter"
                    columns={columns2}
                    data={data}
                />
            </div>
            <div className="my-3">
                <DataTable
                    title="Tabel Biaya Pemasangan"
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}
