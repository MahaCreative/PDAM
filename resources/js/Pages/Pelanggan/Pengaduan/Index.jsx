import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const pengaduan = props.pengaduan;
    const columns = [
        {
            name: "#",
            selector: (row, id) => id + 1,
            width: "60px",
        },
        {
            name: "Kode Pengaduan",
            selector: (row) => row.kd_pengaduan,
            width: "150px",
        },
        {
            name: "Tanggal Pengaduan",
            selector: (row) => moment(row.tanggal_pengaduan).format("LL"),
            width: "160px",
        },
        {
            name: "Jenis Pengaduan",
            selector: (row) => row.jenis_pengaduan.jenis_pengaduan,
            width: "160px",
            wrap: true,
        },
        {
            name: "Nama Pelapor",
            selector: (row) => row.nama_pelapor,
            width: "160px",
            wrap: true,
        },
        {
            name: "Tanggal Di Proses",
            selector: (row) =>
                row.tanggal_proses_pengaduan
                    ? row.tanggal_proses_pengaduan
                    : "Belum Di Proses",
            width: "160px",
            wrap: true,
        },
        {
            name: "Petugas Menangani",
            selector: (row) =>
                row.nama_petugas_menangani
                    ? row.nama_petugas_menangani
                    : "Belum Di Proses",
            width: "160px",
            wrap: true,
        },
        {
            name: "Status Konfirmasi",
            selector: (row) => row.status_konfirmasi,
            width: "160px",
            wrap: true,
        },
        {
            name: "Status Pengaduan",
            selector: (row) => row.status,
            width: "160px",
            wrap: true,
        },
        {
            name: "Lihat Pengaduan",
            selector: (row) => (
                <Link
                    href={route(
                        "pelanggan.show-pengaduan-pelanggan",
                        row.kd_pengaduan
                    )}
                    className="btn-primary"
                    as="button"
                >
                    Lihat Pengaduan
                </Link>
            ),
            width: "160px",
            wrap: true,
        },
    ];
    return (
        <div className="py-6">
            <div className="my-3 ">
                <Link
                    href={route("pelanggan.buat-pengaduan-pelanggan")}
                    as="button"
                    className="btn-primary"
                >
                    Buat Pengaduan
                </Link>
            </div>
            <DataTable data={pengaduan} columns={columns} />
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title="Pengaduan Pelanggan" />
);
