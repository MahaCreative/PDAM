import Input from "@/Components/Input";
import Select from "@/Components/Select";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Print, Water } from "@mui/icons-material";
import { debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index(props) {
    const { auth } = usePage().props;
    const meteran = props.meteran;
    const count_status = props.count_status;
    const count_catat = props.count_catat;
    const [params, setParams] = useState({
        status: "",
        status_catatan: "",
        bulan: "",
        tahun: "",
        cari: "",
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
            selector: (row) => row.meteran.nama,
            width: "150px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.meteran.alamat,
            width: "150px",
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
            width: "160px",
            wrap: true,
        },
        {
            name: "Golongan",
            selector: (row) =>
                row.meteran.nama_golongan + " " + row.meteran.nama_kelompok,
            width: "130px",
            wrap: true,
        },
        {
            name: "Meteran Awal",
            selector: (row) => (
                <>
                    <p>
                        Meter Awal :{row.meter_awal} m<sup>3</sup>
                    </p>
                    <p>
                        Meter Akhir :{row.meter_akhir} m<sup>3</sup>
                    </p>
                </>
            ),
            width: "180px",
            wrap: true,
        },

        {
            name: "Total Pemakaian",
            selector: (row) => (
                <p>
                    {row.meter_pemakaian} m<sup>3</sup>
                </p>
            ),
            width: "140px",
            wrap: true,
        },
        {
            name: "Nama petugas Pencatan",
            selector: (row) => <p>{row.nama_petugas_pencatat}</p>,
            width: "200px",
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
                <p>{moment(row.tanggal_pencatatan).format("LL")}</p>
            ),
            width: "150px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) =>
                auth.roles == "petugas lapangan" && (
                    <div className="flex gap-3 items-center">
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
                    </div>
                ),
        },
    ];
    const filterStatus = (status) => {
        setParams({ ...params, status: status });
    };
    const filterStatusCatat = (status) => {
        setParams({
            ...params,
            status_catatan: status,
        });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.pencatatan-meter"), query, {
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
    const tahunSekarang = new Date().getFullYear();
    const tahunOptions = [];

    // Membuat opsi tahun dari 10 tahun sebelumnya
    for (let i = tahunSekarang; i > tahunSekarang - 10; i--) {
        tahunOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    const cetakHandler = () => {
        router.get(route("admin.cetak-pencatatan-meter"), params);
    };
    return (
        <div className="py-6">
            <div className="my-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                    onClick={() => filterStatus("lunas")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-lg md:text-xl lg:text-3xl font-bold">
                            {count_status.lunas}
                        </p>
                        <p className="text-xs md:text-xl font-light capitalize">
                            Pembayaran Lunas
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("belum lunas")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-lg md:text-xl lg:text-3xl font-bold">
                            {count_status.belum_lunas}
                        </p>
                        <p className="text-xs md:text-xl font-light capitalize">
                            Pembayaran Belum Lunas
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("")}
                    className="flex col-span-2 md:col-span-1 hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-lg md:text-xl lg:text-3xl font-bold">
                            {count_status.all}
                        </p>
                        <p className="text-xs md:text-xl font-light capitalize">
                            Total Pencatatan Meter
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
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
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-lg md:text-xl lg:text-3xl font-bold">
                            {count_catat.sudah_dicatat}
                        </p>
                        <p className="text-xs md:text-xl font-light capitalize">
                            Sudah Di Catat
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatusCatat("belum dicatat")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-lg md:text-xl lg:text-3xl font-bold">
                            {count_catat.belum_dicatat}
                        </p>
                        <p className="text-xs md:text-xl font-light capitalize">
                            Belum Dicatat
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-3">
                <div className="flex gap-3">
                    <button onClick={cetakHandler} className="flex gap-3">
                        <p className="leading-none btn-success">
                            <Print color="inherit" />
                        </p>
                    </button>
                </div>
                <div className="w-2/3 flex gap-3">
                    <Input
                        placeholder="Cari"
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                    />
                    <Select
                        classname={"capitalize"}
                        onChange={(e) =>
                            setParams({ ...params, bulan: e.target.value })
                        }
                    >
                        <option value="">Pilih Bulan Periode</option>
                        <option value="Januari">Januari</option>
                        <option value="Februari">Februari</option>
                        <option value="Maret">Maret</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">Juni</option>
                        <option value="Juli">Juli</option>
                        <option value="Agustus">Agustus</option>
                        <option value="September">September</option>
                        <option value="Oktober">Oktober</option>
                        <option value="November">November</option>
                        <option value="Desember">Desember</option>
                    </Select>
                    <Select
                        classname={"capitalize"}
                        onChange={(e) =>
                            setParams({ ...params, tahun: e.target.value })
                        }
                    >
                        <option value="">Pilih Tahun Periode</option>
                        {tahunOptions}
                    </Select>
                </div>
            </div>
            <div className="py-2 px-3 rounded-md shadow-sm shadow-gray-500/50">
                <DataTable data={meteran} columns={columns} pagination />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Data Pemakaian Air"} />
);
