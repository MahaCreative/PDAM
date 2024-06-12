import InputUang from "@/Components/InputUang";
import AdminLayout from "@/Layouts/AdminLayout";
import { Payment, Water } from "@mui/icons-material";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import DataTable from "react-data-table-component";

export default function Dashboard(props) {
    const tagihan = props.tagihan;
    const user = props.user;
    const total = props.total;
    const columns = [
        {
            name: "#",
            selector: (row, id) => id + 1,
            width: "60px",
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => (
                <div>
                    <p>{row.meteran.nama}</p>
                    <p>No Sam: {row.meteran.no_sambungan}</p>
                    <p>No Met: {row.meteran.no_meteran}</p>
                </div>
            ),
        },
        {
            name: "Alamat",
            selector: (row) => row.meteran.alamat,
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
            selector: (row) => row.periode.periode_tagihan,

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
    ];
    return (
        <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            {user.meteran.length}
                        </p>
                        <p className="text-xl font-light capitalize">
                            Jumlah Meteran Anda
                        </p>
                    </div>
                </div>
                <div className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Payment color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">{tagihan.length}</p>
                        <p className="text-xl font-light capitalize">
                            Jumlah Tagihan Belum Lunas
                        </p>
                    </div>
                </div>
                <div className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Payment color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            <CurrencyInput
                                value={total}
                                prefix="Rp. "
                                className="bg-inherit border-none text-right text-xl"
                                disabled
                            />
                        </p>
                        <p className="text-xl font-light capitalize">
                            Total Tagihan Anda
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-3">
                <DataTable
                    data={tagihan}
                    columns={columns}
                    dense
                    highlightOnHover
                />
            </div>
        </div>
    );
}
Dashboard.layout = (page) => (
    <AdminLayout children={page} title={"Dashboard"} />
);
