import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Add,
    Cancel,
    Check,
    Delete,
    Edit,
    PlusOneSharp,
    Print,
    Water,
} from "@mui/icons-material";
import { FilledInput } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import { router } from "@inertiajs/react";

export default function Wilayah(props) {
    const wilayah = props.wilayah;
    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [model, setModel] = useState([null]);
    const editHandler = (value) => {
        setModel(value);
        setModalEdit(true);
    };
    const deleteHandler = (value) => {
        setModalDelete(true);
        setModel(value);
    };
    const onDeleteHandler = () => {
        router.delete(route("admin.wilayah-delete", { id: model.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setModalDelete(false);
                setModel(null);
            },
        });
    };
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "100px",
        },
        {
            name: "Kode Wilayah",
            selector: (row) => row.kode_wilayah,
            sortable: true,
            width: "150px",
        },
        {
            name: "Nama Wilayah",
            selector: (row) => row.nama_wilayah,
            sortable: true,
            width: "150px",
        },
        {
            name: "Total Kilometer",
            selector: (row) => row.pemasangan_baru_count,
            sortableing: true,
            width: "150px",
        },
        {
            name: "Deskripsi Wilayah",
            selector: (row) => row.deskripsi_wilayah,
            sortableing: true,
            width: "450px",
            wrap: true,
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
    return (
        <div className="py-2">
            <Modal
                title={"Form Penambahan Wilayah"}
                open={modalTambah}
                setOpen={setModalTambah}
            >
                <Form setOpen={setModalTambah} />
            </Modal>
            <Modal
                title={"Form Edit Wilayah"}
                open={modalEdit}
                setOpen={setModalEdit}
            >
                <Form
                    model={model}
                    setOpen={setModalEdit}
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
            <div className="shadow-md shadow-gray-900/20 dark:shadow-white/10 antialiased py-1 px-3 rounded-md">
                <div className={`grid grid-cols- md:grid-cols-3 gap-3 mb-3`}>
                    {wilayah.length > 0
                        ? wilayah.map((item, key) => (
                              <div
                                  key={key}
                                  className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                              >
                                  <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                                      <Water
                                          color="inherit"
                                          fontSize="inherit"
                                      />
                                  </div>
                                  <div className="text-right leading-relaxed">
                                      <p className="text-3xl font-bold">
                                          {item.pemasangan_baru_count}
                                      </p>
                                      <p className="text-xl font-light capitalize">
                                          {item.nama_wilayah}
                                      </p>
                                      <p className="text-sm font-light capitalize">
                                          (Kode : {item.kode_wilayah})
                                      </p>
                                  </div>
                              </div>
                          ))
                        : ""}
                </div>
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
                <div className="my-2">
                    <DataTable
                        pagination={wilayah.length > 20 ? true : false}
                        data={wilayah}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}

Wilayah.layout = (page) => (
    <AdminLayout children={page} title={"Data Wilayah"} />
);
