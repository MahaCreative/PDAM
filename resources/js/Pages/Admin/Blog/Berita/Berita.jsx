import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import { router } from "@inertiajs/react";
import { Cancel, Check } from "@mui/icons-material";
import { debounce } from "@mui/material";

export default function Berita(props) {
    const berita = props.berita;
    const [params, setParams] = useState({ cari: "" });
    const [model, setModel] = useState(null);
    const [modalTambah, setModalTambah] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        margin: "0 10px",
        height: "50vh",
    };
    const pilihHandler = (value) => {
        setModalTambah(true);
        setModel(value);
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    const onDeleteHandler = () => {
        router.delete(route("admin.delete-berita", model.id), {
            onSuccess: () => {
                setModalDelete(false);
                setModel(null);
            },
        });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.berita"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="py-6 px-8">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={model ? "Update Berita" : "Tambah Berita"}
            >
                <Form
                    model={model}
                    setModel={setModel}
                    setOpen={setModalTambah}
                />
            </Modal>
            <Modal
                open={modalDelete}
                setOpen={setModalDelete}
                title={"Warning"}
            >
                <p>Apakah anda yakin ingin menghapus data ini ?</p>

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
                                setModalDelete(false);
                                setModel(null);
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
            <div className="flex justify-between items-center gap-3">
                <button
                    onClick={() => setModalTambah(true)}
                    className="btn-primary"
                >
                    Tambah Berita
                </button>
                <div className="w-[20%]">
                    <Input
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        placeHolder="cari"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {berita.length > 0 ? (
                    berita.map((item, key) => (
                        <div
                            key={key}
                            className=" w-full h-full group hover:scale-110 transition-all duration-300 ease-in-out mx-3 shadow-md shadow-gray-500/50 rounded-md"
                        >
                            <div
                                className="relative rounded-lg overflow-hidden h-full"
                                style={{
                                    ...divStyle,
                                    backgroundImage: `url(/storage/${item.foto})`,
                                }}
                            >
                                <div className="absolute top-3 right-3 flex gap-3">
                                    <button
                                        onClick={() => pilihHandler(item)}
                                        className="btn-primary"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteHandler(item)}
                                        className="btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-16 w-full col-span-4">
                        Belum ada berita di yang tambahkan
                    </p>
                )}
            </div>
        </div>
    );
}

Berita.layout = (page) => (
    <AdminLayout children={page} title={"Kelola Berita"} />
);
