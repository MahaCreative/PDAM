import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

export default function Galery(props) {
    const galery = props.galery;
    const [params, setParams] = useState({ cari: "" });
    const { settingApps } = usePage().props;
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        margin: "0 10px",
        height: "50vh",
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("galery"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div>
            <Layout>
                <div className="px-2 md:px-4 lg:px-8 w-[100%] md:w-[70%]">
                    <p className="font-light text-md uppercase text-gray-500 border-b border-gray-500/50">
                        Informasi
                    </p>
                    <h3 className="font-bold capitalize font-fira text-4xl text-blue-800 Misi py-8">
                        Galery terbaru {settingApps.nama_perusaaan}
                    </h3>

                    <div className="w-full my-4">
                        <div className="flex justify-between items-center py-2 border-b border-blue-600 my-6">
                            <p className="w-full font-bold text-xl text-blue-600">
                                Galery Terbaru
                            </p>
                            <Input
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                                placeHolder="Cari Galery"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {galery.length > 0 ? (
                                galery.map((item, key) => (
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
                                            <div
                                                as="div"
                                                className="flex justify-end items-end h-full w-full"
                                            >
                                                <div className="bg-blue-500/50 backdrop-blur-sm w-full px-3 py-2 rounded-md">
                                                    <div className="">
                                                        <p className="text-white font-semibold text-sm">
                                                            {item.judul}
                                                        </p>
                                                        <p className="text-xs font-extralight text-white">
                                                            {moment(
                                                                item.created_at
                                                            ).format("ll")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-16 w-full col-span-4">
                                    Belum ada Galery di yang tambahkan
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

Galery.layout = (page) => <GuestLayout children={page} title={"Galery"} />;
