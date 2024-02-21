import Input from "@/Components/Input";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Login() {
    const { settingApps } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center darkBackground lightBackground">
            <div className="w-[35%] py-2 px-4 rounded-md shadow-md shadow-gray-950/50 bg-white flex flex-col items-center justify-center gap-4">
                <h3 className="font-bold text-blue-500 text-xl font-fira">
                    Login
                </h3>
                <img
                    src={"/storage/" + settingApps.logo_perusahaan}
                    alt=""
                    className="h-1/2 w-1/2 object-cover object-center"
                />
                <div className="w-full">
                    <form onSubmit={submitHandler}>
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
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button className="btn-primary">Login</button>
                            <Link
                                href={route("register")}
                                as="button"
                                className=""
                            >
                                Register Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
