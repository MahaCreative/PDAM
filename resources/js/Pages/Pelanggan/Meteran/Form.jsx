import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function Form({ setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        nomor_meter: "",
        nomor_sambungan: "",
    });
    const postHandler = (e) => {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Tambah Meteran Saya ?",
                text:
                    "Apakah anda yakin ingin menambahkan 1 data meteran baru dengan No Meter " +
                    data.nomor_meter +
                    " No Sambungan " +
                    data.nomor_sambungan,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Kirim Permintaan",
                cancelButtonText: "Batalkan Permintaan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    post(route("pelanggan.store-meteran-pelanggan"), {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire({
                                title: "Anda telah berhasil menambahkan 1 Meteran Baru Ke Akun Anda",
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
                    });
                }
            });
    };
    return (
        <form onSubmit={postHandler}>
            <Input
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                title={"Nomor Meteran"}
                value={data.nomor_meter}
                errors={errors.nomor_meter}
                name="nomor_meter"
            />
            <Input
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                title={"Nomor Sambungan"}
                value={data.nomor_sambungan}
                errors={errors.nomor_sambungan}
                name="nomor_sambungan"
            />
            <div className="my-3 flex gap-3">
                <button className="btn-primary">Tambah Meteran</button>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn-danger"
                >
                    Batalkan
                </button>
            </div>
        </form>
    );
}
