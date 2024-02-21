import Input from "@/Components/Input";
import SearchGolongan from "@/Components/SearchGolongan";
import SearchKelompok from "@/Components/SearchKelompok";
import SearchWilayah from "@/Components/SearchWilayah";
import TextArea from "@/Components/TextArea";
import { useForm, usePage } from "@inertiajs/react";
import { Add, Cancel, Edit, Print } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function FormEdit({ model, setModel, setOpen, ...props }) {
    const { countPelanggan } = usePage().props;
    const { data, setData, errors, reset, post } = useForm({
        wilayah: "",
        kode_pemasangan_baru: "",
        no_sambungan: "",
        nama_pelanggan: "",
        alamat_pemasangan: "",
        nama_golongan: "",
        nama_kelompok: "",
        uang_pendaftaran: "",
        biaya_perencanaan: "",
        biaya_pemasangan: "",
        biaya_instalasi: "",
        total_biaya: "",
        tgl_pemasangan: "",
        pipa_diameter: "",
        status: "",
    });

    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.pemasangan-baru-update"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setModel(null);
                reset();
            },
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            wilayah: model ? model.wilayah.nama_wilayah : "",
            kode_pemasangan_baru: model ? model.kode_pemasangan_baru : "",
            no_sambungan: model ? model.no_sambungan : "",
            nama_pelanggan: model ? model.nama_pelanggan : "",
            alamat_pemasangan: model ? model.alamat_pemasangan : "",
            nama_golongan: model ? model.nama_golongan : "",
            nama_kelompok: model ? model.nama_kelompok : "",
            uang_pendaftaran: model ? model.uang_pendaftaran : "",
            biaya_perencanaan: model ? model.biaya_perencanaan : "",
            biaya_pemasangan: model ? model.biaya_pemasangan : "",
            biaya_instalasi: model ? model.biaya_instalasi : "",
            total_biaya: model ? model.total_biaya : "",
            tgl_pemasangan: model ? model.tgl_pemasangan : "",
            pipa_diameter: model ? model.pipa_diameter : "",
            status: model ? model.status : "",
        });
    }, [model]);

    const getDataWilayah = (value) => {
        setData("wilayah", value.nama_wilayah);
    };
    const getDataKelompok = (value) => {
        setData("nama_kelompok", value);
    };
    const getDataGolongan = (value) => {
        setData("nama_golongan", value);
    };
    const changeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const blurHandler = (e) => {
        setData("total_biaya", "Menunggu Kalkulasi");
        setTimeout(() => {
            setData({
                ...data,
                total_biaya:
                    +data.biaya_perencanaan +
                    +data.biaya_pemasangan +
                    +data.biaya_instalasi +
                    +data.uang_pendaftaran,
            });

            console.log(data);
        }, 350);
    };
    return (
        <form onSubmit={updateHandler} className="">
            <div className="bg-gray-200 text-blue-500 dark:bg-slate-950 py-2 px-4 rounded-md text-sm font-light">
                <p className="font-bold">Pemasangan Sambungan Baru</p>
                <div className=" text-sm my-1.5 border-b border-gray-300/50 ">
                    <div className="flex gap-x-3 items-center">
                        <p>Tanggal pengajuan pemasangan baru : </p>
                        <p className="text-xs">{data.tgl_pemasangan}</p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p>Kode pengajuan : </p>
                        <p className="text-xs">{data.kode_pemasangan_baru}</p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <p>No Sambungan : </p>
                        <p className="text-xs">{data.no_sambungan}</p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex gap-3 items-center my-1">
                    <Input
                        disabled
                        value={data.kode_pemasangan_baru}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Kode Pemasangan"}
                        name="kode_pemasangan_baru"
                        errors={errors.kode_pemasangan_baru}
                    />
                    <Input
                        disabled
                        value={data.no_sambungan}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nomor Sambungan"}
                        name="no_sambungan"
                        errors={errors.no_sambungan}
                    />
                    <Input
                        disabled
                        value={data.nama_pelanggan}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nama Pelanggan"}
                        name="nama_pelanggan"
                        errors={errors.nama_pelanggan}
                    />
                </div>
                <div className="flex gap-3 items-center my-1">
                    <SearchWilayah
                        model={model && model.wilayah.nama_wilayah}
                        title={"Pilih Wilayah"}
                        getData={getDataWilayah}
                    />

                    <SearchGolongan
                        model={data.nama_golongan}
                        title={"Pilih Golongan"}
                        getData={getDataGolongan}
                    />
                    <SearchKelompok
                        dataGolongan={data.nama_golongan}
                        model={data.nama_kelompok}
                        title={"Pilih Kelompok"}
                        getData={getDataKelompok}
                    />
                </div>
                <div className="my-1">
                    <TextArea
                        onChange={(e) =>
                            setData("alamat_pemasangan", e.target.value)
                        }
                        title={"Alamat Pemasangan"}
                        value={data.alamat_pemasangan}
                        errors={errors.alamat_pemasangan}
                    />
                </div>
                <div className="flex gap-3 items-center my-1">
                    <Input
                        onBlur={blurHandler}
                        name={"uang_pendaftaran"}
                        onChange={changeHandler}
                        title={"Biaya Pendaftaran"}
                        errors={errors.uang_pendaftaran}
                        value={data.uang_pendaftaran}
                    />
                    <Input
                        onBlur={blurHandler}
                        name={"biaya_perencanaan"}
                        onChange={changeHandler}
                        title={"Biaya Perencanaan"}
                        errors={errors.biaya_perencanaan}
                        value={data.biaya_perencanaan}
                    />
                    <Input
                        onBlur={blurHandler}
                        name={"biaya_pemasangan"}
                        onChange={changeHandler}
                        title={"Biaya pemasangan"}
                        errors={errors.biaya_pemasangan}
                        value={data.biaya_pemasangan}
                    />
                </div>
                <div className="flex gap-3 items-center my-1">
                    <Input
                        onBlur={blurHandler}
                        name={"biaya_instalasi"}
                        onChange={changeHandler}
                        title={"Biaya Instalasi"}
                        errors={errors.biaya_instalasi}
                        value={data.biaya_instalasi}
                    />
                    <Input
                        disabled
                        name={"total_biaya"}
                        classname={"bg-slate-950 dark:bg-blue-500 text-white"}
                        title={"Total Biaya"}
                        errors={errors.total_biaya}
                        value={data.total_biaya}
                    />
                    <Input
                        name={"pipa_diameter"}
                        onChange={changeHandler}
                        title={"Pipa Diameter (inch)"}
                        errors={errors.pipa_diameter}
                        value={data.pipa_diameter}
                    />
                </div>
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
    );
}
