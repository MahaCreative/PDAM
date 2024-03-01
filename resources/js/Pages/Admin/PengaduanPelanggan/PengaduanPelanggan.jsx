import Filter from "@/Components/Filter";
import Select from "@/Components/Select";

import AdminLayout from "@/Layouts/AdminLayout";
import { FileCopyOutlined, Print } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function PengaduanPelanggan(props) {
    const pengaduan = props.pengaduan;
    const jenisPengaduan = props.jenisPengaduan;

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Judul",
            selector: (row) => row.judul_pengaduan,
            width: "150px",
            wrap: true,
        },
        {
            name: "Text",
            selector: (row) => row.text,
            width: "120px",
            wrap: true,
        },
        {
            name: "Nomor Handphone",
            selector: (row) => row.nomor_hp,
            width: "140px",
            wrap: true,
        },
        {
            name: "Alamat Pengaduan",
            selector: (row) => row.alamat,
            width: "140px",
            wrap: true,
        },
        {
            name: "Foto Pengaduan",
            selector: (row) =>
                row.foto ? (
                    <a href={"../storage/" + row.foto} target="blank">
                        <img
                            src={"/storage/" + row.foto}
                            className="w-[100px]"
                        />
                    </a>
                ) : (
                    <p>Tidak ada foto</p>
                ),
            width: "140px",
            wrap: true,
        },
        {
            name: "Status Dilihat",
            selector: (row) => row.status_dilihat,
            width: "140px",
            wrap: true,
        },
        {
            name: "Status pengaduan",
            selector: (row) => (
                <Select
                    classname={`${
                        row.status_pengaduan == "menunggu konfirmasi"
                            ? "bg-orange-500"
                            : row.status_pengaduan == "sedang di proses"
                            ? "bg-blue-500"
                            : row.status_pengaduan == "selesai"
                            ? "bg-blue-500"
                            : "bg-red-500"
                    }`}
                >
                    <option selected disabled>
                        {row.status_pengaduan}
                    </option>
                    <option value={""}>Pilih</option>
                    <option value={"sedang di proses"}>sedang di proses</option>
                    <option value={"ditolak"}>ditolak</option>
                    <option value={"selesai"}>selesai</option>
                </Select>
            ),
            width: "150px",
            wrap: true,
        },
    ];
    return (
        <div className="py-3">
            <div className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                    <FileCopyOutlined color="inherit" fontSize="inherit" />
                </div>
                <div className="text-right leading-relaxed">
                    <p className="text-3xl font-bold">44</p>
                    <p className="text-xl font-light capitalize">
                        Total Pengaduan
                    </p>
                    <p className="text-sm font-light capitalize">aaaaaaaaa</p>
                </div>
            </div>
            <div className="my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 gap-3">
                <div className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <FileCopyOutlined color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">44</p>
                        <p className="text-xl font-light capitalize">
                            Total Pengaduan
                        </p>
                        <p className="text-sm font-light capitalize">
                            Sedang Diproses
                        </p>
                    </div>
                </div>
                <div className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <FileCopyOutlined color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">44</p>
                        <p className="text-xl font-light capitalize">
                            Total Pengaduan
                        </p>
                        <p className="text-sm font-light capitalize">
                            Di Tolak
                        </p>
                    </div>
                </div>
                <div className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <FileCopyOutlined color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">44</p>
                        <p className="text-xl font-light capitalize">
                            Total Pengaduan
                        </p>
                        <p className="text-sm font-light capitalize">Selesai</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <button className="btn-warning flex gap-x-1 items-center">
                    <p>
                        <Print color="inerit" fontSize="inherit" />
                    </p>
                    <p>Cetak</p>
                </button>
                <Filter links={route("pelanggan.pengaduan-pelanggan")} />
            </div>
            <DataTable
                dense
                pagination
                highlightOnHover
                data={pengaduan}
                columns={columns}
            />
        </div>
    );
}
PengaduanPelanggan.layout = (page) => (
    <AdminLayout children={page} title={"Pengaduan"} />
);
