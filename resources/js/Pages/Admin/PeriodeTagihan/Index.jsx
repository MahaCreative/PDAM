import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Add, Water } from "@mui/icons-material";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "moment/min/moment-with-locales";
export default function Index(props) {
    const periode = props.periode;
    var date = moment(new Date()).toDate();
    const formatter = new Intl.DateTimeFormat("id", {
        month: "long",
    });
    const bulan = formatter.format(date);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
            wrap: true,
        },
        {
            name: "Kode Periode",
            selector: (row) => row.kode_periode,
            width: "120px",
            wrap: true,
        },
        {
            name: "Periode Tagihan",
            selector: (row) => row.periode_tagihan,
            width: "140px",
            wrap: true,
        },
        {
            name: "Meteran Tercatat",
            selector: (row) => (
                <div>
                    <p>Jumlah : {row.sudah_dicatat} Meteran</p>
                </div>
            ),
            width: "175px",
        },
        {
            name: "Meteran Belum Tercatat",
            selector: (row) => (
                <div>
                    <p>Jumlah : {row.belum_dicatat} Meteran</p>
                </div>
            ),
            width: "205px",
            wrap: true,
        },
        {
            name: "Jumlah Pembayaran Lunas",
            selector: (row) => (
                <div>
                    <p>Jumlah : {row.pemakaian_lunas} Meteran Lunas</p>
                </div>
            ),
            width: "225px",
        },
        {
            name: "Jumlah Pembayaran Belum Lunas",
            selector: (row) => (
                <div>
                    <p>
                        Jumlah : {row.pemakaian_belum_lunas} Meteran Belum Lunas
                    </p>
                </div>
            ),
            width: "275px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className={`flex gap-2`}>
                    <Link
                        href={route("admin.show-periode-tagihan", {
                            id: row.id,
                        })}
                        as="button"
                        className="btn-primary"
                    >
                        Show
                    </Link>

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
                title: "Hapus periode tagihan?",
                text: "Apakah anda yakin ingin menghapus data periode tagihan ini? Menghapus data akan menghapus data terkait lainnya.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(
                        route("admin.delete-periode-tagihan", { id: id }),

                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Berhasil menghapus periode tagihan",
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
                                    text: "Gagal menghapus periode tagihan",
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

    const tambah = () => {
        swalWithBootstrapButtons
            .fire({
                title:
                    "Apakah anda yakin membuat periode tagihan " +
                    moment(new Date()).format("MMMM YYYY") +
                    " ?",
                text: "Membuat periode tagihan akan menambahkan pencatatan meter dan tagihan pelanggan secara default",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(
                        route("admin.create-periode-tagihan", {
                            bulan: bulan,
                            // bulan: "juni",
                            tahun: moment(new Date()).format("YYYY"),
                        }),

                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text:
                                        "Berhasil membuat periode tagihan " +
                                        moment(new Date()).format("MMMM YYYY"),
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
                            onError: (error) => {
                                Swal.fire({
                                    title: "Upss",
                                    text: error.message,
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

            <div className="my-3 flex justify-between items-center">
                <button
                    onClick={() => tambah()}
                    className="btn-primary flex gap-3 leading-none"
                >
                    <Add color="inherit" fontSize="inherit" />
                    Tambah
                </button>
            </div>
            {/*  */}

            {/*  */}
            <div className="bg-white py-2 px-3 shadow-md shadow-gray-500/50">
                <DataTable data={periode} columns={columns} pagination />
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title="Kelola Periode Tagihan" />
);
