import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import FormStatus from "./FormStatus";
import FormSejarah from "./FormSejarah";
import { Link } from "@inertiajs/react";

export default function Sejarah(props) {
    const sejarah = props.sejarah;
    const status = props.status;
    const [modelSejarah, setModelSejarah] = useState(null);
    const [modelStatus, setModelStatus] = useState(null);
    const [modalSejarah, setModalSejarah] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const statusUpdate = (value) => {
        setModalStatus(true);
        setModelStatus(value);
    };
    const sejarahUpdate = (value) => {
        setModalSejarah(true);
        setModelSejarah(value);
    };
    return (
        <div className="py-6 px-16 w-full">
            <Modal
                open={modalStatus}
                setOpen={setModalStatus}
                title={"Update Status Perusahaan"}
            >
                <FormStatus
                    setModel={setModelStatus}
                    model={modelStatus}
                    setOpen={setModalStatus}
                />
            </Modal>
            <Modal
                open={modalSejarah}
                setOpen={setModalSejarah}
                title={modelSejarah ? "Update sejarah" : "Update Sejarah"}
            >
                <FormSejarah
                    setOpen={setModalSejarah}
                    model={modelSejarah}
                    setModel={setModelSejarah}
                />
            </Modal>
            <div className="flex flex-col md:flex-row gap-9 w-full">
                <div className="wfull ">
                    <div className="relative">
                        <div className="w-full flex flex-col items-center justify-center ">
                            <h3 className="font-extralight text-3xl text-blue-500">
                                STATUS
                            </h3>
                            <div className="pt-3  w-[80%]  text-left text-blue-800 pb-9 border-b border-gray-500/50">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: status.text,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="absolute top-3 right-7">
                            <button
                                onClick={() => statusUpdate(status)}
                                className="btn-warning"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full my-4 flex flex-col items-center justify-center ">
                            <h3 className="font-extralight text-3xl text-blue-500">
                                SEJARAH
                            </h3>
                            <ul className="flex flex-col gap-x-3 ">
                                {sejarah.map((item, key) => (
                                    <div className="relative">
                                        <li
                                            className={`py-[40px] w-full pl-[40px] before:z-10 after:z-10 before:w-[2px]  md:pl-0 flex flex-col md:flex-row justify-center items-center
                                                                        relative before:absolute ${
                                                                            key +
                                                                                1 !==
                                                                                1 &&
                                                                            "  before:h-1/2 before:bg-blue-500  before:top-0 "
                                                                        }
                                                                        -ml-1 ${
                                                                            sejarah.length ==
                                                                            key +
                                                                                1
                                                                                ? ""
                                                                                : "after:absolute after:w-[2px] after:h-1/2 after:bg-blue-500 after:bottom-0 "
                                                                        }
                                                                        before:left-[30px] after:left-[30px] md:before:left-[50%] md:after:left-[50%]`}
                                        >
                                            <span className="w-[40px] h-[40px] text-sm flex items-center justify-center text-white left-[30px] md:left-[50%] top-[50%] z-[11] text-center absolute mt-[-30px] ml-[-20px] bg-blue-600 rounded-full ">
                                                {item.tahun}
                                            </span>
                                            <p
                                                className={`${
                                                    (key + 1) % 2 == 1
                                                        ? "md:text-right md:pr-[40px] lg:pr-[160px] "
                                                        : "md:text-left md:pl-[40px] lg:pl-[160px] "
                                                } order-2 md:order-1  lg:text-md  w-[50%] text-left`}
                                                dangerouslySetInnerHTML={{
                                                    __html: item.text,
                                                }}
                                            />
                                            <div
                                                className={` ${
                                                    (key + 1) % 2 == 1
                                                        ? "order-1 md:order-2 "
                                                        : ""
                                                }   pr-0 md:pl-[70px] flex-grow[1] flex-shrink`}
                                            >
                                                <img src="/storage/icon/timeline-image.svg" />
                                            </div>
                                        </li>
                                        <div
                                            key={key}
                                            className={`absolute -top-3 ${
                                                (key + 1) % 2 == 1
                                                    ? "left-5"
                                                    : "right-5"
                                            }`}
                                        >
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() =>
                                                        sejarahUpdate(item)
                                                    }
                                                    className="btn-warning"
                                                >
                                                    Update
                                                </button>
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "admin.delete-sejarah",
                                                        item.id
                                                    )}
                                                    className="btn-danger"
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className="absolute top-3 right-6">
                            <button
                                onClick={() => setModalSejarah(true)}
                                className="btn-primary"
                            >
                                Tambah Sejarah
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Sejarah.layout = (page) => <AdminLayout children={page} title={"Sejarah"} />;
