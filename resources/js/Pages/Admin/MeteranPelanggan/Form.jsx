import Input from "@/Components/Input";
import SearchGolongan from "@/Components/SearchGolongan";
import SearchKelompok from "@/Components/SearchKelompok";
import SearchWilayah from "@/Components/SearchWilayah";
import { useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

export default function Form({ model, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        nik: "",
        nama: "",
        alamat: "",
        blok: "",
        no_telph: "",
        no_meteran: "",
        no_sambungan: "",
        nama_golongan: "",
        nama_kelompok: "",
        tanggal_pemasangan: "",
    });
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            nik: model ? model.nik : "",
            nama: model ? model.nama : "",
            alamat: model ? model.alamat : "",
            blok: model ? model.blok : "",
            no_telph: model ? model.no_telph : "",
            no_meteran: model ? model.no_meteran : "",
            no_sambungan: model ? model.no_sambungan : "",
            nama_golongan: model ? model.nama_golongan : "",
            nama_kelompok: model ? model.nama_kelompok : "",
            tanggal_pemasangan: model ? model.tanggal_pemasangan : "",
        });
    }, [model]);
    const getDataGolongan = (value) => {
        setData({ ...data, nama_golongan: value });
    };
    const getDataKelompok = (value) => {
        setData({ ...data, nama_kelompok: value });
    };
    const getDatawilayah = (value) => {
        setData({ ...data, wilayah_id: value });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        swalWithBootstrapButtons
            .fire({
                title: "Simpan Data Meteran Ini?",
                text: "Apakah anda yakin ingin menambahkan meteran baru.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    post(route("admin.update-meteran-pelanggan"), {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire({
                                title: "Success",
                                text: "Berhasil mengubah data meteran pelanggan ",
                                icon: "success",
                                showClass: {
                                    popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                                `,
                                },
                                hideClass: {
                                    popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                    `,
                                },
                            });
                        },
                        onError: () => {
                            Swal.fire({
                                title: "Upss",
                                text: "Gagal mengubah data meteran pelanggan ",
                                icon: "error",
                                showClass: {
                                    popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                                `,
                                },
                                hideClass: {
                                    popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                    `,
                                },
                            });
                        },
                    });
                }
            });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        swalWithBootstrapButtons
            .fire({
                title: "Simpan Data Meteran Ini?",
                text: "Apakah anda yakin ingin menambahkan meteran baru.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    post(route("admin.create-meteran-pelanggan"), {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire({
                                title: "Success",
                                text: "Berhasil menambahkan 1 meteran pelanggan baru",
                                icon: "success",
                                showClass: {
                                    popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                                `,
                                },
                                hideClass: {
                                    popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                    `,
                                },
                            });
                        },
                        onError: () => {
                            Swal.fire({
                                title: "Upss",
                                text: "Gagal menambahkan 1 meteran pelanggan ",
                                icon: "error",
                                showClass: {
                                    popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                                `,
                                },
                                hideClass: {
                                    popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                    `,
                                },
                            });
                        },
                    });
                }
            });
    };
    return (
        <form
            className="w-[90vw]"
            onSubmit={model ? updateHandler : submitHandler}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"NIK"}
                    name="nik"
                    value={data.nik}
                    errors={errors.nik}
                />
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Nama"}
                    name="nama"
                    value={data.nama}
                    errors={errors.nama}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Alamat"}
                    name="alamat"
                    value={data.alamat}
                    errors={errors.alamat}
                />
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Blok Rumah"}
                    name="blok"
                    value={data.blok}
                    errors={errors.blok}
                />
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Nomor Telephone"}
                    name="no_telph"
                    value={data.no_telph}
                    errors={errors.no_telph}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"Nomor Meter"}
                    name="no_meteran"
                    value={data.no_meteran}
                    errors={errors.no_meteran}
                />
                <Input
                    onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                    }
                    title={"No Sambungan"}
                    name="no_sambungan"
                    value={data.no_sambungan}
                    errors={errors.no_sambungan}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <SearchGolongan
                    model={model?.nama_golongan}
                    getData={getDataGolongan}
                    title={"Cari Golongan Pemasangan"}
                    errors={errors.nama_golongan}
                />
                <SearchKelompok
                    dataGolongan={data.nama_golongan}
                    model={model?.nama_kelompok}
                    getData={getDataKelompok}
                    title={"Cari Kelompok Pemasangan"}
                    errors={errors.nama_kelompok}
                />
            </div>
            <div className="my-3 flex gap-3">
                <button className="flex gap-3 items-center btn-primary">
                    <Save color="inherit" fontSize="inherit" />
                    {model ? "Update" : "Simpan"}
                </button>
                <button
                    onClick={() => setOpen()}
                    type="button"
                    className="flex gap-3 items-center btn-danger"
                >
                    <Cancel color="inherit" fontSize="inherit" />
                    Cancell
                </button>
            </div>
        </form>
    );
}
