import Select from "@/Components/Select";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function ShowPemasanganBaru({ id }) {
    const [data, setData] = useState(null);
    const [menu, setMenu] = useState("informasi sambungan");
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
        {
            name: "Total Biaya",
            selector: (row) => row.tagihan_pemasangan.status_pembayaran,
            width: "210px",
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
    const columnsInvoices = [
        {
            name: "Tanggal Pembayaran",
            selector: (row) => moment(row.created_at).format("y-m-d"),
            width: "120px",
        },
        {
            name: "Rekening PDAM",
            selector: (row) =>
                row.payment_type == "pembayaran transfer" ? (
                    <div>
                        <p>Nama Bank : {row.payment_info.nama_bank_pdam}</p>
                        <p>Atas Nama : {row.payment_info.nama_rek_pdam}</p>
                        <p>Nomor Rekening : {row.payment_info.no_rek_pdam}</p>
                    </div>
                ) : (
                    <div>Kosong</div>
                ),
            width: "300px",
        },
        {
            name: "Data Pengirim",
            selector: (row) =>
                row.payment_type == "pembayaran transfer" ? (
                    <div>
                        <p>Nama Bank : {row.payment_info.nama_bank_pengirim}</p>
                        <p>Atas Nama : {row.payment_info.nama_rek_pengirim}</p>
                        <p>
                            Nomor Rekening : {row.payment_info.no_rek_pengirim}
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>Nama Penerima : {row.payment_info.nama_penerima}</p>
                        <p>Atas Nama : {row.payment_info.nama_pembayar}</p>
                        <p>Nomor Rekening : -</p>
                    </div>
                ),
            width: "250px",
        },
        {
            name: "Bukti Transfer",
            selector: (row) =>
                row.payment_type == "pembayaran transfer" ? (
                    <div>
                        <a
                            href={
                                "storage/" + row.payment_info.bukti_pembayaran
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="w-[100px]"
                                src={
                                    "storage/" +
                                    row.payment_info.bukti_pembayaran
                                }
                                alt=""
                            />
                        </a>
                    </div>
                ) : (
                    <div>Pembayaran dilakukan di kantor</div>
                ),
            width: "100px",
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) =>
                row.status_pembayaran !== "di terima" ? (
                    <Select
                        onChange={(e) => changeHandler(e.target.value, row.id)}
                    >
                        <option value={row.status_pembayaran} selected disabled>
                            {row.status_pembayaran}
                        </option>
                        <option value={"di terima"}>Diterima</option>
                        <option value={"di tolak"}>Ditolak</option>
                    </Select>
                ) : (
                    <p
                        className={
                            row.status_pembayaran == "di terima"
                                ? "text-green-500"
                                : "text-red-500"
                        }
                    >
                        {row.status_pembayaran}
                    </p>
                ),
            width: "170px",
            wrap: true,
        },
        {
            name: "Petugas Menerima",
            selector: (row) => row.petugas_menerima,
            width: "180px",
        },
    ];

    const columnRincianPenggunaanAir = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Tanggal Pencatatan",
            selector: (row) => row.tanggal_pencatatan,
            width: "170px",
        },
        {
            name: "Stand Meter Awal",
            selector: (row) => row.stand_meter_awal + " m3",
            width: "155px",
        },
        {
            name: "Stand Meter Akhir",
            selector: (row) => row.stand_meter_sekarang + " m3",
            width: "155px",
        },
        {
            name: "Stand Meter Akhir",
            selector: (row) => row.total_pemakaian + " m3",
            width: "155px",
        },
        {
            name: "0 - 10 m3",
            selector: (row) => row.pemakaian_10 + " m3",
            width: "130px",
        },
        {
            name: "11 - 20 m3",
            selector: (row) => row.pemakaian_20 + " m3",
            width: "130px",
        },
        {
            name: "21 - 30 m3",
            selector: (row) => row.pemakaian_30 + " m3",
            width: "130px",
        },
        {
            name: " > 30 m3",
            selector: (row) => row.pemakaian_30_keatas + " m3",
            width: "130px",
        },
    ];

    if (!data) {
        // Tampilkan pesan atau loading spinner jika data belum tersedia
        return <p>Loading...</p>;
    }
    const changeHandler = (value, id) => {
        router.get(route("admin.konfirmasi-pembayaran-pemasangan", id), {
            data: value,
        });
    };
    return (
        <div>
            <div className="bg-gray-200 py-1 5 px-3 rounded-md">
                <p className="font-bold">Detail Pemasangan Baru</p>
                <p>Nama Pemasang : {data[0].nama_pelanggan}</p>
                <p>Kode Pemasangan : {data[0].kode_pemasangan_baru}</p>
                <p>Nomor Pemasangan : {data[0].no_sambungan}</p>
                <p>Tgl Pemasangan : {data[0].tgl_pemasangan}</p>
                <p>Status Pemasangan : {data[0].status_pemasangan}</p>
            </div>
            <div className="flex gap-3 items-center my-2">
                <button
                    onClick={() => setMenu("informasi sambungan")}
                    className={`${
                        menu == "informasi sambungan"
                            ? "bg-blue-500 text-white"
                            : ""
                    } py-1 px-2 w-[150px] text-xs `}
                >
                    {" "}
                    Informasi Sambungan
                </button>
                <button
                    onClick={() => setMenu("informasi pemakaian")}
                    className={`${
                        menu == "informasi pemakaian"
                            ? "bg-blue-500 text-white"
                            : ""
                    } py-1 px-2 w-[150px] text-xs `}
                >
                    Informasi Pemakaian Air
                </button>
                <button
                    onClick={() => setMenu("informasi tagihan air")}
                    className={`${
                        menu == "informasi tagihan air"
                            ? "bg-blue-500 text-white"
                            : ""
                    } py-1 px-2 w-[150px] text-xs `}
                >
                    Informasi Tagihan Air
                </button>
            </div>
            <div className={`${menu == "informasi sambungan" ? "" : "hidden"}`}>
                <div className="my-1">
                    <DataTable
                        title="Tabel Tarif Permeter"
                        columns={columns2}
                        data={data}
                    />
                </div>

                <div className="my-1">
                    <DataTable
                        title="Tabel Biaya Pemasangan"
                        columns={columns}
                        data={data}
                    />
                </div>

                {data[0].tagihan_pemasangan.invoices == null ? (
                    <div className="bg-red-500 py-2 px-4 rounded-md my-2">
                        <div>
                            <p className="text-white text-xs">
                                Silakan tekan tombol dibawah ini jika pembayaran
                                telah diterima
                                <Link
                                    href={route(
                                        "admin.pembayaran-pemasangan",
                                        id
                                    )}
                                    className=" font-semibold text-base"
                                >
                                    {" "}
                                    Telah Menerima Pembayaran
                                </Link>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="my-1">
                        <p className="text-xs py-1 px-2 rounded-md bg-red-500 text-white animate-bounce">
                            jika status pembayaran ditolak silahkan hapus data
                            pembayaran dan lakukan pengajuan ulang
                        </p>
                        <DataTable
                            title="Tabel Pembayaran"
                            columns={columnsInvoices}
                            data={[data[0].tagihan_pemasangan.invoices]}
                        />
                    </div>
                )}
            </div>
            {/* kopi ini */}
            <div className={`${menu == "informasi pemakaian" ? "" : "hidden"}`}>
                <div className="my-1">
                    {data[0].pencatatan_meter.length > 0 ? (
                        <DataTable
                            pagination
                            columns={columnRincianPenggunaanAir}
                            data={data[0].pencatatan_meter}
                            title="Rincian Penggunaan Air"
                        />
                    ) : (
                        <p className="text-xs py-1 px-2 rounded-md bg-red-500 text-white animate-bounce">
                            Belum ada data pemakaian air
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
