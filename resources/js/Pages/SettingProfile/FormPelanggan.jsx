import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { Cancel, Edit } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function FormPelanggan({ profile, roles }) {
    const { data, setData, errors, reset, post } = useForm({
        id: profile.id,
        no_ktp: profile.no_ktp,
        nama_pelanggan: profile.nama_pelanggan,
        alamat: profile.alamat,
        kecamatan: profile.kecamatan,
        no_telp: profile.no_telp,
        roles: roles,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("setting-profile-update-profile"));
    };
    return (
        <div>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-x-3">
                    <Input
                        value={data.no_ktp}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"No KTP"}
                        name="no_ktp"
                        errors={errors.no_ktp}
                    />
                    <Input
                        value={data.nama_pelanggan}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nama Lengkap"}
                        name="nama_pelanggan"
                        errors={errors.nama_pelanggan}
                    />
                </div>
                <TextArea
                    value={data.alamat}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Alamat"}
                    name="alamat"
                    errors={errors.alamat}
                />
                <Input
                    value={data.kecamatan}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Kecamatan"}
                    name="kecamatan"
                    errors={errors.kecamatan}
                />
                <Input
                    value={data.no_telp}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Telph"}
                    name="no_telp"
                    errors={errors.no_telp}
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
