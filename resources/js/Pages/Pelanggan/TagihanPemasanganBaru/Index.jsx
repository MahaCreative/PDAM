import InputUang from "@/Components/InputUang";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const sambungan = props.sambungan;
    const column = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Kode Permintaan",
            selector: (row) => row.permintaan.kd_pendaftaran,
        },
        {
            name: "Tanggal Permintaan",
            selector: (row) =>
                moment(row.permintaan.kd_pendaftaran).format("LL"),
        },
        {
            name: "Nama Pendaftar",
            selector: (row) =>
                moment(row.permintaan.nama_pendaftar).format("LL"),
        },
        {
            name: "Alamat Rumah Pemasangan",
            selector: (row) =>
                moment(row.permintaan.alamat_pemasangan).format("LL"),
        },
        {
            name: "Total Tagihan",
            selector: (row) => (
                <InputUang
                    value={row.total_biaya}
                    disabled
                    classname={"border-none"}
                />
            ),
        },
        {
            name: "Aksi",
            selector: (row) => (
                <Link
                    className=" btn-primary rounded-md"
                    href={route(
                        "pelanggan.pembayaran-sambungan-baru",
                        row.permintaan.id
                    )}
                >
                    Lihat Atau Bayar Tagihan
                </Link>
            ),
        },
    ];
    return (
        <div className="py-6">
            <div className="my-3 py-1 px-3 rounded-md bg-blue-200">
                <p>
                    Silahkan melakukan pembayaran sambungan lalu upload bukti
                    pembayaran anda, untuk proses pemasangan meteran baru
                    dirumah anda
                </p>
            </div>
            <div className="bg-white py-2 px-3 rounded-md shadow-sm shadow-gray-500/50">
                {sambungan.length > 0 ? (
                    <DataTable data={sambungan} columns={column} />
                ) : (
                    <div>
                        <p>Anda Tidak memiliki tagihan sambungan baru</p>
                    </div>
                )}
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Tagihan Pemasangan Baru"} />
);
