import Layout from "@/Components/Layout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    const struktur = props.struktur;

    return (
        <div>
            <Layout>
                <div className="px-2 md:px-4 lg:px-8 w-[100%] md:w-[70%]">
                    <p className="font-light text-md uppercase text-gray-500 border-b border-gray-500/50">
                        profile perusahaan
                    </p>
                    <h3 className="font-bold font-fira text-4xl text-blue-800 Misi py-8">
                        Struktur Organisasi
                    </h3>
                    <div className="w-full flex flex-col items-center justify-center ">
                        <img src={"/storage/" + struktur.foto} alt="" />
                    </div>
                </div>
            </Layout>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
