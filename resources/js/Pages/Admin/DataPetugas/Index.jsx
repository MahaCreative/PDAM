import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";

export default function Index(props) {
    const dataPetugas = props.dataPetugas;
    const [params, setParams] = useState({ cari: "" });
    const [modalAdd, setModalAdd] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Image",
            selector: (row) => (
                <img
                    src={"/storage/" + row.foto}
                    className="w-10 object-cover h-[10px]"
                />
            ),
            width: "100px   ",
        },
        { name: "NIP", selector: (row) => row.nip, width: "100px" },
        { name: "Nama Petugas", selector: (row) => row.nama },
        { name: "No Handphone", selector: (row) => row.no_hp },
        { name: "Email", selector: (row) => row.user.email },

        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    {row.user.roles[0].name === "petugas lapangan" && (
                        <Link
                            as="button"
                            href={route("admin.delete-data-petugas", {
                                id: row.id,
                            })}
                            className="btn-danger"
                            method="delete"
                        >
                            Delete
                        </Link>
                    )}
                </div>
            ),
        },
    ];
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.data-petugas"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="py-3">
            <Modal
                open={modalAdd}
                setOpen={setModalAdd}
                title={"Tambah Petugas"}
            >
                <Form setOpen={setModalAdd} />
            </Modal>
            <div className="flex gap-3 items-center justify-between">
                <button
                    onClick={() => setModalAdd(true)}
                    className=" btn-primary flex items-center"
                >
                    <p className="leading-none btn-primary">
                        <Add color="inherit" fontSize="inherit" />
                    </p>
                    <p>Tambah Petugas</p>
                </button>
                <div className="w-1/5">
                    <Input
                        value={params.cari}
                        title={""}
                        placeholder="Cari petugas"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                cari: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="my-2">
                <DataTable data={dataPetugas} columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout children={page} title={"Data Petugas"} />;
