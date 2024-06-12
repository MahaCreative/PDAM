import Input from "@/Components/Input";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import ReactSelect from "react-select";
import Swal from "sweetalert2";

export default function Form(props) {
    const jenisPengaduan = props.jenisPengaduan;
    const loc = props.loc;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    const { data, setData, post, reset, errors } = useForm({
        jenis_pengaduan_id: "",
        nama_pelapor: "",
        alamat: "",
        no_telp: "",
        langtitude: "",
        longtitude: "",
        pengaduan: "",
        foto: "",
        tanggal_pengaduan: "",
        status_konfirmasi: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        swalWithBootstrapButtons
            .fire({
                title: "Kirim Pengaduan ?",
                text: "Apakah pengajuan yang anda nyatakan sudah benar?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Kirim Permintaan",
                cancelButtonText: "Batalkan Permintaan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    post(route("pelanggan.store-pengaduan-pelanggan"), {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire({
                                title: "Success",
                                text: "Berhasil melakukan pengajuan pelanggan baru, silahkan menunggu petugas menghubungi anda",
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
                        onError: (err) => {
                            console.log(err);
                            Swal.fire({
                                title: "Gagal",
                                text: err?.message
                                    ? err?.message
                                    : "Gagal melakukan pengaduan, silahkan check formulir pengaduan anda",
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
    const kembali = () => {
        swalWithBootstrapButtons
            .fire({
                title: "Ingin membatalkan ?",
                text: "Apakah anda yakin ingin membatalkan pengaduan anda?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya Batalkan",
                cancelButtonText: "Lanjutkan Pengaduan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.get(route("pelanggan.pengaduan-pelanggan"));
                }
            });
    };
    useEffect(() => {
        setData({ ...data, langtitude: loc.lat, longtitude: loc.lng });
    }, [loc]);

    return (
        <form className="w-full" onSubmit={submitHandler}>
            <div>
                <label htmlFor="">Jenis Pengaduan</label>
                <ReactSelect
                    onChange={(e) =>
                        setData({ ...data, jenis_pengaduan_id: e.value })
                    }
                    options={jenisPengaduan.map((item) => ({
                        value: item.id,
                        label: item.jenis_pengaduan,
                    }))}
                />
                <Input
                    title={"Nama Pelapor"}
                    name="nama_pelapor"
                    errors={errors.nama_pelapor}
                    value={data.nama_pelapor}
                    onChange={changeHandler}
                />

                <Input
                    title={"Telph"}
                    name="no_telp"
                    errors={errors.no_telp}
                    value={data.no_telp}
                    onChange={changeHandler}
                />
                <Input
                    title={"Alamat Pengaduan"}
                    name="alamat"
                    errors={errors.alamat}
                    value={data.alamat}
                    onChange={changeHandler}
                />
                <Input
                    title={"Pengaduann"}
                    name="pengaduan"
                    errors={errors.pengaduan}
                    value={data.pengaduan}
                    onChange={changeHandler}
                />
                <Input
                    type="file"
                    title={"foto"}
                    name="pengaduan"
                    errors={errors.foto}
                    onChange={(e) =>
                        setData({ ...data, foto: e.target.files[0] })
                    }
                />
            </div>
            <div className="my-3 flex gap-3">
                <button className="btn-primary">Ajukan Pengaduan</button>
                <button type="button" onClick={kembali} className="btn-danger">
                    Kembali
                </button>
            </div>
        </form>
    );
}
