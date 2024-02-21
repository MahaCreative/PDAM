import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { Cancel, Edit } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function FormPetugas({ profile, roles }) {
    const { data, setData, errors, reset, post } = useForm({
        id: profile.id,
        nama: profile.nama,
        no_hp: profile.no_hp,
        roles: roles,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("setting-profile-update-profile"));
    };
    return (
        <div>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div className="">
                    <Input
                        value={data.nama}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nama Lengkap"}
                        name="nama"
                        errors={errors.nama}
                    />
                </div>

                <Input
                    value={data.no_hp}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Telph"}
                    name="no_hp"
                    errors={errors.no_hp}
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
