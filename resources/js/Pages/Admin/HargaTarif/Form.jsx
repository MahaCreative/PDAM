import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { useForm, usePage } from "@inertiajs/react";
import { Add, Cancel, Edit } from "@mui/icons-material";
import React, { useEffect } from "react";

export default function Form({ setOpen, model, setModel }) {
    const { data, setData, post, errors, reset } = useForm({
        golongan: "",
        kelompok: "",
        tarif1: "",
        tarif2: "",
        tarif3: "",
        tarif4: "",
        adm: "",
        denda: "",
    });
    const { golongan } = usePage().props;
    const { kelompok } = usePage().props;
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.harga-tarif-update"), {
            onSuccess: () => {
                reset("tarif1", "tarif2", "tarif3", "tarif4", "adm", "denda"),
                    setOpen(false),
                    setModel(false);
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.harga-tarif-post"), {
            onSuccess: reset(
                "tarif1",
                "tarif2",
                "tarif3",
                "tarif4",
                "adm",
                "denda"
            ),
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            golongan: model ? model.golongan.nama : "",
            kelompok: model ? model.kelompok.nama : "",
            tarif1: model ? model.tarif1 : "",
            tarif2: model ? model.tarif2 : "",
            tarif3: model ? model.tarif3 : "",
            tarif4: model ? model.tarif4 : "",
            adm: model ? model.adm : "",
            denda: model ? model.denda : "",
        });
    }, [model]);
    return (
        <div className="w-full">
            <form
                onSubmit={model ? updateHandler : submitHandler}
                className="flex flex-col gap-4 w-full"
            >
                <div className="w-full">
                    <Select
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        value={data.golongan}
                        title={"Golongan"}
                        name={"golongan"}
                        errors={errors.golongan}
                    >
                        <option value="">
                            {model ? data.golongan : "Pilih Golongan"}
                        </option>
                        {golongan.map((item, key) => (
                            <option key={key} value={item.nama}>
                                {item.nama}
                            </option>
                        ))}
                    </Select>
                    <Select
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        value={data.kelompok}
                        title={"Kelompok"}
                        name={"kelompok"}
                        errors={errors.kelompok}
                    >
                        <option value="">
                            {model ? data.kelompok : "Pilih Kelompok"}
                        </option>
                        {kelompok.map((item, key) => (
                            <option key={key} value={item.nama}>
                                {item.nama}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="flex gap-3 w-full">
                    <Input
                        value={data.tarif1}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Tarif (0-10 m3)"}
                        name="tarif1"
                        errors={errors.tarif1}
                    />
                    <Input
                        value={data.tarif2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Tarif (11-20 m3)"}
                        name="tarif2"
                        errors={errors.tarif2}
                    />
                </div>
                <div className="flex items-center gap-3 w-full">
                    <Input
                        value={data.tarif3}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Tarif (21-30 m3)"}
                        name="tarif3"
                        errors={errors.tarif3}
                    />
                    <Input
                        value={data.tarif4}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Tarif (>30 m3)"}
                        name="tarif4"
                        errors={errors.tarif4}
                    />
                </div>
                <div className="flex items-center gap-3 w-full">
                    <Input
                        value={data.adm}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Biaya Administrasi"}
                        name="adm"
                        errors={errors.adm}
                    />
                    <Input
                        value={data.denda}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Biaya Denda"}
                        name="denda"
                        errors={errors.denda}
                    />
                </div>

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
        </div>
    );
}
