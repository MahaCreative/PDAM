import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import {
    Add,
    Print,
    ProductionQuantityLimitsSharp,
    Refresh,
    Water,
} from "@mui/icons-material";
import { Tooltip, debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Form from "./Form";
import Input from "@/Components/Input";
export default function Index(props) {
    const meteran = props.meteran;
    const count_status = props.count_status;
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(false);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    const [params, setParams] = useState({
        status: "",
        cari: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "No Meter",
            selector: (row, index) => row.no_meteran,
            width: "150px",
            wrap: true,
        },
        {
            name: "No Sambungan",
            selector: (row, index) => row.no_sambungan,
            width: "150px",
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row, index) => row.nama,
            width: "150px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row, index) => row.alamat,
            width: "200px",
            wrap: true,
        },
        {
            name: "Blok",
            selector: (row, index) => row.blok,
            width: "100px",
            wrap: true,
        },
        {
            name: "Nama Golongan",
            selector: (row, index) =>
                row.nama_golongan + " " + row.nama_kelompok,
            width: "150px",
            wrap: true,
        },
        {
            name: "Tanggal Pemasangan",
            selector: (row, index) =>
                moment(row.tanggal_pemasangan).format("LL"),
            width: "150px",
            wrap: true,
        },
        {
            name: "Status",
            selector: (row) => (
                <div
                    className={`${
                        row.status_meteran == "aktif"
                            ? "text-green-500"
                            : row.status_meteran == "non aktif"
                            ? "text-red-500"
                            : "text-orange-500"
                    }`}
                >
                    {row.status_meteran}
                </div>
            ),
            width: "150px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className={`flex gap-2`}>
                    <button
                        onClick={() => editHandler(row)}
                        className="btn-warning"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteHandler(row.id)}
                        className="btn-danger"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    const filterStatus = (status) => {
        setParams({ ...params, status: status });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.meteran-pelanggan"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const deleteHandler = (id) => {
        // router.delete()
        swalWithBootstrapButtons
            .fire({
                title: "Hapus Meteran?",
                text: "Apakah anda yakin ingin menghapus data meteran pelanggan ini? Menghapus meteran ini akan membuat data terkait ikut terhapus juga.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(
                        route("admin.delete-meteran-pelanggan", { id: id }),

                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Berhasil menghapus meteran pelanggan",
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
                                    text: "Gagal menghapus meteran pelanggan",
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
                        }
                    );
                }
            });
    };
    const editHandler = (row) => {
        setModalTambah(true);
        setModel(row);
    };
    const cetakHandler = () => {
        router.get(route("admin.cetak-meteran-pelanggan"), params);
    };
    const reset = () => {
        setParams({
            ...params,
            status: "",
            cari: "",
            dari_tanggal: "",
            sampai_tanggal: "",
        });
    };
    const prosesStatusMeteran = () => {
        swalWithBootstrapButtons
            .fire({
                title: "Update Statu",
                text: "Anda akan mengupdate status meteran pelanggan?, jika pelanggan memiliki tunggakan tagihan sebanyak 3 kali maka status meteran pelanggan akan diupdate menjadi pencabutan sementara sedangkan jika lebih dari 5 kali maka status akan diubah menjadi non aktif",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        route("admin.proses-meteran-pelanggan"),

                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Berhasil mengupdate status meteran pelanggan",
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
                                    text: "Gagal mengupdate status meteran pelanggan",
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
                        }
                    );
                }
            });
    };
    return (
        <div className="py-6">
            {/* Modal */}
            <div>
                <Modal
                    open={modalTambah}
                    setOpen={() => {
                        setModalTambah(false);
                        setModel(null);
                    }}
                    title={
                        model
                            ? " Edit Meteran Pelanggan"
                            : "Tambah Meteran Pelanggan Baru"
                    }
                >
                    <Form
                        model={model}
                        setOpen={() => {
                            setModel(null);
                            setModalTambah(false);
                        }}
                    />
                </Modal>
            </div>
            <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div
                    onClick={() => filterStatus("aktif")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            {count_status.aktif}
                        </p>
                        <p className="text-xl font-light capitalize">
                            Meteran Aktif
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("non aktif")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">{count_status.non}</p>
                        <p className="text-xl font-light capitalize">
                            Meteran Non Aktif
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("pencabutan sementara")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">{count_status.non}</p>
                        <p className="text-xl font-light capitalize">
                            Pencabutan Sementara
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus(null)}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">{count_status.all}</p>
                        <p className="text-xl font-light capitalize">
                            Total Meteran
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-3 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => setModalTambah(true)}
                        className=" btn-primary flex items-center"
                    >
                        <p className="leading-none btn-primary">
                            <Add color="inherit" fontSize="inherit" />
                        </p>
                        <p>Tambah</p>
                    </button>
                    <button
                        onClick={() => prosesStatusMeteran()}
                        className=" btn-warning flex items-center"
                    >
                        <p className="leading-none btn-warning">
                            <ProductionQuantityLimitsSharp
                                color="inherit"
                                fontSize="inherit"
                            />
                        </p>
                        <p>Proses Status Meteran</p>
                    </button>
                    <button onClick={cetakHandler} className="flex gap-3">
                        <p className="leading-none btn-success">
                            <Print color="inherit" />
                        </p>
                    </button>
                </div>
                <div className="w-2/2 flex gap-3 items-center">
                    <Input
                        value={params.cari}
                        title={""}
                        placeholder="Cari"
                        onChange={(e) =>
                            setParams({
                                ...params,
                                cari: e.target.value,
                            })
                        }
                    />
                    <Input
                        value={params.dari_tanggal}
                        type="date"
                        title={"Tanggal Pemasangan Dari"}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                dari_tanggal: e.target.value,
                            })
                        }
                    />
                    <Input
                        type="date"
                        value={params.sampai_tanggal}
                        title={"Tanggal Pemasangan Sampai"}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                dari_tanggal: e.target.value,
                            })
                        }
                    />
                    <Tooltip title="Reset Filter">
                        <button onClick={reset} className="btn-warning">
                            <p>
                                <Refresh color="inherrit" fontSize="inherit" />
                            </p>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div className="bg-white py-2 px-3 shadow-md shadow-gray-500/50">
                <DataTable data={meteran} columns={columns} pagination />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Kelola Meteran Pelanggan"} />
);
