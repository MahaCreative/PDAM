import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Input from "./Input";
import { Add, Check } from "@mui/icons-material";
import Modal from "./Modal";
import Form from "@/Pages/Admin/Pelanggan/Form";

export default function SearchPelanggan({ ...props }) {
    const [modalTambah, setModalTambah] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/data-pelanggan?cari=${search}`
            );
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <button
                    onClick={() => kirimDataToParent(row)}
                    className="btn-primary flex gap-2 items-center"
                >
                    <span>
                        <Check color="inherit" fontSize="inherit" />
                    </span>
                    <span>Pilih</span>
                </button>
            ),
            width: "170px",
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
            name: "Telph",
            selector: (row) => row.no_telp,
            width: "170px",
        },
    ];

    const kirimDataToParent = (value) => {
        props.onDataReceive(value);
    };
    return (
        <div className="my-2">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Tambah Pelanggan"}
            >
                <Form setOpen={setModalTambah} />
            </Modal>
            <div className="flex justify-between my-2 items-center gap-3 text-sm">
                <button
                    onClick={() => setModalTambah(true)}
                    className="btn-primary flex gap-x-1 items-center"
                >
                    <p>
                        <Add color="inerit" fontSize="inherit" />
                    </p>
                    <p>Tambah</p>
                </button>
                <p>Cari Pelanggan</p>
                <Input
                    placeholder="cari"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <DataTable data={data} columns={columns} />
        </div>
    );
}
