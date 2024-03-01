import Filter from "@/Components/Filter";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Add, Print } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

import moment from "moment";
import { format } from "date-fns";
import Select from "@/Components/Select";
import Form from "./Form";

export default function PermintaanSambunganBaru(props) {
    const permintaan = props.permintaan;
    const [modalProses, setModalProses] = useState(false);
    const [model, setModel] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Tanggal Permintaan",
            selector: (row) => moment(row.created_at).format("d-m-y"),
            width: "120px",
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.pelanggan.nama_pelanggan,
            width: "140px",
        },
        {
            name: "Nomor Telph",
            selector: (row) => row.no_telph,
            width: "140px",
        },
        {
            name: "Alamat Pemasangan",
            selector: (row) => row.alamat_pemasangan,
            width: "180px",
            wrap: true,
        },
        {
            name: "Foto KK",
            selector: (row) => <img src={"storage/" + row.foto_kk} />,
            width: "100px",
        },
        {
            name: "Foto KTP",
            selector: (row) => <img src={"storage/" + row.foto_ktp} />,
            width: "100px",
        },
        {
            name: "Foto Rekening Tetangga",
            selector: (row) => (
                <img src={"storage/" + row.foto_rekening_air_tetangga} />
            ),
            width: "100px",
        },
        {
            name: "Status Permintaan",
            selector: (row) => (
                <Select onChange={(e) => changeHandler(row, e.target.value)}>
                    <option selected value={row.status_permintaan}>
                        {row.status_permintaan}
                    </option>
                    {row.status_permintaan == "menunggu konfirmasi" && (
                        <>
                            <option value="pengajuan diterima">
                                pengajuan diterima
                            </option>
                            <option value="pengajuan selesai">
                                pengajuan selesai
                            </option>
                        </>
                    )}
                    {row.status_permintaan == "pengajuan diterima" && (
                        <>
                            <option value="pengajuan selesai">
                                pengajuan selesai
                            </option>
                        </>
                    )}
                </Select>
            ),
            width: "190px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 w-full">
                    {row.status_permintaan == "menunggu konfirmasi" && (
                        <button className="btn-danger ">Delete</button>
                    )}
                </div>
            ),
        },
    ];
    const changeHandler = (value, e) => {
        console.log(e);
        if (e == "pengajuan diterima") {
            setModel(value);
            setModalProses(true);
        }
    };
    return (
        <div>
            <Modal
                open={modalProses}
                setOpen={setModalProses}
                title={"Proses Pengajuan"}
            >
                <Form dataPelanggan={model} />
            </Modal>
            <div className="shadow-md my-3 py-2 shadow-gray-900/20 dark:shadow-white/10 antialiased px-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-x-3">
                        <button className="btn-warning flex gap-x-1 items-center">
                            <p>
                                <Print color="inerit" fontSize="inherit" />
                            </p>
                            <p>Cetak</p>
                        </button>
                    </div>
                    <Filter links={"admin.pengajuan-pemasangan-baru"} />
                </div>
                <div className="my-2 capitalize">
                    <DataTable
                        pagination
                        highlightOnHover
                        striped
                        dense
                        data={permintaan}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}

PermintaanSambunganBaru.layout = (page) => (
    <AdminLayout children={page} title={"Permintaan sambungan baru"} />
);
