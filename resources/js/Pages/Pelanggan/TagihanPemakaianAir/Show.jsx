import InputUang from "@/Components/InputUang";
import AdminLayout from "@/Layouts/AdminLayout";
import moment from "moment";
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { Link, router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Show(props) {
    const tagihan = props.tagihan;
    const bank = props.bank;
    const { auth } = usePage().props;
    const [token, setToken] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) => moment(row.created_at).format("LL"),
        },
        {
            name: "Foto bukti Pembayaran",
            selector: (row) => (
                <a
                    href={"/storage/" + row.foto_bukti_pembayaran}
                    target="_blank"
                >
                    <img
                        src={"/storage/" + row.foto_bukti_pembayaran}
                        alt=""
                        className="w-[150px]"
                    />
                </a>
            ),
        },
        {
            name: "Data Bank PDAM",
            selector: (row) => (
                <div>
                    <p>Bank Pdam: {row.bank_pdam}</p>
                    <p>Nama Pdam: {row.nama_pdam}</p>
                    <p>Rek Pdam: {row.rek_pdam}</p>
                </div>
            ),
        },
        {
            name: "Data Pengirim",
            selector: (row) => (
                <div>
                    <p>Bank pengirim: {row.bank_pengirim}</p>
                    <p>Nama pengirim: {row.nama_pengirim}</p>
                    <p>Rek pengirim: {row.no_rek_pengirim}</p>
                </div>
            ),
        },
        {
            name: "Status Pembayaran",
            selector: (row) => <div>{row.status_pembayaran}</div>,
            wrap: true,
        },
        {
            name: "Nama Petugas Konfirmasi",
            selector: (row) => <div>{row.nama_petugas_konfirmasi}</div>,
        },
        auth.roles == "admin" && {
            name: "Aksi",
            selector: (row) =>
                row.status_pembayaran == "menunggu konfirmasi" && (
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() =>
                                konfirmasi("pembayaran di terima", row.id)
                            }
                            className="btn-primary"
                        >
                            Terima Pembayaran
                        </button>
                        <button
                            onClick={() =>
                                konfirmasi("pembayaran di tolak", row.id)
                            }
                            className="btn-danger"
                        >
                            Tolak Pembayaran
                        </button>
                    </div>
                ),
        },
    ];
    const konfirmasi = (status, id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title:
                    status == "pembayaran di tolak"
                        ? "Tolak Pembayaran"
                        : "Terima Pembayaran",
                text:
                    status == "pembayaran di tolak"
                        ? "Apakah anda yakin ingin menolak pembayaran ini?"
                        : "Apakah anda yakin ingin menerima pembayaran ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText:
                    status == "pembayaran di tolak"
                        ? "Tolak Pembayaran"
                        : "Terima Pembayaran",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        route("admin.konfirmasi-pembayaran-pelanggan", {
                            status: status,
                            id: id,
                        }),
                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Berhasil melakukan konfirmasi pembayaran pelanggan",
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
                                    title: "Error",
                                    text: "Gagal melakukan konfirmasi pembayaran pelanggan",
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

    const bayarHandler = () => {
        fetch("/api/create-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Tambahkan header otorisasi jika diperlukan
                // "Authorization": "Bearer YOUR_ACCESS_TOKEN"
            },
            body: JSON.stringify({ tagihan_id: tagihan.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Menangani respon sukses
                setToken(data);

                window.snap.pay(token, {
                    onSuccess: (event) => {
                        console.log(event);
                    },
                    onPending: (event) => {
                        console.log(event);
                    },
                    onError: (event) => {
                        console.log(event);
                    },
                });
            })
            .catch((error) => {
                // Menangani error
                console.error("Error:", error);
            });
    };
    const print = () => {
        const url = route("invoice", { id: tagihan.id }); // URL yang ingin Anda buka
        const windowName = "_blank"; // Nama window atau target
        const windowFeatures = "width=840,height=490"; // Fitur window yang menentukan ukuran

        // Membuka tab baru dengan URL, nama, dan fitur yang ditentukan
        window.open(url, windowName, windowFeatures);
    };

    return (
        <div className="py-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
                <table className="w-full">
                    <tr>
                        <td className="bg-blue-200 border border-gray-500">
                            Nama Pelanggan
                        </td>
                        <td className=" border border-gray-500">
                            {tagihan.meteran.nama}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-blue-200 border border-gray-500">
                            Nik Pelanggan
                        </td>
                        <td className=" border border-gray-500">
                            {tagihan.meteran.nik}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-blue-200 border border-gray-500">
                            Alamat
                        </td>
                        <td className=" border border-gray-500">
                            {tagihan.meteran.alamat}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-blue-200 border border-gray-500">
                            Blok
                        </td>
                        <td className=" border border-gray-500">
                            {tagihan.meteran.blok}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-blue-200 border border-gray-500">
                            Nomor Meter
                        </td>
                        <td className=" border border-gray-500">
                            {tagihan.meteran.no_meteran}
                        </td>
                    </tr>
                    <tr>
                        <td className="bg-blue-200 border border-gray-500">
                            Nomor Sambungan
                        </td>
                        <td className=" border border-gray-500">
                            {tagihan.meteran.no_sambungan}
                        </td>
                    </tr>
                </table>
                <div className="w-full py-1 px-3 rounded-md shadow-sm shadow-gray-500">
                    <h3 className="font-bold text-blue-500">
                        Informasi Tagihan
                    </h3>
                    <div className="">
                        <h3>
                            Periode Tagihan :{" "}
                            {tagihan.pemakaian.periode.periode_tagihan}
                        </h3>
                        <p>Meteran Awal: {tagihan.pemakaian.meter_awal}</p>
                        <p>Meter Akhir: {tagihan.pemakaian.meter_akhir}</p>
                        <p>
                            Total Pemakaian: {tagihan.pemakaian.meter_pemakaian}
                        </p>
                        <p>
                            Status Pembayaran:{" "}
                            {tagihan.pemakaian.status_pembayaran}
                        </p>
                        <p>
                            Tanggal Pencatatan Meter:{" "}
                            {tagihan.pemakaian.tanggal_pencatatan
                                ? moment(
                                      tagihan.pemakaian.tanggal_pencatatan
                                  ).format("ll")
                                : "Petugas Belum Mencatat Meteran"}
                        </p>
                        <p>
                            Nama Petugas Pencatat:{" "}
                            {tagihan.pemakaian.nama_petugas_pencatat
                                ? tagihan.pemakaian.nama_petugas_pencatat
                                : "Petugas Belum Mencatat Meteran"}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-blue-500 my-3">
                    Rincian Tarif Biaya Pemakaian
                </h3>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                0-10 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                11-20 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                21-30 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                30+ <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                Adm
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                Denda
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.meteran.harga_tarif.tarif1}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.meteran.harga_tarif.tarif2}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.meteran.harga_tarif.tarif3}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.meteran.harga_tarif.tarif4}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.meteran.harga_tarif.adm}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.meteran.harga_tarif.denda}
                                    disabled
                                    classname={"border-none"}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h3 className="font-bold text-blue-500 my-3">
                    Rincian Tagihan Bulanan
                </h3>
                <table className="table">
                    <thead>
                        <tr>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                Pemakaian
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                0-10 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                11-20 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                21-30 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                30+ <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                Adm
                            </td>
                            <td className="bg-blue-200 py-1 px-2 border border-gray-500 text-center">
                                Denda
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                Pemakaian
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                {tagihan.pemakaian_10} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                {tagihan.pemakaian_20} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                {tagihan.pemakaian_30} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                {tagihan.pemakaian_30_keatas} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                -
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                -
                            </td>
                        </tr>
                        <tr>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                Tarif Pemakain
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_10}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_20}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_30}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_30_keatas}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.adm}
                                    disabled
                                    classname={"border-none w-[100px]"}
                                />
                            </td>
                            <td className=" py-1 px-2 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.denda}
                                    disabled
                                    classname={"border-none"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan="5"
                                className="bg-blue-200 py-1 px-2 border border-gray-500 text-center font-bold"
                            >
                                Total Pemakaian
                            </td>
                            <td
                                colSpan="2"
                                className=" py-1 px-2 border border-gray-500 text-center font-bold"
                            >
                                {tagihan.total_pemakaian} <sup>m3</sup>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan="5"
                                className="bg-blue-200 py-1 px-2 border border-gray-500 text-center font-bold"
                            >
                                Total Tagihan
                            </td>
                            <td
                                colSpan="2"
                                className=" py-1 px-2 border border-gray-500 text-center font-bold"
                            >
                                <InputUang
                                    value={tagihan.total_tagihan}
                                    disabled
                                    classname={"border-none text-center"}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {tagihan.status_pembayaran === "belum lunas" ? (
                    <button
                        onClick={bayarHandler}
                        className="my-3 py-2 px-4 text-white bg-blue-600 rounded-md"
                    >
                        Bayar Tagihan Bulanan
                    </button>
                ) : (
                    <button
                        onClick={print}
                        className="my-3 py-2 px-4 text-white bg-green-600 rounded-md"
                    >
                        Cetak Invoice
                    </button>
                )}
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <AdminLayout children={page} title={"Tagihan Bulanan Saya"} />
);
