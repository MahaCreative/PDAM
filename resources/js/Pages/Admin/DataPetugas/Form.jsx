import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import { Add, Cancel, Save } from "@mui/icons-material";
import React from "react";

export default function Form({ setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        email: "",
        password: "",
        nip: "",
        no_hp: "",
        foto: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.post-data-petugas"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="flex gap-3 items-center">
                    <Input
                        value={data.name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nama Lengkap"}
                        name="name"
                        errors={errors.name}
                    />
                    <Input
                        value={data.nip}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"NIP"}
                        name="nip"
                        errors={errors.nip}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <Input
                        value={data.no_hp}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nomor Handphone"}
                        name="no_hp"
                        errors={errors.no_hp}
                    />
                    <Input
                        type="file"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.files[0],
                            })
                        }
                        title={"Foto"}
                        name="foto"
                        errors={errors.foto}
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Email"}
                        name="email"
                        errors={errors.email}
                    />
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"password"}
                        name="password"
                        errors={errors.password}
                    />
                </div>
                <div className="flex gap-3 items-center my-3">
                    <button className=" btn-primary flex items-center">
                        <p className="leading-none btn-primary">
                            <Save color="inherit" fontSize="inherit" />
                        </p>
                        <p>Simpan Petugas</p>
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        type="button"
                        className=" btn-danger flex items-center"
                    >
                        <p className="leading-none btn-danger">
                            <Cancel color="inherit" fontSize="inherit" />
                        </p>
                        <p>Cancell</p>
                    </button>
                </div>
            </form>
        </div>
    );
}
