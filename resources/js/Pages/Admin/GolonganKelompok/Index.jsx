import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Add, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Index(props) {
    const golongan = props.golongan;
    const kelompok = props.kelompok;
    const [data, setData] = useState({ namaGolongan: "", namaKelompok: "" });
    const columnGolongan = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },

        {
            name: "Nama ",
            selector: (row) => row.nama,
        },
        {
            name: "Aksi ",
            selector: (row) => (
                <button
                    onClick={() => deleteHandlerGolongan(row.id)}
                    className="btn-danger flex gap-x-1 items-center"
                >
                    <p>
                        <Delete color="inerit" fontSize="inherit" />
                    </p>
                    <p>Delete</p>
                </button>
            ),
        },
    ];
    const columnKelompok = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },

        {
            name: "Nama ",
            selector: (row) => row.nama,
        },
        {
            name: "Aksi ",
            selector: (row) => (
                <button
                    onClick={() => deleteHandlerKelompok(row.id)}
                    className="btn-danger flex gap-x-1 items-center"
                >
                    <p>
                        <Delete color="inerit" fontSize="inherit" />
                    </p>
                    <p>Delete</p>
                </button>
            ),
        },
    ];
    const deleteHandlerGolongan = (value) => {
        router.delete(route("admin.delete-golongan", value));
    };
    const deleteHandlerKelompok = (value) => {
        router.delete(route("admin.delete-kelompok", value));
    };
    const submitGolongan = () => {
        router.post(
            route("admin.post-golongan"),
            { nama: data.namaGolongan },
            {
                onSuccess: () => setData({ ...data, namaGolongan: "" }),
            }
        );
    };
    const submitKelompok = () => {
        router.post(
            route("admin.post-kelompok"),
            { nama: data.namaKelompok },
            {
                onSuccess: () => setData({ ...data, namaKelompok: "" }),
            }
        );
    };
    return (
        <div className="shadow-md shadow-gray-900/20 dark:shadow-white/10 antialiased py-3 my-3 px-3 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <p className="text-center my-2 darkBackground lightBackground text-white rounded-md">
                        Daftar Golongan
                    </p>
                    <div className="flex items-center gap-4">
                        <Input
                            value={data.namaGolongan}
                            name="namaGolongan"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    namaGolongan: e.target.value,
                                })
                            }
                            placeholder="Nama Golongan"
                        />
                        <button
                            onClick={submitGolongan}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Tambah</p>
                        </button>
                    </div>
                    <DataTable data={golongan} columns={columnGolongan} />
                </div>
                <div>
                    <p className="text-center my-2 darkBackground lightBackground text-white rounded-md">
                        Daftar Kelompok
                    </p>
                    <div className="flex items-center gap-4">
                        <Input
                            value={data.namaKelompok}
                            name="namaKelompok"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    namaKelompok: e.target.value,
                                })
                            }
                            placeholder="Nama Kelompok"
                        />
                        <button
                            onClick={submitKelompok}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Tambah</p>
                        </button>
                    </div>
                    <DataTable data={kelompok} columns={columnKelompok} />
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <AdminLayout children={page} title={"Golongan dan Kelompok"} />
);
