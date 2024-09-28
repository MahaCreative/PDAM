import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useRef, useState } from "react";

import provider from "@/Pages/Pelanggan/Pengaduan/provider";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { router, useForm, usePage } from "@inertiajs/react";
import moment from "moment";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { MenuItem } from "@mui/material";
import Swal from "sweetalert2";

export default function Show(props) {
    const pengaduan = props.pengaduan;
    const { auth } = usePage().props;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });
    const mapRef = useRef();
    const icon = L.icon({
        iconUrl: "/storage/Image/marker.png",
        iconSize: [25, 25],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    });
    const zoom = 25;
    console.log(pengaduan);
    const { data, setData, post, errors } = useForm({
        id: pengaduan.id,
        nama_petugas_menangani: pengaduan.nama_petugas_menangani,
        no_hp_petugas: pengaduan.nomor_handphone_petugas,
        status_fakta: pengaduan.status_fakta ? pengaduan.status_fakta : "",
        hasil_lapangan: pengaduan.hasil_lapangan
            ? pengaduan.hasil_lapangan
            : "",
        status: pengaduan.status ? pengaduan.status : "",
        tanggal_proses: moment(new Date()).format("LL"),
    });
    const konfirmasi = (id, status) => {
        swalWithBootstrapButtons
            .fire({
                title: "Konfirmasi Pengaduan ?",
                text:
                    status == "terima"
                        ? "Apakah anda yakin ingin menerima pengaduan?"
                        : "Apakah anda yakin ingin menolak pengaduan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText:
                    status == "terima" ? "Terima Pengaduan" : "Tolak Pengaduan",
                cancelButtonText: "Batalkan Konfirmasi",
                reverseButtons: true,
            })

            .then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        route("admin.konfirmasi-pengaduan"),
                        { id: id, status: status },
                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Berhasil melakukan konfirmasi pengaduan pelanggan",
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
                                        : "Berhasil melakukan konfirmasi pengaduan pelanggan",
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
    const prosesPengaduan = (e) => {
        e.preventDefault();

        swalWithBootstrapButtons
            .fire({
                title: "Update Proses Pengaduan ?",
                text: "Apakah anda yakin ingin mengupdate proses pengaduan pelanggan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yakin",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })

            .then((result) => {
                if (result.isConfirmed) {
                    post(route("admin.proses-pengaduan"), {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire({
                                title: "Success",
                                text: "Berhasil melakukan update proses pengaduan pelanggan",
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
                                    : "Berhasil melakukan update proses pengaduan pelanggan",
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
        <div className="py-6">
            <h3 className="font-semibold text-blue-500">
                Buat Pengaduan Pelanggan Baru
            </h3>

            <div className="w-full h-full">
                <MapContainer
                    center={[pengaduan.langtitude, pengaduan.longtitude]}
                    className="w-full h-[50vh] rounded-md shadow-sm shadow-gray-500 z-10 relative"
                    ref={mapRef}
                    zoom={zoom}
                >
                    <Marker
                        position={[pengaduan.langtitude, pengaduan.longtitude]}
                    >
                        <Popup className="">
                            <div className="tracking-tighter leading-none">
                                <div className=" border-b border-gray-500">
                                    <p className="capitalize font-bold text-blue-500">
                                        {
                                            pengaduan.jenis_pengaduan
                                                .jenis_pengaduan
                                        }
                                    </p>
                                </div>
                                <p>{pengaduan.nama_pelapor}</p>
                                <p>{pengaduan.pengaduan}</p>
                                <p className="text-blue-500">
                                    {moment(pengaduan.tanggal_pengaduan).format(
                                        "LL"
                                    )}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                    <TileLayer
                        url={provider.maptier.url}
                        attribution={provider.maptier.attribution}
                    />
                </MapContainer>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-3">
                <div className="my-3 py-2 px-3 rounded-md shadow-sm shadow-gray-500/50 w-full">
                    <h3 className="font-bold text-blue-500 capitalize">
                        Informasi pengaduan
                    </h3>
                    <div className="flex gap-3 items-start">
                        <img
                            src={"/storage/" + pengaduan.foto}
                            alt=""
                            className="w-[150px] h-[100px] object-cover"
                        />
                        <div className="w-full">
                            <div className="py-1 px-3 bg-blue-200  rounded-md font-semibold my-2">
                                Kode Pengaduan : {pengaduan.kd_pengaduan}
                            </div>
                            <div className="py-1 px-3 bg-blue-200  rounded-md font-semibold my-2">
                                Tanggal Pengaduan:{" "}
                                {moment(pengaduan.tanggal_pengaduan).format(
                                    "ll"
                                )}
                            </div>
                            <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                                <p className="w-[90px] md:w-[180px]">
                                    Nama Pelapor
                                </p>
                                <p>:</p>
                                <p>{pengaduan.nama_pelapor}</p>
                            </div>
                            <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                                <p className="w-[90px] md:w-[180px]">Telp</p>
                                <p>:</p>
                                <p>{pengaduan.no_telp}</p>
                            </div>
                            <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                                <p className="w-[90px] md:w-[180px]">Alamat</p>
                                <p>:</p>
                                <p>{pengaduan.alamat}</p>
                            </div>
                            <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                                <p className="w-[90px] md:w-[180px]">
                                    Status Pengaduan
                                </p>
                                <p>:</p>
                                <p>
                                    {pengaduan.status_konfirmasi == "terima"
                                        ? "Pengaduan Di Terima"
                                        : pengaduan.status_konfirmasi ==
                                          "ditolak"
                                        ? "Pengaduan Di Tolak"
                                        : "Menunggu Konfirmasi"}
                                </p>
                            </div>
                            <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                                <p className="w-[90px] md:w-[180px]">
                                    Status Proses
                                </p>
                                <p>:</p>
                                <p>{pengaduan.status}</p>
                            </div>
                            <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                                <p className="w-[90px] md:w-[180px] font-semibold text-blue-500">
                                    Pengaduan
                                </p>
                            </div>
                            <p className="text-xs md:text-base py-1 px-2 bg-blue-100 rounded-md">
                                {pengaduan.pengaduan}
                            </p>
                        </div>
                    </div>
                    {auth.roles == "admin" && (
                        <>
                            {pengaduan.status_konfirmasi ==
                                "menunggu konfirmasi" && (
                                <div className="flex gap-3 justify-end py-3">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                konfirmasi(
                                                    pengaduan.id,
                                                    "terima"
                                                )
                                            }
                                            className="btn-primary"
                                        >
                                            Terima Pengaduan
                                        </button>
                                        <button
                                            onClick={() =>
                                                konfirmasi(
                                                    pengaduan.id,
                                                    "tolak"
                                                )
                                            }
                                            className="btn-danger"
                                        >
                                            Tolak Pengaduan
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="my-3 py-2 px-3 rounded-md shadow-sm shadow-gray-500/50 w-full">
                    <h3 className="font-bold text-blue-500 capitalize">
                        Informasi Proses pengaduan
                    </h3>
                    <div className="py-1 px-3 bg-blue-200  rounded-md font-semibold my-2">
                        Nama Petugas :{" "}
                        {pengaduan.nama_petugas_menangani
                            ? pengaduan.nama_petugas_menangani
                            : " -"}
                    </div>
                    <div className="py-1 px-3 bg-blue-200  rounded-md font-semibold my-2">
                        Kontak Petugas :{" "}
                        {pengaduan.nomor_handphone_petugas
                            ? pengaduan.nomor_handphone_petugas
                            : " -"}
                    </div>
                    <div className="py-1 px-3 bg-blue-200  rounded-md font-semibold my-2">
                        Tanggal Proses Pengaduan:
                        {pengaduan.tanggal_proses_pengaduan
                            ? moment(pengaduan.tanggal_proses_pengaduan).format(
                                  "ll"
                              )
                            : " -"}
                    </div>
                    <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                        <p className="w-[90px] md:w-[180px]">Fakta Lapangan</p>
                        <p>:</p>
                        <p>
                            {pengaduan.status_fakta == "ya"
                                ? "Sesuai pengaduan"
                                : "Tidak Sesuai pengaduan"}
                        </p>
                    </div>
                    <div className="flex gap-4 items-start text-xs md:text-base capitalize">
                        <p className="w-[90px] md:w-[180px]">Hasil Lapangan</p>
                        <p>:</p>
                        <p>
                            {pengaduan.hasil_lapangan
                                ? pengaduan.hasil_lapangan
                                : "-"}
                        </p>
                    </div>

                    {(auth.roles == "admin" ||
                        auth.roles === "petugas lapangan") && (
                        <>
                            {pengaduan.status_konfirmasi == "terima" && (
                                <div className="my-3 py-1 px-3 rounded-md shadow-md shadow-gray-500/50">
                                    <h3 className="font-semibold text-blue-500">
                                        Form Proses Pengaduan
                                    </h3>
                                    <form onSubmit={prosesPengaduan}>
                                        <Input
                                            classname={"hidden"}
                                            value={data.id}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    id: pengaduan.id,
                                                })
                                            }
                                        />
                                        <Input
                                            title={"Nama Petugas"}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    nama_petugas_menangani:
                                                        e.target.value,
                                                })
                                            }
                                            disabled
                                            value={data.nama_petugas_menangani}
                                        />
                                        <Input
                                            title={"Nomor Hp Petugas"}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    no_hp_petugas:
                                                        e.target.value,
                                                })
                                            }
                                            disabled
                                            value={data.no_hp_petugas}
                                        />
                                        <Input
                                            title={"Tanggal Proses Pengaduan"}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    tanggal_proses:
                                                        e.target.value,
                                                })
                                            }
                                            disabled
                                            value={data.tanggal_proses}
                                        />
                                        <Select
                                            title="Status Di Lapangan"
                                            errors={errors.status_fakta}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    status_fakta:
                                                        e.target.value,
                                                })
                                            }
                                        >
                                            <option value={""} disabled>
                                                {pengaduan.status_fakta == null
                                                    ? "Pilih Status Fakta Di Lapangan"
                                                    : pengaduan.status_fakta ==
                                                      "ya"
                                                    ? "Sesuai dengan pengaduan pelanggan"
                                                    : "Tidak sesuai dengan pengaduan pelanggan"}
                                            </option>
                                            <option value={"ya"}>
                                                Sesuai dengan pengaduan
                                                pelanggan
                                            </option>
                                            <option value={"tidak"}>
                                                Tidak sesuai dengan pengaduan
                                                pelanggan
                                            </option>
                                        </Select>
                                        <Select
                                            title="Status Proses Pengaduan"
                                            errors={errors.status}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    status: e.target.value,
                                                })
                                            }
                                        >
                                            <option value={""} disabled>
                                                {pengaduan.status
                                                    ? pengaduan.status
                                                    : "Pilih Proses Pengaduan"}
                                            </option>
                                            <option value={"dihentikan"}>
                                                Dihentikan
                                            </option>
                                            <option value={"diperbaiki"}>
                                                Diperbaiki
                                            </option>
                                            <option value={"selesai"}>
                                                Selesai
                                            </option>
                                        </Select>
                                        <Input
                                            title={
                                                "Deskripsi Hasil dan Penyelesaian Pengaduan"
                                            }
                                            errors={errors.hasil_lapangan}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    hasil_lapangan:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                        <button className="my-3 btn-primary">
                                            Update Proses{" "}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <AdminLayout children={page} title={"Buat Pengaduan Baru"} />
);
