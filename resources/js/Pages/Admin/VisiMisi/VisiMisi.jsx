import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import FormVisi from "./FormVisi";
import FormMisi from "./FormMisi";
import { Link } from "@inertiajs/react";

export default function VisiMisi(props) {
    const visi = props.visi;
    const misi = props.misi;
    const [modelVisi, setModelVisi] = useState(null);
    const [modelMisi, setModelMisi] = useState(null);
    return (
        <div className="py-6 px-16">
            <div className="flex flex-col md:flex-row  justify-between gap-x-9">
                <div className="w-full">
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="relative">
                            <div className=" flex flex-col items-center justify-center ">
                                <h3 className="font-extralight text-3xl text-blue-500">
                                    VISI
                                </h3>
                                <p className="pt-3 text-3xl font-extrabold w-[80%] md:w-1/2 text-center text-blue-800 pb-9 border-b border-gray-500/50">
                                    {visi.visi}
                                </p>
                            </div>
                            <div className="absolute top-4 right-8">
                                <button
                                    type="button"
                                    onClick={() => setModelVisi(visi)}
                                    className="btn-warning"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col items-center justify-center mt-8"></div>
                        <h3 className="font-extralight text-3xl text-blue-500">
                            MISI
                        </h3>
                        {misi.map((item, key) => (
                            <div className="relative">
                                <div
                                    key={key}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className={`flex ${
                                            key % 2 == 1
                                                ? "flex-col-reverse md:flex-row"
                                                : "flex-col-reverse md:flex-row-reverse"
                                        } justify-center items-center gap-9`}
                                    >
                                        <p className="font-bold text-base text-center md:text-left md:text-lg lg:text-2xl text-blue-950 transition-all duration-300 ease-out">
                                            {item.misi + String(key + 1)}
                                        </p>
                                        <img
                                            src={"/storage/" + item.icon}
                                            alt=""
                                            className="w-[100px] md:w-[250px] lg:w-[350px]  transition-all duration-300 ease-out"
                                        />
                                    </div>
                                    {misi.length !== key + 1 && (
                                        <div>
                                            <img
                                                src={
                                                    "/storage/Image/mission_curve_odd.png"
                                                }
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={`absolute top-4 ${
                                        (key + 1) % 2 == 1
                                            ? "right-8"
                                            : "left-8"
                                    }`}
                                >
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setModelMisi(item)}
                                            className="btn-warning"
                                        >
                                            Update
                                        </button>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.delete-misi",
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
                    </div>
                </div>
                <div className="md:w-[30%]">
                    <div className="flex flex-col gap-9 w-full">
                        <FormVisi model={modelVisi} setModel={setModelVisi} />
                        <FormMisi model={modelMisi} setModel={setModelMisi} />
                    </div>
                </div>
            </div>
        </div>
    );
}
VisiMisi.layout = (page) => <AdminLayout children={page} title={"Visi Misi"} />;
