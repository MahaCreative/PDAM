import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
export default function Index(props) {
    const meteranSaya = props.meteranSaya;
    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        {
            name: "Nama",
            selector: (row) => row.nama,
            width: "150px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat,
            width: "150px",
            wrap: true,
        },
        {
            name: "Blok",
            selector: (row) => row.blok,
            width: "70px",
            wrap: true,
        },
        {
            name: "Nomor Sambungan ",
            selector: (row) => row.no_sambungan,
            width: "150px",
            wrap: true,
        },
        {
            name: "Nomor Meter ",
            selector: (row) => row.no_meteran,
            width: "150px",
            wrap: true,
        },
        {
            name: "Tagihan Bulanan ",
            selector: (row) => row.tagihan_count + " Tagihan Bulanan",
            width: "150px",
            wrap: true,
        },
        {
            name: "Tagihan Lunas ",
            selector: (row) => row.lunas + " Tagihan Lunas",
            width: "150px",
            wrap: true,
        },
        {
            name: "Tagihan Belum Lunas ",
            selector: (row) => row.belum_lunas + " Tagihan Belum Lunas",
            width: "150px",
            wrap: true,
        },
        {
            name: "Tagihan Belum Lunas ",
            selector: (row) => (
                <div className="flex flex-col gap-1">
                    <Link
                        as="button"
                        href={route(
                            "pelanggan.show-tagihan-bulanan-saya",
                            row.id
                        )}
                        className="btn-primary"
                    >
                        Lihat Pemakaian Air
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
    const [modalTambah, setModalTambah] = useState(false);
    const deleteHandler = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Hapus Meteran Saya ?",
                text: "Apakah anda yakin ingin menghapus data meteran ini? anda tidak akan lagi melihat tagihan dan pemakaian air jika anda menghapus meteran ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya! Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(
                        route("pelanggan.delete-meteran-pelanggan", { id: id }),

                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Berhasil menghapus meteran, anda tidak lagi bisa melihat data terkait meteran yang baru saja anda hapus",
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
                                    title: error.nessage,
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
                    setOpen={setModalTambah}
                    title={"Tambah Meteran saya"}
                >
                    <div className="w-[90vw] md:w-[50vw]">
                        <p className="py-1 px-2 rounded-md bg-blue-200">
                            Setelah anda menambahkan meteran baru, anda akan
                            melihat tagihan pelanggan dan catatan pemakaian air.
                            Silahkan memasukkan Nomor Meteer dan Nomor Sambungan
                            Pelanggan
                        </p>
                        <div className="my-3">
                            <Form setOpen={setModalTambah} />
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="my-3 flex justify-between items-center">
                <button
                    onClick={() => setModalTambah(true)}
                    className="btn-primary flex gap-3 leading-none"
                >
                    <Add color="inherit" fontSize="inherit" />
                    Tambah
                </button>
            </div>

            <div className="py-2 px-3 rounded-md shadow-sm shadow-gray-500/50">
                <DataTable data={meteranSaya} columns={columns} pagination />
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout children={page} title={"Meteran Saya"} />;
