import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";

import { Camera } from "@mui/icons-material";
import Form from "./Form";

export default function SettingApplikasi() {
    const fileInputRef = useRef(null);
    const { settingApps } = usePage().props;
    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file as needed, e.g., upload it, display it, etc.
        router.post(route("admin.setting-apps-update-foto"), {
            foto: selectedFile,
        });
    };

    return (
        <div className="py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                {/* form user */}
                <div
                    className={`w-full lg:w-[70%] darkBackground rounded-md shadow-md shadow-slate-950/50 `}
                >
                    <div className="flex justify-between items-center py-2 px-4 ">
                        <p className="font-semibold  text-slate-950 ">
                            Pengaturan Applikasi
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950  py-2 px-4">
                        <Form settingApps={settingApps} />
                    </div>
                </div>
                <div className="w-full lg:w-[30%] bg-slate-50 darkBackground rounded-md text-slate-950 dark:text-white min-h-[50vh] relative p-4">
                    <div className="w-full h-1/2 rounded-md overflow-hidden ">
                        <div className="w-full h-full relative">
                            <img
                                src={"storage/" + settingApps.logo_perusahaan}
                                alt=""
                                className="object-cover w-full"
                            />
                            <div
                                onClick={handleOpenFileInput}
                                className="absolute bottom-2 w-full flex items-center justify-center"
                            >
                                <div className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer">
                                    <p>
                                        <Camera
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p>Ganti Foto</p>
                                </div>
                            </div>
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="py-8 px-4">
                            <p className="font-bold capitalize text-center">
                                {settingApps.nama_perusaaan}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SettingApplikasi.layout = (page) => (
    <AdminLayout children={page} title={"Setting Profile"} />
);
