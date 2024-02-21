import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function FormUser({ user }) {
    const { data, setData, post, reset, errors } = useForm({
        id: user.id,
        email: user.email,
        newEmail: "",
        password: "",
        password_confirmation: "",
        password_lama: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("setting-profile-update-user"));
    };
    console.log(user.id);
    return (
        <div>
            <form onSubmit={submitHandler} className="">
                <p className="mt-6 mb-4 font-medium text-slate-500">
                    Ubah Alamat Email
                </p>
                <p className="font-light px-4">
                    Biarkan kosong jika tidak ingin mengubah email
                </p>
                <div className="px-4 py-3 flex flex-col gap-6">
                    <Input
                        value={data.email}
                        title={"email lama"}
                        name="email"
                        errors={errors.email}
                        disabled
                    />
                    <Input
                        onChange={changeHandler}
                        value={data.newEmail}
                        title={"email baru"}
                        name="newEmail"
                        errors={errors.newEmail}
                    />
                </div>
                <p className="mt-6 mb-4 font-medium text-slate-500">
                    Ubah Password
                </p>
                <p className="font-light px-4">
                    Biarkan kosong jika tidak ingin mengubah password
                </p>
                <div className="px-4 py-3 flex flex-col gap-6">
                    <Input
                        onChange={changeHandler}
                        value={data.password}
                        title={"password"}
                        name="password"
                        errors={errors.password}
                    />
                    <Input
                        onChange={changeHandler}
                        value={data.password_confirmation}
                        title={"Konfirmasi Password"}
                        name="password_confirmation"
                        errors={errors.password_confirmation}
                    />
                </div>
                <Input
                    onChange={changeHandler}
                    value={data.password_lama}
                    title={"Masukkan passowrd lama"}
                    name="password_lama"
                    errors={errors.password_lama}
                />
                <button className="btn-primary w-full my-3">Update</button>
            </form>
        </div>
    );
}
