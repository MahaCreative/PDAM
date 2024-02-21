import Filter from "@/Components/Filter";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Add, Cancel, Check, Delete, Edit, Print } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

import SearchPemasanganBaru from "@/Components/SearchPemasanganBaru";
import { router } from "@inertiajs/react";
import Form from "./Form";

export default function PencatatanMeter(props) {
    const pencatatanMeter = props.pencatatanMeter;
    const roles = props.roles;
    const [model, setModel] = useState();
    const [modalPilihPemasangan, setModalPilihPemasangan] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [dataPemasangan, setDataPemasangan] = useState(null);
    const getDataPemasangan = (value) => {
        setDataPemasangan(value);
        setModalPilihPemasangan(false);
        setTimeout(() => {
            setModalTambah(true);
        }, 1000);
    };
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Tanggal Pencatatan",
            selector: (row) => row.tanggal_pencatatan,
            width: "120px",
            wrap: true,
        },
        {
            name: "Kode Sambungan",
            selector: (row) => row.pemasangan_baru.kode_pemasangan_baru,
            width: "120px",
            wrap: true,
        },
        {
            name: "Nomor Sambungan",
            selector: (row) => row.pemasangan_baru.no_sambungan,
            width: "120px",
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.pemasangan_baru.nama_pelanggan,
            width: "180px",
            wrap: true,
        },
        {
            name: "Alamat Pemasangan",
            selector: (row) => row.pemasangan_baru.alamat_pemasangan,
            width: "180px",
            wrap: true,
        },
        {
            name: (
                <div className="text-center w-full">
                    <p>Stand Meter Awal</p>
                    <p>Pemakaian</p>
                </div>
            ),
            selector: (row) => (
                <div>
                    <p>Awal : {row.stand_meter_awal + " m3"}</p>
                    <p className="border-b border-blue-500/50 ">
                        Pemakaian : {row.stand_meter_sekarang + " m3"}
                    </p>
                    <p className="font-bold">
                        Total Pemakaian : {row.total_pemakaian + " m3"}
                    </p>
                </div>
            ),
            width: "220px",
            wrap: true,
        },

        {
            name: "Nama Pencatat",
            selector: (row) => row.nama_petugas_pencatat,
            width: "150px",
            wrap: true,
        },
        {
            name: "Status Konfirmasi",
            selector: (row, index) =>
                roles == "admin" ? (
                    <select
                        key={index}
                        onChange={(e) =>
                            konfirmasiHandler(row.id, e.target.value)
                        }
                        className={`w-full border-none outline-none rounded-md  ${
                            row.status_diterima == "menunggu konfirmasi"
                                ? "bg-orange-500"
                                : "bg-green-500"
                        } text-white capitalize text-xs`}
                    >
                        <option
                            className="disabled:text-red-500 font-bold"
                            selected
                            disabled
                            value=""
                        >
                            {row.status_diterima}
                        </option>
                        <option value="menunggu konfirmasi">
                            Menunggu Konfirmasi
                        </option>
                        <option value="di setujui">Di Setujui</option>
                    </select>
                ) : (
                    row.status_diterima
                ),
            width: "220px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <>
                    {roles == "petugas lapangan" &&
                        row.status_diterima !== "di asetujui" && (
                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={() => deleteHandler(row)}
                                    className="btn-danger flex gap-x-1 items-center"
                                >
                                    <p>
                                        <Delete
                                            color="inerit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p>Delete</p>
                                </button>
                            </div>
                        )}
                    {roles !== "petugas lapangan" && (
                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => deleteHandler(row)}
                                className="btn-danger flex gap-x-1 items-center"
                            >
                                <p>
                                    <Delete color="inerit" fontSize="inherit" />
                                </p>
                                <p>Delete</p>
                            </button>
                        </div>
                    )}
                </>
            ),
            sortableing: true,
        },
    ];
    const konfirmasiHandler = (id, value) => {
        router.post(
            route("admin.konfirmasi-pencatatan-meter", {
                id: id,
                status_diterima: value,
            })
        );
    };

    const deleteHandler = (value) => {
        setModalDelete(true);
        setModel(value);
    };
    const onDeleteHandler = () => {
        router.delete(
            route("admin.pencatatan-meter-delete", { id: model.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setModalDelete(false);
                    setModel(null);
                },
            }
        );
    };
    return (
        <div>
            {/* Pilih Sambungan */}
            <Modal
                title={"Pilih Sambungan"}
                open={modalPilihPemasangan}
                setOpen={setModalPilihPemasangan}
            >
                <SearchPemasanganBaru onDataReceive={getDataPemasangan} />
            </Modal>

            <Modal
                title={"Pencatatan meter baru"}
                open={modalTambah}
                setOpen={setModalTambah}
            >
                <Form
                    setOpen={setModalTambah}
                    idPemasangan={dataPemasangan && dataPemasangan.id}
                />
            </Modal>
            {/* delete */}
            <Modal
                title={"Warning ..."}
                open={modalDelete}
                setOpen={setModalDelete}
            >
                <p>Apakah anda yakin ingin menghapus data ini ?</p>
                <p> semua data yang terkait akan terhapus juga</p>
                <div className="flex justify-end">
                    <div className="flex gap-x-3 items-center">
                        <button
                            onClick={onDeleteHandler}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Check color="inerit" fontSize="inherit" />
                            </p>
                            <p>Yakin</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setModel(null);
                                setModalDelete(false);
                            }}
                            className="btn-danger flex gap-x-1 items-center"
                        >
                            <p>
                                <Cancel color="inerit" fontSize="inherit" />
                            </p>
                            <p>Batalkan</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="shadow-md my-3 py-2 shadow-gray-900/20 dark:shadow-white/10 antialiased px-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-x-3">
                        <button
                            onClick={() => setModalPilihPemasangan(true)}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Tambah</p>
                        </button>
                        <button className="btn-warning flex gap-x-1 items-center">
                            <p>
                                <Print color="inerit" fontSize="inherit" />
                            </p>
                            <p>Cetak</p>
                        </button>
                    </div>
                    <Filter links={"admin.pencatatan-meter"} />
                </div>
                <div className="my-2">
                    <DataTable
                        pagination
                        highlightOnHover
                        striped
                        dense
                        data={pencatatanMeter}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}

PencatatanMeter.layout = (page) => (
    <AdminLayout children={page} title={"Pencatatan Meter"} />
);
