import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function JenisPengaduan(props) {
    const jenis = props.jenis;

    const [data, setData] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        router.post(route("admin.jenis-pengaduan"), { data: data });
    };
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        { name: "Jenis Pengaduan", selector: (row) => row.jenis_pengaduan },
        {
            name: "Total Keseluruhan Pengaduan",
            selector: (row) => row.total_pengaduan + " Pengaduan",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <Link
                    as="button"
                    href={route("admin.jenis-pengaduan", { id: row.id })}
                    className="btn-danger"
                    method="delete"
                >
                    Delete
                </Link>
            ),
        },
    ];
    return (
        <div className="py-3">
            <form
                onSubmit={submitHandler}
                className="flex gap-3 items-center w-full md:w-1/2"
            >
                <Input onChange={(e) => setData(e.target.value)} />
                <button className="btn-primary">Tambah</button>
            </form>
            <div className="my-2">
                <DataTable data={jenis} columns={columns} />
            </div>
        </div>
    );
}

JenisPengaduan.layout = (page) => (
    <AdminLayout children={page} title={"Jenis pengaduan"} />
);
