import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { Cancel, Edit } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ settingApps }) {
    const { data, setData, errors, reset, post } = useForm({
        nama_perusaaan: settingApps.nama_perusaaan,
        email_perusahaan: settingApps.email_perusahaan,
        telp_perusahaan: settingApps.telp_perusahaan,
        alamat_perusahaan: settingApps.alamat_perusahaan,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.setting-apps-update"));
    };
    return (
        <div>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div className="">
                    <Input
                        value={data.nama_perusaaan}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nama Perusahaan"}
                        name="nama_perusaaan"
                        errors={errors.nama_perusaaan}
                    />
                </div>
                <Input
                    value={data.telp_perusahaan}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                    title={"Telph Perusahaan"}
                    name="telp_perusahaan"
                    errors={errors.telp_perusahaan}
                />
                <Input
                    value={data.email_perusahaan}
                    type="email"
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                    title={"Email Perusahaan"}
                    name="email_perusahaan"
                    errors={errors.email_perusahaan}
                />
                <TextArea
                    value={data.alamat_perusahaan}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Alamat"}
                    name="alamat_perusahaan"
                    errors={errors.alamat_perusahaan}
                />

                <div className="w-full">
                    <button className="btn-success flex gap-x-1 items-center w-full text-center justify-center">
                        <p>
                            <Edit color="inerit" fontSize="inherit" />
                        </p>
                        <p>Update</p>
                    </button>
                </div>
            </form>
        </div>
    );
}
