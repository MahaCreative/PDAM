import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { Add, Cancel, Edit, Print } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, errors, reset, post } = useForm({
        nama_wilayah: "",
        deskripsi_wilayah: "",
    });
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.wilayah-update"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setModel(null);
                reset();
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.wilayah-post"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nama_wilayah: model ? model.nama_wilayah : "",
            deskripsi_wilayah: model ? model.deskripsi_wilayah : "",
        });
    }, [model]);

    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="flex flex-col gap-4"
        >
            <Input
                value={data.nama_wilayah}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                title={"Nama Wilayah"}
                name="nama_wilayah"
                errors={errors.nama_wilayah}
            />
            <TextArea
                value={data.deskripsi_wilayah}
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                title="Deskripsi Wilayah"
                name={"deskripsi_wilayah"}
                errors={errors.deskripsi_wilayah}
            />
            <div className="flex justify-end my-3">
                <div className="flex gap-x-3 items-center">
                    <button className="btn-primary flex gap-x-1 items-center">
                        <p>
                            {model ? (
                                <Edit color="inerit" fontSize="inherit" />
                            ) : (
                                <Add color="inerit" fontSize="inherit" />
                            )}
                        </p>
                        <p>{model ? "Update" : "Tambah"}</p>
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
            </div>
        </form>
    );
}
