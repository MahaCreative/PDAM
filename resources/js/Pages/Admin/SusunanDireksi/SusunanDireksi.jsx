import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import Form from "./Form";
import { Link } from "@inertiajs/react";

export default function SusunanDireksi(props) {
    const susunanLevel1 = props.susunanLevel1;
    const susunanLevel2 = props.susunanLevel2;
    const susunanLevel3 = props.susunanLevel3;
    const [modelLihat, setModelLihat] = useState([null]);
    const [modalLihat, setModalLihat] = useState(false);
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(null);
    const pilih = (value) => {
        setModalLihat(true);
        setModelLihat(value);
    };
    const updateHandler = (value) => {
        setModel(value);
        setModalTambah(true);
    };
    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <Modal
                open={modalLihat}
                setOpen={setModalLihat}
                title={modelLihat?.jabatan}
            >
                <div className="flex justify-center">
                    <div className="w-1/4 flex flex-col items-center  py-8">
                        <div className=" w-[150px] p-3 md:w-[200px] h-[150px] md:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden">
                            <img src={"/storage/" + modelLihat.foto} alt="" />
                        </div>
                        <div className="my-3 bg-blue-950 text-white text-center px-4 py-1 rounded-br-3xl rounded-tl-3xl ">
                            <p className="font-semibold text-xl">
                                {modelLihat.jabatan}
                            </p>
                            <p className="font-extralight text-sm">
                                {modelLihat.nama}
                            </p>
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: modelLihat.text }} />
            </Modal>
            <Modal
                setOpen={setModalTambah}
                open={modalTambah}
                title={
                    model ? "Update Susunan direksi" : "Tambah susunan direksi"
                }
            >
                <div className="w-full">
                    <Form
                        setOpen={setModalTambah}
                        model={model}
                        setModel={setModel}
                    />
                </div>
            </Modal>
            <button
                onClick={() => setModalTambah(true)}
                className="btn-primary"
            >
                Tambah Susunan Direksi
            </button>
            <div className="">
                <div className="grid my-16 md:grid-cols-6 grid-cols-1 gap-x-10 gap-y-16 w-full">
                    {susunanLevel1.map((item, key) => (
                        <div key={key} className={`col-span-6 relative`}>
                            <div className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex flex-col justify-center items-center">
                                <div className=" w-[150px] p-3 md:w-[200px] h-[150px] relative md:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden">
                                    <img src={"/storage/" + item.foto} alt="" />
                                    <div className="absolute top-[70%] left-5 flex gap-3">
                                        <button
                                            onClick={() => updateHandler(item)}
                                            className="btn-warning"
                                        >
                                            Update
                                        </button>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.delete-direksi",
                                                item.id
                                            )}
                                            className="btn-danger"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                                <div className="my-3 bg-blue-950 text-white text-center px-4 py-1 rounded-br-3xl rounded-tl-3xl ">
                                    <p className="font-semibold text-xl">
                                        {item.jabatan}
                                    </p>
                                    <p className="font-extralight text-sm">
                                        {item.nama}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid my-16 md:grid-cols-6 grid-cols-1 gap-x-10 gap-y-16 w-full">
                    {susunanLevel2.map((item, key) => (
                        <div
                            key={key}
                            className={`${
                                susunanLevel1.length % 2 == 1
                                    ? "col-span-2"
                                    : "col-span-3"
                            } relative`}
                        >
                            <div className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex flex-col justify-center items-center">
                                <div className=" w-[150px] p-3 md:w-[200px] h-[150px] relative md:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden">
                                    <img src={"/storage/" + item.foto} alt="" />
                                    <div className="absolute top-[70%] left-5 flex gap-3">
                                        <button
                                            onClick={() => updateHandler(item)}
                                            className="btn-warning"
                                        >
                                            Update
                                        </button>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.delete-direksi",
                                                item.id
                                            )}
                                            className="btn-danger"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                                <div className="my-3 bg-blue-950 text-white text-center px-4 py-1 rounded-br-3xl rounded-tl-3xl ">
                                    <p className="font-semibold text-xl">
                                        {item.jabatan}
                                    </p>
                                    <p className="font-extralight text-sm">
                                        {item.nama}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid my-16 md:grid-cols-6 grid-cols-1 gap-x-10 gap-y-16 w-full">
                    {susunanLevel3.map((item, key) => (
                        <div
                            key={key}
                            className={`${
                                susunanLevel1.length % 2 == 1
                                    ? "col-span-3"
                                    : "col-span-2"
                            } relative`}
                        >
                            <div className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex flex-col justify-center items-center">
                                <div className=" w-[150px] p-3 md:w-[200px] h-[150px] relative md:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden">
                                    <img src={"/storage/" + item.foto} alt="" />
                                    <div className="absolute top-[70%] left-5 flex gap-3">
                                        <button
                                            onClick={() => updateHandler(item)}
                                            className="btn-warning"
                                        >
                                            Update
                                        </button>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.delete-direksi",
                                                item.id
                                            )}
                                            className="btn-danger"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                                <div className="my-3 bg-blue-950 text-white text-center px-4 py-1 rounded-br-3xl rounded-tl-3xl ">
                                    <p className="font-semibold text-xl">
                                        {item.jabatan}
                                    </p>
                                    <p className="font-extralight text-sm">
                                        {item.nama}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

SusunanDireksi.layout = (page) => (
    <AdminLayout children={page} title={"Susunan Direksi"} />
);
