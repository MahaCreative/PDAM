import Layout from "@/Components/Layout";
import Modal from "@/Components/Modal";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index(props) {
    const susunanLevel1 = props.susunanLevel1;
    const susunanLevel2 = props.susunanLevel2;
    const susunanLevel3 = props.susunanLevel3;
    const [model, setModel] = useState([null]);
    const [modalLihat, setModalLihat] = useState(false);
    const pilih = (value) => {
        setModalLihat(true);
        setModel(value);
    };
    return (
        <div>
            <Modal
                open={modalLihat}
                setOpen={setModalLihat}
                title={model?.jabatan}
            >
                <div className="flex justify-center">
                    <div className="w-1/4 flex flex-col items-center  py-8">
                        <div className=" w-[150px] p-3 md:w-[200px] h-[150px] md:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden">
                            <img src={"/storage/" + model.foto} alt="" />
                        </div>
                        <div className="my-3 bg-blue-950 text-white text-center px-4 py-1 rounded-br-3xl rounded-tl-3xl ">
                            <p className="font-semibold text-xl">
                                {model.jabatan}
                            </p>
                            <p className="font-extralight text-sm">
                                {model.nama}
                            </p>
                        </div>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: model.text }} />
            </Modal>
            <Layout>
                <div className="px-2 md:px-4 lg:px-8 w-[100%] md:w-[70%]">
                    <p className="font-light text-md uppercase text-gray-500 border-b border-gray-500/50">
                        profile perusahaan
                    </p>
                    <h3 className="font-bold font-fira text-4xl text-blue-800 Misi py-8">
                        Susunan Direksi
                    </h3>
                    <div className="">
                        <div className="grid my-16 md:grid-cols-6 grid-cols-1 gap-x-10 gap-y-16 w-full">
                            {susunanLevel1.map((item, key) => (
                                <div
                                    key={key}
                                    className={`col-span-6 relative`}
                                >
                                    <div className="hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 flex flex-col justify-center items-center">
                                        <div className=" w-[150px] p-3 md:w-[200px] h-[150px] relative md:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden">
                                            <img
                                                src={"/storage/" + item.foto}
                                                alt=""
                                            />
                                            <div className="absolute top-[70%] left-5 flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        updateHandler(item)
                                                    }
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
                                            <img
                                                src={"/storage/" + item.foto}
                                                alt=""
                                            />
                                            <div className="absolute top-[70%] left-5 flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        updateHandler(item)
                                                    }
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
                                            <img
                                                src={"/storage/" + item.foto}
                                                alt=""
                                            />
                                            <div className="absolute top-[70%] left-5 flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        updateHandler(item)
                                                    }
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
            </Layout>
        </div>
    );
}

Index.layout = (page) => (
    <GuestLayout children={page} title={"Susunan Direksi"} />
);
