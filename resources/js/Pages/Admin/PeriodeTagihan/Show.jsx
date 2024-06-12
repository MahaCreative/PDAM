import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Water } from "@mui/icons-material";
import { debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Show(props) {
    const meteran = props.meteran;
    const periode = props.periode;
    const count_status = props.count_status;
    const count_catat = props.count_catat;
    const [params, setParams] = useState({
        id: periode.id,
        status: "",
        status_catatan: "",
    });
    const [modalTambah, setModalTambah] = useState(false);
    const [model, setModel] = useState(null);

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Nama Pelanggan",
            selector: (row) => (
                <div>
                    <p>{row.meteran.nama}</p>
                    <p>No Sam: {row.meteran.no_sambungan}</p>
                    <p>No Met: {row.meteran.no_meteran}</p>
                </div>
            ),
            width: "200px",
            wrap: true,
        },

        {
            name: "Status Pembayaran",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pembayaran == "lunas"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {row.status_pembayaran}
                </p>
            ),
            width: "155px",
            wrap: true,
        },
        {
            name: "Golongan",
            selector: (row) =>
                row.meteran.nama_golongan + " " + row.meteran.nama_kelompok,
            width: "100px",
            wrap: true,
        },
        {
            name: "Pemakaian",
            selector: (row) => (
                <>
                    <p>
                        Meter Awal :{row.meter_awal} m<sup>3</sup>
                    </p>
                    <p>
                        Meter Akhir :{row.meter_akhir} m<sup>3</sup>
                    </p>
                    <p>
                        Total Pemakaian :{row.meter_pemakaian} m<sup>3</sup>
                    </p>
                </>
            ),
            width: "210px",
            wrap: true,
        },

        {
            name: "Periode Tagihan",
            selector: (row) => (
                <div className="">
                    {" "}
                    <p>{row.periode.periode_tagihan}</p>
                    <p>{row.status_pencatatan}</p>
                </div>
            ),
            width: "150px",
            wrap: true,
        },
        {
            name: "Tanggal Pencatan",
            selector: (row) => (
                <>
                    <p>
                        Tanggal : {moment(row.tanggal_pencatatan).format("LL")}
                    </p>
                    <p>Nama Pencatat: {row.nama_petugas_pencatat}</p>
                </>
            ),
            width: "210px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    {row.status_pencatatan == "belum dicatat" && (
                        <Link
                            as="button"
                            href={route(
                                "admin.catat-pemakaian-air-pelanggan",
                                row.id
                            )}
                            className="btn-primary"
                        >
                            Catat Meteran
                        </Link>
                    )}
                    {row.status_pembayaran !== "lunas" ? (
                        <button
                            onClick={() => deleteHandler(row.id)}
                            className="btn-danger"
                        >
                            Delete
                        </button>
                    ) : (
                        <button
                            onClick={() => print(row.id)}
                            className="btn-primary"
                        >
                            Cetak Invoice
                        </button>
                    )}
                </div>
            ),
        },
    ];
    const filterStatus = (status) => {
        setParams({ ...params, status: status });
    };
    const filterStatusCatat = (status) => {
        setParams({ ...params, status_catatan: status });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.show-periode-tagihan"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => {
        reload(params);
    }, [params]);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });
    const deleteHandler = (id) => {
        // router.delete()
        swalWithBootstrapButtons
            .fire({
                title: "Hapus data pemakaian?",
                text: "Apakah anda yakin ingin menghapus data pemakaian air ini? Menghapus data akan menghapus data terkait lainnya.",
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
    const print = (id) => {
        const url = route("invoice", { id: id }); // URL yang ingin Anda buka
        const windowName = "_blank"; // Nama window atau target
        const windowFeatures = "width=840,height=490"; // Fitur window yang menentukan ukuran

        // Membuka tab baru dengan URL, nama, dan fitur yang ditentukan
        window.open(url, windowName, windowFeatures);
    };
    return (
        <div className="py-6">
            <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                    onClick={() => filterStatus("lunas")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            {count_status.lunas}
                        </p>
                        <p className="text-xl font-light capitalize">
                            Pembayaran Lunas
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("belum lunas")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            {count_status.belum_lunas}
                        </p>
                        <p className="text-xl font-light capitalize">
                            Pembayaran Belum Lunas
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">{count_status.all}</p>
                        <p className="text-xl font-light capitalize">
                            Total Pencatatan Meter
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    onClick={() => filterStatusCatat("sudah dicatat")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            {count_catat.sudah_dicatat}
                        </p>
                        <p className="text-xl font-light capitalize">
                            Sudah Di Catat
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatusCatat("belum dicatat")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-3xl font-bold">
                            {count_catat.belum_dicatat}
                        </p>
                        <p className="text-xl font-light capitalize">
                            Belum Dicatat
                        </p>
                        <p className="text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-2 px-3 rounded-md shadow-sm shadow-gray-500/50">
                <DataTable data={meteran} columns={columns} pagination />
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <AdminLayout children={page} title={"Daftar Pemakaian Air"} />
);
