import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import Form from "./Form";
import { Add, Delete } from "@mui/icons-material";
import { Link } from "@inertiajs/react";

export default function Bank(props) {
    const bank = props.bank;
    const [modalTambah, setModalTambah] = useState(false);
    return (
        <div className="my-3">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Tambah data bank "}
            >
                <Form setOpen={setModalTambah} />
            </Modal>
            <button
                onClick={() => setModalTambah(true)}
                className="btn-primary flex gap-x-1 items-center"
            >
                <p>
                    <Add color="inerit" fontSize="inherit" />
                </p>
                <p>Tambah</p>
            </button>
            <div>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 grid-cols-2 gap-3 my-3">
                    {bank.map((item, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                pilihBank(
                                    "pembayaran transfer",
                                    item.nama_bank,
                                    item.nama_rek,
                                    item.no_rek
                                )
                            }
                            className="py-2 px-4 rounded-md shadow-md shadow-gray-500/50 hover:bg-blue-600 hover:cursor-pointer hover:text-white dark:hover:bg-slate-700"
                        >
                            <div className="">
                                <div>
                                    <p className="text-xs">{item.nama_rek}</p>
                                    <p className="text-xs">{item.no_rek}</p>
                                </div>
                                <p className="md:text-base text-xs lg:text-xl ">
                                    {item.nama_bank}
                                </p>
                            </div>
                            <Link
                                as="button"
                                method="delete"
                                href={route("admin.data-bank", { id: item.id })}
                                className="flex gap-2 items-center btn-danger "
                            >
                                <p>
                                    <Delete
                                        color="inherit"
                                        fontSize="inherit"
                                    />{" "}
                                </p>
                                <p>Delete</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Bank.layout = (page) => <AdminLayout children={page} title={"Data Bank"} />;
