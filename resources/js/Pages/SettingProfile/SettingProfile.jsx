import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import FormPelanggan from "./FormPelanggan";
import FormPetugas from "./FormPetugas";
import { Camera } from "@mui/icons-material";
import FormUser from "./FormUser";

export default function SettingProfile() {
    const { auth } = usePage().props;
    const [settingUser, setSettingUser] = useState(false);
    const fileInputRef = useRef(null);

    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file as needed, e.g., upload it, display it, etc.
        router.post(route("setting-profile-update-image"), {
            id: auth.profile.id,
            roles: auth.roles,
            foto: selectedFile,
        });
    };

    return (
        <div className="py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div
                    className={`w-full lg:w-[70%] darkBackground rounded-md shadow-md shadow-slate-950/50 ${
                        settingUser ? "hidden" : "block"
                    }`}
                >
                    <div className="flex justify-between items-center py-2 px-4 ">
                        <p className="font-semibold  text-slate-950 ">
                            Akun Saya
                        </p>
                        <button
                            onClick={() => setSettingUser(true)}
                            className="py-1 px-2 rounded-md text-white  bg-slate-950 dark:bg-blue-600 hover:bg-slate-800 dark:active:bg-blue-800 dark:hover:bg-blue-800
active:bg-slate-800 font-medium"
                        >
                            Pengaturan
                        </button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950  py-2 px-4">
                        <p className="my-8 font-bold">Informasi Pengguna</p>
                        {auth.roles == "pelanggan" && (
                            <FormPelanggan
                                profile={auth.profile}
                                roles={auth.roles}
                            />
                        )}
                        {auth.roles !== "pelanggan" && (
                            <FormPetugas
                                profile={auth.profile}
                                roles={auth.roles}
                            />
                        )}
                    </div>
                </div>
                {/* form user */}
                <div
                    className={`w-full lg:w-[70%] darkBackground rounded-md shadow-md shadow-slate-950/50 ${
                        settingUser ? "" : "hidden"
                    }`}
                >
                    <div className="flex justify-between items-center py-2 px-4 ">
                        <p className="font-semibold  text-slate-950 ">
                            Pengaturan Akun
                        </p>
                        <button
                            onClick={() => setSettingUser(false)}
                            className="py-1 px-2 rounded-md text-white  bg-slate-950 dark:bg-blue-600 hover:bg-slate-800 dark:active:bg-blue-800 dark:hover:bg-blue-800
active:bg-slate-800 font-medium"
                        >
                            Kembali
                        </button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950  py-2 px-4">
                        <FormUser user={auth.user} />
                    </div>
                </div>
                <div className="w-full lg:w-[30%] bg-slate-50 darkBackground rounded-md text-slate-950 dark:text-white min-h-[50vh] relative p-4">
                    <div className="w-full h-1/2 rounded-md overflow-hidden ">
                        <div className="w-full h-full relative">
                            <img
                                src={"storage/" + auth.profile.foto}
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
                                {auth.roles}
                            </p>
                            <p className="font-light capitalize text-center my-3">
                                {auth.roles == "pelanggan" &&
                                    auth.profile.nama_pelanggan}
                                {auth.roles !== "pelanggan" &&
                                    auth.profile.nama}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SettingProfile.layout = (page) => (
    <AdminLayout children={page} title={"Setting Profile"} />
);
