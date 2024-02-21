import Filter from "@/Components/Filter";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Add, Print } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import moment from "moment";
import { format } from "date-fns";

export default function PermintaanSambunganBaru(props) {
    const [modalTambah, setModalTambah] = useState(false);
    const permintaan = props.permintaan;
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
            selector: (row) => row.status_permintaan,
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
    return (
        <div>
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Permintaan Sambungan Baru"}
            >
                <Form setOpen={setModalTambah} />
            </Modal>
            <div className="shadow-md my-3 py-2 shadow-gray-900/20 dark:shadow-white/10 antialiased px-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-x-3">
                        <button
                            onClick={() => setModalTambah(true)}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Tambah</p>
                        </button>
                    </div>
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
