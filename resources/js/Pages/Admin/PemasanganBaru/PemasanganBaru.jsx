import Filter from "@/Components/Filter";
import Modal from "@/Components/Modal";

import AdminLayout from "@/Layouts/AdminLayout";
import {
    Add,
    Cancel,
    Check,
    Delete,
    Edit,
    Print,
    RemoveRedEye,
} from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import SearchPelanggan from "@/Components/SearchPelanggan";
import { Link, router } from "@inertiajs/react";
import FormEdit from "./FormEdit";
import ShowPemasanganBaru from "./ShowPemasanganBaru";
import Select from "@/Components/Select";
import Input from "@/Components/Input";

export default function PemasanganBaru(props) {
    const pemasanganBaru = props.pemasanganBaru;
    const roles = props.roles;
    const [idPelanggan, setIdPelanggan] = useState([]);
    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalPilihPelanggan, setModalPilihPelanggan] = useState(false);
    const [modalPetugas, setModalPetugas] = useState(false);
    const [namaPetugas, setNamaPetugas] = useState({
        namaPetugas: "",
        idPemasangan: "",
        value: "",
    });
    const [model, setModel] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.nama_pelanggan,
            width: "170px",
        },
        {
            name: "Kode Pemasangan",
            selector: (row) => row.kode_pemasangan_baru,
            width: "170px",
        },
        {
            name: "Nomor Sambungan",
            selector: (row) => row.no_sambungan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat_pemasangan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Golongan / Kelompok",
            selector: (row) => row.nama_golongan + " / " + row.nama_kelompok,
            width: "170px",
            wrap: true,
        },
        {
            name: "Tanggal Pemasangan",
            selector: (row) => row.tgl_pemasangan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Pipa Diameter",
            selector: (row) => row.pipa_diameter + "Inch",
            width: "170px",
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => row.status_pembayaran,
            width: "170px",
            wrap: true,
        },
        {
            name: "Status Pemasangan",
            selector: (row) =>
                row.status_pembayaran == "lunas" ? (
                    <select
                        onChange={(e) =>
                            konfirmasiPemasangan(e.target.value, row.id)
                        }
                        className={`w-full border-none outline-none rounded-md  ${
                            row.status_pemasangan == "selesai"
                                ? "bg-green-500"
                                : "bg-orange-500"
                        } text-white capitalize text-xs`}
                    >
                        <option selected disabled value={row.status_pemasangan}>
                            {row.status_pemasangan}
                        </option>
                        <option value="menunggu pengecekan">
                            menunggu pengecekan
                        </option>
                        <option value="proses pemasangan">
                            proses pemasangan
                        </option>
                        {row.status_pemasangan == "proses pemasangan" && (
                            <option value="selesai">Pemasangan Selesai</option>
                        )}
                    </select>
                ) : (
                    <p>{row.status_pemasangan}</p>
                ),
            width: "170px",
            wrap: true,
        },
        {
            name: "Nama Petugas Pemasangan",
            selector: (row) =>
                row.nama_petugas_yang_menangani
                    ? row.nama_petugas_yang_menangani
                    : "Belum ditangani",
            width: "170px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => showHandler(row)}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <RemoveRedEye
                                    color="inerit"
                                    fontSize="inherit"
                                />
                            </p>
                            <p>Lihat Rincian</p>
                        </button>
                        {row.status_pembayaran != "lunas" && (
                            <button
                                onClick={() => editHandler(row)}
                                className="btn-warning flex gap-x-1 items-center"
                            >
                                <p>
                                    <Edit color="inerit" fontSize="inherit" />
                                </p>
                                <p>Edit</p>
                            </button>
                        )}
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
                </div>
            ),
            sortableing: true,
        },
    ];
    const konfirmasiPermintaan = (value, id) => {
        router.post(route("admin.konfirmasi-permintaan"), {
            id: id,
            data: value,
        });
    };
    const showHandler = (value) => {
        setModel(value);
        setModalShow(true);
    };
    const editHandler = (value) => {
        setModalEdit(true);
        setModel(value);
        setIdPelanggan(value);
        console.log(value);
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    const onDeleteHandler = () => {
        router.delete(route("admin.pemasangan-baru-delete", { id: model.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setModalDelete(false);
                setModel(null);
            },
        });
    };
    const handleData = (value) => {
        setIdPelanggan(value);
        setModalPilihPelanggan(false);
        setTimeout(() => {
            setModalTambah(true);
        }, 300);
    };
    const konfirmasiPemasangan = (value, id) => {
        if (value == "proses pemasangan") {
            setModalPetugas(true);
            setNamaPetugas({ ...namaPetugas, value: value, idPemasangan: id });
        }
        router.post(route("admin.konfirmasi-pemasangan"), {
            idPemasangan: id,
            value: value,
        });
    };
    const submitPemasangan = () => {
        router.post(route("admin.konfirmasi-pemasangan"), namaPetugas, {
            onSuccess: () => {
                setNamaPetugas({
                    ...namaPetugas,
                    value: "",
                    idPemasangan: "",
                    namaPetugas: "",
                });
                setModalPetugas(false);
            },
        });
    };
    console.log(model);
    return (
        <div>
            <Modal
                title={"Isi nama petugas lapangan yang melakukan pemasangan"}
                open={modalPetugas}
                setOpen={setModalPetugas}
            >
                <Input
                    title={"Nama Petugas"}
                    onChange={(e) =>
                        setNamaPetugas({
                            ...namaPetugas,
                            namaPetugas: e.target.value,
                        })
                    }
                />
                <div className="flex justify-end my-3">
                    <div className="flex gap-x-3 items-center">
                        <button
                            onClick={submitPemasangan}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>{"Tambah"}</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setModalPetugas(false)}
                            className="btn-danger flex gap-x-1 items-center"
                        >
                            <p>
                                <Cancel color="inerit" fontSize="inherit" />
                            </p>
                            <p>Cancell</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                title={"Tambah Pemasangan Baru"}
                open={modalPilihPelanggan}
                setOpen={setModalPilihPelanggan}
            >
                <SearchPelanggan onDataReceive={handleData} />
            </Modal>
            {/* tamba */}
            <Modal
                title={"Tambah Pemasangan Baru"}
                open={modalTambah}
                setOpen={setModalTambah}
            >
                <Form dataPelanggan={idPelanggan} setOpen={setModalTambah} />
            </Modal>
            {/* edit */}
            <Modal
                title={"Edit Pemasangan Baru"}
                open={modalEdit}
                setOpen={setModalEdit}
            >
                <FormEdit model={model} setOpen={setModalEdit} />
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
            <Modal
                title={`Lihat Data Pemasangan ${
                    model && model.kode_pemasangan_baru
                }`}
                open={modalShow}
                setOpen={setModalShow}
            >
                <ShowPemasanganBaru id={model && model.id} />
            </Modal>
            <div className="shadow-md my-3 py-2 shadow-gray-900/20 dark:shadow-white/10 antialiased px-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-x-3">
                        <button
                            onClick={() => setModalPilihPelanggan(true)}
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
                    <Filter links={"admin.pemasangan-baru"} />
                </div>
                <div className="my-2">
                    <DataTable
                        pagination
                        highlightOnHover
                        striped
                        dense
                        data={pemasanganBaru}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}

PemasanganBaru.layout = (page) => (
    <AdminLayout children={page} title={"Pemasangana Baru"} />
);
