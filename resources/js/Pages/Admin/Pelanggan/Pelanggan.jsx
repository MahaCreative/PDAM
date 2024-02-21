import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Add, Cancel, Check, Delete, Edit, Print } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import Filter from "@/Components/Filter";

export default function Pelanggan(props) {
    const pelanggan = props.pelanggan;
    const [model, setModel] = useState(null);
    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Kode Pelanggan",
            selector: (row) => row.kd_pelanggan,
            width: "170px",
        },
        {
            name: "Foto",
            selector: (row) => (
                <div>
                    <img
                        src={"./storage/" + row.foto}
                        alt=""
                        className="w-12 h-12 object-cover"
                    />
                </div>
            ),
            width: "80px",
        },
        {
            name: "KTP",
            selector: (row) => row.no_ktp,
            width: "170px",
            sortable: true,
        },
        {
            name: "Nama Lengkap",
            selector: (row) => row.nama_pelanggan,
            width: "200px",
            sortable: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            width: "200px",
            wrap: true,
        },
        {
            name: "Kecamatan",
            selector: (row) => row.kecamatan,
            width: "130px",
            wrap: true,
        },
        {
            name: "Telph",
            selector: (row) => row.no_telp,
            width: "170px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => editHandler(row)}
                        className="btn-warning flex gap-x-1 items-center"
                    >
                        <p>
                            <Edit color="inerit" fontSize="inherit" />
                        </p>
                        <p>Edit</p>
                    </button>
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
            ),
            sortableing: true,
        },
    ];
    const editHandler = (value) => {
        setModalEdit(true);
        setModel(value);
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    const onDeleteHandler = () => {
        router.delete(route("admin.data-pelanggan-delete", { id: model.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setModalDelete(false);
                setModel(null);
            },
        });
    };
    return (
        <div>
            <Modal
                title={"Form Penambahan Pelanggan"}
                open={modalTambah}
                setOpen={setModalTambah}
            >
                <Form setOpen={setModalTambah} />
            </Modal>
            <Modal
                title={"Form Edit Pelanggan"}
                open={modalEdit}
                setOpen={setModalEdit}
            >
                <Form
                    setOpen={setModalEdit}
                    model={model}
                    setModel={setModel}
                />
            </Modal>
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
                            onClick={() => setModalTambah(true)}
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
                    <Filter links={"admin.data-pelanggan"} />
                </div>
                <div className="my-2">
                    <DataTable
                        pagination
                        highlightOnHover
                        striped
                        dense
                        data={pelanggan}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}
Pelanggan.layout = (page) => (
    <AdminLayout children={page} title={"Data Pelanggan"} />
);
