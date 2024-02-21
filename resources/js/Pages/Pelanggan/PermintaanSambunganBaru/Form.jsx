import Input from "@/Components/Input";
import SearchGolongan from "@/Components/SearchGolongan";
import SearchKelompok from "@/Components/SearchKelompok";
import SearchWilayah from "@/Components/SearchWilayah";
import TextArea from "@/Components/TextArea";
import { useForm, usePage } from "@inertiajs/react";
import { Add, Camera, Cancel } from "@mui/icons-material";
import moment from "moment";
import React, { useRef, useState } from "react";

export default function Form({ setOpen, model, setModel }) {
    const { countPelanggan } = usePage().props;
    const { auth } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_pelanggan: auth.profile.nama_pelanggan,
        nama_golongan: "",
        nama_kelompok: "",
        wilayah: "",
        foto_kk: "",
        foto_ktp: "",
        foto_rekening_air_tetangga: "",
        alamat_pemasangan: "",
        no_telph: "",
        kode_pemasangan_baru: `ID/${auth.profile.id}/NP/0${
            countPelanggan + 1
        }D/${moment(new Date()).format("ymd")}`,
        no_sambungan:
            auth.profile.id +
            "" +
            countPelanggan +
            1 +
            "" +
            moment(new Date()).format("ymd"),
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const fileInputRefs = {
        foto_kk: useRef(null),
        foto_ktp: useRef(null),
        foto_rekening_air_tetangga: useRef(null),
    };
    const [imagePreviews, setImagePreviews] = useState({
        foto_kk: null,
        foto_ktp: null,
        foto_rekening_air_tetangga: null,
    });

    const handleOpenFileInput = (inputName) => {
        fileInputRefs[inputName].current.click();
    };
    const handleFileChange = (value, event) => {
        const selectedFile = event;
        setData(value, selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews((prevPreviews) => ({
                ...prevPreviews,
                [value]: reader.result,
            }));
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    console.log(data);
    const getDataWilayah = (value) => {
        setData("wilayah", value);
    };
    const getDataGolongan = (value) => {
        setData("nama_golongan", value);
    };
    const getDataKelompok = (value) => {
        setData("nama_kelompok", value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("pelanggan.permintaan-sambungan-baru"), {
            onSuccess: () => {
                reset();
                setTimeout(() => {
                    setOpen(false);
                }, 300);
            },
        });
    };
    return (
        <div className="w-full">
            <div className="bg-gray-200 text-blue-500 dark:bg-slate-950 py-2 px-4 rounded-md text-sm font-light">
                <p className="font-bold">Permintaan Sambungan Baru</p>
                <div className=" text-sm my-1.5 border-b border-gray-300/50 ">
                    <div className="flex gap-x-3 items-center">
                        <p>Tanggal pengajuan pemasangan baru : </p>
                        <p className="text-xs">
                            {moment(new Date()).format("llll")}
                        </p>
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
                <p className="font-bold">Data Pelanggan</p>
                <div>
                    <div className="flex gap-3 items-center capitalize border-b border-blue-600 dark:border-white">
                        <div className="flex gap-3 items-center ">
                            <p>Nama Pelanggan :</p>
                            <p>{auth.profile.nama_pelanggan}</p>
                        </div>
                        <div className="flex gap-3 items-center ">
                            <p>NIK Pelanggan :</p>
                            <p>{auth.profile.no_ktp}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center capitalize border-b border-blue-600 dark:border-white">
                        <p>Kode Pelanggan :</p>
                        <p>{auth.profile.kd_pelanggan}</p>
                    </div>
                    <div className="flex gap-3 items-center capitalize border-b border-blue-600 dark:border-white">
                        <p>Alamat Pelanggan :</p>
                        <p>{auth.profile.alamat}</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 py-2 px-4 rounded-md my-2 w-[80vw] lg:w-[50vw]">
                <p className="text-base w-full">
                    Setelah mengisi formulir pengajuan pemasangan baru, petugas
                    akan melakukan pengecekan berkas pengajuan terlebih dahulu
                    dan akan menghubungi nomor yang tertera di formulir untuk
                    informasi lebih lanjut.
                </p>
            </div>
            <form onSubmit={submitHandler} className="w-full">
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
                            errors={errors.wilayah}
                            title={"Pilih Wilayah"}
                            getData={getDataWilayah}
                        />

                        <SearchGolongan
                            errors={errors.nama_golongan}
                            title={"Pilih Golongan"}
                            getData={getDataGolongan}
                        />
                        <SearchKelompok
                            dataGolongan={data.nama_golongan}
                            errors={errors.nama_kelompok}
                            title={"Pilih Kelompok"}
                            getData={getDataKelompok}
                        />
                    </div>
                    <div className="">
                        <div className="flex gap-3 items-center w-full my-2 justify-between">
                            {/* foto KK */}
                            <div className="">
                                <div
                                    onClick={() =>
                                        handleOpenFileInput("foto_kk")
                                    }
                                    className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer"
                                >
                                    <p>
                                        <Camera
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p>Foto KK</p>
                                </div>
                                <input
                                    type="file"
                                    name="foto_kk"
                                    ref={fileInputRefs.foto_kk}
                                    className="hidden"
                                    onChange={(e) =>
                                        handleFileChange(
                                            "foto_kk",
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </div>
                            {/* Foto KTP */}
                            <div className="">
                                <div
                                    onClick={() =>
                                        handleOpenFileInput("foto_ktp")
                                    }
                                    className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer"
                                >
                                    <p>
                                        <Camera
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p>Foto KTP</p>
                                </div>
                                <input
                                    type="file"
                                    name="foto_ktp"
                                    ref={fileInputRefs.foto_ktp}
                                    className="hidden"
                                    onChange={(e) =>
                                        handleFileChange(
                                            "foto_ktp",
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </div>
                            {/* Foto Rekening Air Tetangga */}
                            <div className="">
                                <div
                                    onClick={() =>
                                        handleOpenFileInput(
                                            "foto_rekening_air_tetangga"
                                        )
                                    }
                                    className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer"
                                >
                                    <p>
                                        <Camera
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p>Foto Rekening Air Tetangga</p>
                                </div>
                                <input
                                    type="file"
                                    name="foto_rekening_air_tetangga"
                                    ref={
                                        fileInputRefs.foto_rekening_air_tetangga
                                    }
                                    className="hidden"
                                    onChange={(e) =>
                                        handleFileChange(
                                            "foto_rekening_air_tetangga",
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 items-center w-full my-2 justify-center">
                            {imagePreviews.foto_kk && (
                                <img
                                    src={imagePreviews.foto_kk}
                                    alt="Preview Foto KK"
                                    style={{ width: "100px", height: "auto" }}
                                />
                            )}
                            {imagePreviews.foto_ktp && (
                                <img
                                    src={imagePreviews.foto_ktp}
                                    alt="Preview Foto KTP"
                                    style={{ width: "100px", height: "auto" }}
                                />
                            )}
                            {imagePreviews.foto_rekening_air_tetangga && (
                                <img
                                    src={
                                        imagePreviews.foto_rekening_air_tetangga
                                    }
                                    alt="Preview Foto Rekening Air Tetangga"
                                    style={{ width: "100px", height: "auto" }}
                                />
                            )}
                        </div>
                    </div>
                    <Input
                        value={data.no_telph}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        title={"Nomor Telephone"}
                        name="no_telph"
                        errors={errors.no_telph}
                    />
                    <div className="my-1">
                        <TextArea
                            onChange={(e) =>
                                setData("alamat_pemasangan", e.target.value)
                            }
                            title={"Alamat Pemasangan"}
                            data={data.alamat_pemasangan}
                            errors={errors.alamat_pemasangan}
                        />
                    </div>
                </div>
                <div className="flex gap-x-3 items-center">
                    <button className="btn-primary flex gap-x-1 items-center">
                        <p>
                            <Add color="inerit" fontSize="inherit" />
                        </p>
                        <p>{"Tambah"}</p>
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
