import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

export default function SettingApplikasi(props) {
    const profile = props.profile;
    return (
        <div className="py-2 ">
            <div className="bg-gray-200 w-full px-2 py-3 dark:text-black dark:bg-white rounded-md font-extralight text-xs">
                <p>
                    Segala bentuk data yang ada dalam data ini akan ditampilkan
                    pada aplikasi ini, isikan sesuai dengan data profile
                    perusahaan
                </p>
            </div>
            <div className="my-2">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>a</div>
                    <div>
                        <div>
                            <img
                                src={"./storage/" + profile.logo_perusahaan}
                                alt=""
                                className="w-1/2 object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SettingApplikasi.layout = (page) => (
    <AdminLayout children={page} title={"Setting Perusahaan"} />
);
