import CetakLayout from "@/Layouts/Cetak";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function Cetak(props) {
    const meteran = props.meteran;
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "No Meter",
            selector: (row, index) => row.no_meteran,
            width: "150px",
            wrap: true,
        },
        {
            name: "No Sambungan",
            selector: (row, index) => row.no_sambungan,
            width: "150px",
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row, index) => row.nama,

            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row, index) => row.alamat,

            wrap: true,
        },
        {
            name: "Blok",
            selector: (row, index) => row.blok,
            width: "100px",
            wrap: true,
        },
        {
            name: "Nama Golongan",
            selector: (row, index) =>
                row.nama_golongan + " " + row.nama_kelompok,

            wrap: true,
        },
        {
            name: "Tanggal Pemasangan",
            selector: (row, index) =>
                moment(row.tanggal_pemasangan).format("LL"),

            wrap: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <div
                    className={`${
                        row.status_meteran == "aktif"
                            ? "text-green-500"
                            : row.status_meteran == "non aktif"
                            ? "text-red-500"
                            : "text-orange-500"
                    }`}
                >
                    {row.status_meteran}
                </div>
            ),
            width: "150px",
            wrap: true,
        },
    ];
    return (
        <div>
            <div className="bg-white py-2 px-3 shadow-md shadow-gray-500/50">
                <DataTable data={meteran} columns={columns} dense />
            </div>
        </div>
    );
}

Cetak.layout = (page) => (
    <CetakLayout children={page} title={"Laporan Meteran Pelanggan"} />
);
