import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { Add, Cancel, Edit, Print } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ model, setModel, setOpen }) {
    const { data, setData, errors, reset, post } = useForm({
        no_ktp: "",
        nama_pelanggan: "",
        alamat: "",
        kecamatan: "",
        foto: "",
        no_telp: "",
    });
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.data-pelanggan-update"), {
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
        post(route("admin.data-pelanggan-store"), {
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
            no_ktp: model ? model.no_ktp : "",
            nama_pelanggan: model ? model.nama_pelanggan : "",
            alamat: model ? model.alamat : "",
            kecamatan: model ? model.kecamatan : "",
            foto: model ? model.foto : "",
            no_telp: model ? model.no_telp : "",
        });
    }, [model]);

    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="flex flex-col gap-4"
        >
            <div className="grid grid-cols-2 gap-x-3">
                <Input
                    value={data.no_ktp}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"No KTP"}
                    name="no_ktp"
                    errors={errors.no_ktp}
                />
                <Input
                    value={data.nama_pelanggan}
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
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
            <Input
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.files[0] })
                }
                title={"Foto"}
                name="foto"
                type="file"
                errors={errors.foto}
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
