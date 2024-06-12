import Layout from "@/Components/Layout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    const visi = props.visi;
    const misi = props.misi;
    return (
        <div>
            <Layout>
                <div className="px-2 md:px-4 lg:px-8 w-[100%] md:w-[70%]">
                    <p className="font-light text-md uppercase text-gray-500 border-b border-gray-500/50">
                        profile perusahaan
                    </p>
                    <h3 className="font-bold font-fira text-4xl text-blue-800 Misi py-8">
                        Visi Misi
                    </h3>
                    <div className="w-full flex flex-col items-center justify-center ">
                        <h3 className="font-extralight text-3xl text-blue-500">
                            VISI
                        </h3>
                        <p className="pt-3 text-3xl font-extrabold w-[80%] md:w-1/2 text-center text-blue-800 pb-9 border-b border-gray-500/50">
                            {visi.visi}
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center mt-8">
                        <h3 className="font-extralight text-3xl text-blue-500">
                            MISI
                        </h3>
                        {misi.map((item, key) => (
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
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
