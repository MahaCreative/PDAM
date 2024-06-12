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
            name: "Nama Pelanggan",
            selector: (row) => row.meteran.nama,
            width: "150px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.meteran.alamat,
            width: "150px",
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pembayaran == "lunas"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {row.status_pembayaran}
                </p>
            ),
            width: "160px",
            wrap: true,
        },
        {
            name: "Golongan",
            selector: (row) =>
                row.meteran.nama_golongan + " " + row.meteran.nama_kelompok,
            width: "130px",
            wrap: true,
        },
        {
            name: "Meteran Awal",
            selector: (row) => (
                <>
                    <p>
                        Meter Awal :{row.meter_awal} m<sup>3</sup>
                    </p>
                    <p>
                        Meter Akhir :{row.meter_akhir} m<sup>3</sup>
                    </p>
                </>
            ),
            width: "180px",
            wrap: true,
        },

        {
            name: "Total Pemakaian",
            selector: (row) => (
                <p>
                    {row.meter_pemakaian} m<sup>3</sup>
                </p>
            ),
            width: "140px",
            wrap: true,
        },
        {
            name: "Nama petugas Pencatan",
            selector: (row) => <p>{row.nama_petugas_pencatat}</p>,
            width: "200px",
            wrap: true,
        },
        {
            name: "Periode Tagihan",
            selector: (row) => (
                <div className="">
                    {" "}
                    <p>{row.periode.periode_tagihan}</p>
                    <p>{row.status_pencatatan}</p>
                </div>
            ),
            width: "150px",
            wrap: true,
        },
        {
            name: "Tanggal Pencatan",
            selector: (row) => (
                <p>{moment(row.tanggal_pencatatan).format("LL")}</p>
            ),
            width: "150px",
            wrap: true,
        },
    ];
    return (
        <div>
            <div className="py-2 px-3 rounded-md shadow-sm shadow-gray-500/50">
                <DataTable data={meteran} columns={columns} pagination />
            </div>
        </div>
    );
}
Cetak.layout = (page) => (
    <CetakLayout children={page} title={"Laporan Pemakaian Air"} />
);
