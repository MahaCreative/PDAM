import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function CetakLayout({ children, title }) {
    const { settingApps } = usePage().props;
    return (
        <div>
            <Head title={title} />
            <div className="py-2 flex justify-between items-center gap-3 px-16  border-b-4 border-black">
                <div>
                    <img
                        className="w-[100px]"
                        src={"/storage/" + settingApps.logo_perusahaan}
                        alt=""
                    />
                </div>
                <div className="w-full text-center ">
                    <h3 className="font-semibold text-3xl uppercase font-fira">
                        Pemerintah Kabupaten Mamuju
                    </h3>
                    <h3 className="font-semibold text-3xl uppercase font-fira">
                        {settingApps.nama_perusaaan}
                    </h3>
                    <p className="capitalize text-sm">
                        Alamat : {settingApps.alamat_perusahaan}
                    </p>
                    <p className="capitalize italic text-xs">
                        Telp : {settingApps.telp_perusahaan} Email:{" "}
                        {settingApps.email_perusahaan}
                    </p>
                </div>
            </div>
            <div className="w-full my-6">
                <h3 className="font-semibold text-xl uppercase text-center px-16">
                    {title}
                </h3>
            </div>
            {children}
        </div>
    );
}
