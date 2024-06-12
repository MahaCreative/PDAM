import InputUang from "@/Components/InputUang";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const tagihan = props.tagihan;
    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.meteran.nama,
            width: "170px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.meteran.alamat,
            width: "170px",
            wrap: true,
        },
        {
            name: "Blok",
            selector: (row) => row.meteran.blok,
            width: "70px",
            wrap: true,
        },
        {
            name: "Periode Tagihan",
            selector: (row) => row.pemakaian.periode.periode_tagihan,

            wrap: true,
        },
        {
            name: "Jumlah Pemakaian",
            selector: (row) => (
                <p>
                    {row.total_pemakaian} <sup>m3</sup>
                </p>
            ),

            wrap: true,
        },
        {
            name: "Total Tagihan",
            selector: (row) => (
                <InputUang
                    value={row.total_tagihan}
                    disabled
                    classname={"border-none"}
                />
            ),

            wrap: true,
        },
        {
            name: "Status Tunggakan",
            selector: (row) => row.status_tunggakan,

            wrap: true,
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) =>
                row.tanggal_pembayaran
                    ? moment(row.tanggal_pembayaran).format("LL")
                    : "Belum Ada Pembayaran",

            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => row.status_pembayaran,

            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div>
                    <Link
                        as="button"
                        href={route(
                            "pelanggan.show-tagihan-bulanan-saya",
                            row.id
                        )}
                        className="btn-primary"
                    >
                        Lihat Pembayaran
                    </Link>
                </div>
            ),
            wrap: true,
        },
    ];
    console.log(tagihan);

    return (
        <div className="py-6">
            <DataTable data={tagihan} columns={columns} pagination />
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Tagihan Pemakaian Air"} />
);
