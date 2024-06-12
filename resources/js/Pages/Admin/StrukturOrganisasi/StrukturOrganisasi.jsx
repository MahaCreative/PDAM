import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { Camera } from "@mui/icons-material";
import React, { useRef } from "react";

export default function StrukturOrganisasi(props) {
    const struktur = props.struktur;
    const fileInputRef = useRef(null);

    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file as needed, e.g., upload it, display it, etc.
        router.post(route("admin.update-struktur-organisasi"), {
            foto: selectedFile,
        });
    };
    return (
        <div className="py-16 px-16">
            <div className="w-full flex flex-col items-center justify-center relative">
                <img src={"/storage/" + struktur.foto} alt="" />
                <div
                    onClick={handleOpenFileInput}
                    className="absolute bottom-2 w-full flex items-center justify-center"
                >
                    <div className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer">
                        <p>
                            <Camera color="inherit" fontSize="inherit" />
                        </p>
                        <p>Ganti Struktur</p>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
}
StrukturOrganisasi.layout = (page) => (
    <AdminLayout children={page} title={"Struktur Organisasi"} />
);
