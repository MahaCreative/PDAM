import Filter from "@/Components/Filter";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Cancel,
    Check,
    Delete,
    Print,
    RemoveRedEye,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DetailTagihan from "./DetailTagihan";
import FormPembayaran from "./FormPembayaran";

export default function TagihanBulanan(props) {
    const tagihanBulanan = props.tagihanBulanan;
    const [modalDelete, setModalDelete] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [model, setModel] = useState(null);
    const [idForm, setIdForm] = useState("");
    const roles = props.roles;
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: (
                <div className="text-center w-full font-bold">
                    <p>Kode Sambungan</p>
                    <p>Nomor Sambungan</p>
                </div>
            ),
            selector: (row) => (
                <div className="text-center">
                    <p>{row.kode_sambungan}</p>
                    <p>{row.no_sambungan}</p>
                </div>
            ),
            width: "200px",
            wrap: "true",
        },
        {
            name: "Wilayah",
            selector: (row) => row.wilayah.nama_wilayah,
            width: "110px",
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => row.nama_pelanggan,
            width: "175px",
            wrap: true,
        },
        {
            name: "Periode Tagihan",
            selector: (row) => row.periode_tagihan,
            width: "145px",
            wrap: true,
        },

        {
            name: "Total Pemakaian",
            selector: (row) => row.total_pemakaian,
            width: "143px",
            wrap: "true",
        },
        {
            name: "Status Pembayaran",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pembayaran == "belum dibayar"
                            ? "text-red-500"
                            : ""
                    }`}
                >
                    {row.status_pembayaran}
                </p>
            ),
            width: "158px",
            wrap: "true",
        },
        {
            name: "Status Tunggakan",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pembayaran == "menunggak"
                            ? "text-red-500"
                            : ""
                    }`}
                >
                    {row.status_tunggakan}
                </p>
            ),
            width: "158px",
            wrap: "true",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => showHandler(row)}
                        className="btn-primary flex gap-x-1 items-center"
                    >
                        <p>
                            <RemoveRedEye color="inerit" fontSize="inherit" />
                        </p>
                        <p>Lihat Rincian</p>
                    </button>
                </div>
            ),
        },
    ];

    const showHandler = (value) => {
        setModel(value);
        setModalShow(true);
    };
    const deleteHandler = (value) => {};

    const [modalForm, setModalForm] = useState(false);
    const getData = (value) => {
        setModalShow(false);
        setModalForm(true);
        setIdForm(value);
    };

    return (
        <div>
            <Modal
                title={"Form Pembayaran"}
                open={modalForm}
                setOpen={setModalForm}
            >
                <FormPembayaran idForm={idForm} setOpen={setModalForm} />
            </Modal>
            {/* Show */}
            <Modal
                title={"Lihat Rincian Tagihan"}
                setOpen={setModalShow}
                open={modalShow}
            >
                <DetailTagihan
                    onDataReceive={getData}
                    model={model}
                    setModel={setModel}
                    setOpen={setModalShow}
                />
            </Modal>

            <div className="shadow-md my-3 py-2 shadow-gray-900/20 dark:shadow-white/10 antialiased px-3 rounded-md">
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-x-3">
                        {/* <button
                            onClick={() => setModalPilihPelanggan(true)}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Tambah</p>
                        </button> */}
                        <button className="btn-warning flex gap-x-1 items-center">
                            <p>
                                <Print color="inerit" fontSize="inherit" />
                            </p>
                            <p>Cetak</p>
                        </button>
                    </div>
                    <Filter links={"admin.tagihan-bulanan"} />
                </div>
                <div className="my-2">
                    <DataTable
                        pagination
                        highlightOnHover
                        striped
                        dense
                        data={tagihanBulanan}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
}

TagihanBulanan.layout = (page) => (
    <AdminLayout children={page} title={"Tagihan bulanan"} />
);
