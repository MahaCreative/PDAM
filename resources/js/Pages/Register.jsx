import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Register() {
    const { settingApps } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        no_ktp: "",
        nama_pelanggan: "",
        alamat: "",
        kecamatan: "",
        foto: "",
        no_telp: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("register"));
    };
    return (
        <div className="w-full h-full py-16 flex flex-col justify-center items-center darkBackground lightBackground">
            <div className="w-[85%] md:w-[50%]  py-2 px-4 rounded-md shadow-md shadow-gray-950/50 bg-white flex flex-col items-center justify-center gap-4">
                <h3 className="font-bold text-blue-500 text-xl font-fira">
                    Register
                </h3>
                <img
                    src={"/storage/" + settingApps.logo_perusahaan}
                    alt=""
                    className="h-1/2 w-1/2 object-cover object-center"
                />
                <div className="w-full">
                    <form onSubmit={submitHandler}>
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
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            title={"Alamat"}
                            name="alamat"
                            errors={errors.alamat}
                        />

                        <div className="grid grid-cols-3 gap-x-3">
                            <Input
                                value={data.kecamatan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                title={"Kecamatan"}
                                name="kecamatan"
                                errors={errors.kecamatan}
                            />
                            <Input
                                value={data.no_telp}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                title={"Telph"}
                                name="no_telp"
                                errors={errors.no_telp}
                            />

                            <Input
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                                title={"Foto"}
                                name="foto"
                                type="file"
                                errors={errors.foto}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-3 my-6">
                            <Input
                                onChange={changeHandler}
                                name="email"
                                title={"email"}
                                type="email"
                                errors={errors.email}
                            />
                            <Input
                                onChange={changeHandler}
                                name="password"
                                title={"password"}
                                type={"password"}
                                errors={errors.password}
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button className="btn-primary">Register</button>
                            <Link
                                href={route("login")}
                                as="button"
                                className=""
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
Register.layout = (page) => <GuestLayout children={page} />;
