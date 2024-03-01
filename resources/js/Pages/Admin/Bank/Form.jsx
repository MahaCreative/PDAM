import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import { Add, Cancel } from "@mui/icons-material";
import React from "react";

export default function Form({ setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_bank: "",
        nama_rek: "",
        no_rek: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.data-bank"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <Input
                    title={"Nama Bank"}
                    value={data.bank}
                    errors={errors.nama_bank}
                    name="nama_bank"
                    onChange={changeHandler}
                />
                <Input
                    title={"Nama Rekening"}
                    errors={errors.nama_rek}
                    name="nama_rek"
                    onChange={changeHandler}
                />
                <Input
                    title={"no Rekening"}
                    errors={errors.no_rek}
                    name="no_rek"
                    onChange={changeHandler}
                />
                <div className="my-2 flex gap-3">
                    <button className="btn-primary flex gap-x-1 items-center">
                        <p>
                            <Add color="inerit" fontSize="inherit" />
                        </p>
                        <p>Tambah</p>
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="btn-danger flex gap-x-1 items-center"
                    >
                        <p>
                            <Cancel color="inerit" fontSize="inherit" />
                        </p>
                        <p>Cancell</p>
                    </button>
                </div>
            </form>
        </div>
    );
}
