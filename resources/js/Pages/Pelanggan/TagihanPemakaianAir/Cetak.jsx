import CetakLayout from "@/Layouts/Cetak";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function Cetak(props) {
    const tagihan = props.tagihan;
    const columns = [
        {
            name: "Nomor Meter",
            selector: (row) => (
                <div>
                    <p>No Meter: {row.tagihan.meteran.no_meteran}</p>
                    <p>No Sambungan: {row.tagihan.meteran.no_sambungan}</p>
                </div>
            ),
            width: "190px",
        },

        {
            name: "Periode Tagihan",
            selector: (row) => row.tagihan.periode.periode_tagihan,
            width: "150px",
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) => moment(row.created_at).format("LL"),
            width: "170px",
        },

        {
            name: "Data Bank PDAM",
            selector: (row) => (
                <div>
                    <p>Bank: {row.bank_pdam}</p>
                    <p>Nama: {row.nama_pdam}</p>
                    <p>Rek: {row.rek_pdam}</p>
                </div>
            ),
            width: "230px",
            wrap: true,
        },
        {
            name: "Data Pengirim",
            selector: (row) => (
                <div>
                    <p>Bank: {row.bank_pengirim}</p>
                    <p>Nama: {row.nama_pengirim}</p>
                    <p>Rek: {row.no_rek_pengirim}</p>
                </div>
            ),
            width: "230px",
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => <div>{row.status_pembayaran}</div>,
            wrap: true,
        },
        {
            name: "Nama Petugas Konfirmasi",
            selector: (row) => <div>{row.nama_petugas_konfirmasi}</div>,
        },
    ];
    return (
        <div>
            <div className="py-1 px-2 shadow-sm shadow-gray-500/50 rounded-md">
                <DataTable data={tagihan} columns={columns} />
            </div>
        </div>
    );
}
Cetak.layout = (page) => (
    <CetakLayout
        children={page}
        title={"Laporan Bukti Pembayaran Tagihan Air"}
    />
);
