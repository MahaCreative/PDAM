import Modal from "@/Components/Modal";
import { Add, Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function DetailTagihan({ model, setModel, setOpen, ...props }) {
    const columnsPemakaian = [
        {
            name: "#",
            selector: (row) => 1,
            width: "60px",
        },
        {
            name: "Stand Meter Awal",
            selector: (row) => row.stand_meter_awal + " m3",
            width: "155px",
        },
        {
            name: "Stand Meter Akhir",
            selector: (row) => row.stand_meter_akhir + " m3",
            width: "155px",
        },
        {
            name: "Stand Meter Akhir",
            selector: (row) => row.total_pemakaian + " m3",
            width: "155px",
        },
        {
            name: "0 - 10 m3",
            selector: (row) => row.pemakaian_10 + " m3",
            width: "155px",
        },
        {
            name: "11 - 20 m3",
            selector: (row) => row.pemakaian_20 + " m3",
            width: "155px",
        },
        {
            name: "21 - 30 m3",
            selector: (row) => row.pemakaian_30 + " m3",
            width: "155px",
        },
        {
            name: " > 30 m3",
            selector: (row) => row.pemakaian_30_keatas + " m3",
            width: "155px",
        },
    ];
    const columnsTarif = [
        {
            name: "#",
            selector: (row) => 1,
            width: "60px",
        },
        {
            name: "Tarif 0-10 m3",
            selector: (row) => row.tarif_pemakaian_10,
            width: "145px",
        },
        {
            name: "Tarif 11-20 m3",
            selector: (row) => row.tarif_pemakaian_20,
            width: "145px",
        },
        {
            name: "Tarif 21-30 m3",
            selector: (row) => row.tarif_pemakaian_30,
            width: "145px",
        },
        {
            name: "Tarif > 30 m3",
            selector: (row) => row.tarif_pemakaian_30_keatas,
            width: "145px",
        },
        {
            name: "Adm",
            selector: (row) => row.adm,
            width: "145px",
        },
        {
            name: "Denda",
            selector: (row) => row.denda,
            width: "145px",
        },
        {
            name: "Total Tagihan",
            selector: (row) => row.total_tagihan,
            width: "155px",
        },
    ];
    const columnsPembayaran = [
        {
            name: "#",
            selector: (row) => 1,
            width: "60px",
        },
        {
            name: "Pembayaran Via",
            selector: (row) => "Kantor",
            width: "150px",
        },
        {
            name: (
                <div>
                    <p>Bank Pengirim</p>
                    <p>Nama Rek Pengirim</p>
                    <p>No Rek Pengirim</p>
                </div>
            ),
            selector: (row) => (
                <div>
                    <p>
                        {model.pembayaran_tagihan.bank_pengirim
                            ? model.pembayaran_tagihan.bank_pengirim
                            : "-"}
                    </p>
                    <p>
                        {" "}
                        {model.pembayaran_tagihan.nama_pengirim
                            ? model.pembayaran_tagihan.nama_pengirim
                            : "-"}
                    </p>
                    <p>
                        {" "}
                        {model.pembayaran_tagihan.req_pengirim
                            ? model.pembayaran_tagihan.req_pengirim
                            : "-"}
                    </p>
                </div>
            ),
            width: "180px",
        },

        {
            name: (
                <div>
                    <p>Bank PDAM</p>
                    <p>Nama Rek PDAM</p>
                    <p>No Rek PDAM</p>
                </div>
            ),
            selector: (row) => (
                <div>
                    <p>
                        {" "}
                        {model.pembayaran_tagihan.bank_pdam
                            ? model.pembayaran_tagihan.bank_pdam
                            : "-"}
                    </p>
                    <p>
                        {" "}
                        {model.pembayaran_tagihan.nama_pdam
                            ? model.pembayaran_tagihan.nama_pdam
                            : "-"}
                    </p>
                    <p>
                        {" "}
                        {model.pembayaran_tagihan.req_pdam
                            ? model.pembayaran_tagihan.req_pdam
                            : "-"}
                    </p>
                </div>
            ),
            width: "170px",
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) => model.pembayaran_tagihan.tanggal_pembayaran,

            width: "165px",
        },
        {
            name: "Status Pembayaran",
            selector: (row) => row.status_pembayaran,
            width: "170px",
        },
        {
            name: "Nama Petugas Penerima",
            selector: (row) => row.pembayaran_tagihan.nama_penerima,
            width: "190px",
        },
        {
            name: "Foto Pembayaran",
            selector: (row) => (
                <div>
                    {row.pembayaran_tagihan.via_pembayaran == "Kantor PDAM" ? (
                        <p>Pembayaran melalui Kantor</p>
                    ) : (
                        "AAAA"
                    )}
                </div>
            ),
            width: "190px",
        },
    ];
    const kirimDataToParent = (value) => {
        props.onDataReceive(value);
    };
    console.log(model);
    return (
        <div>
            <div className="py-2 px-4 rounded-md bg-gray-200 dark:bg-slate-900">
                <div className="flex justify-between gap-x-9">
                    <div>
                        <p>Nama Pelanggan : {model.nama_pelanggan}</p>
                        <p>Nama Pelanggan : {model.wilayah.nama_wilayah}</p>
                        <p>Periode Tagihan : {model.periode_tagihan}</p>
                    </div>
                    <div>
                        <p>Kode Sambungan : {model.kode_sambungan}</p>
                        <p>Nomor Sambungan : {model.no_sambungan}</p>
                        <p
                            className={`${
                                model.status_pembayaran == "belum dibayar" &&
                                "text-red-500"
                            }`}
                        >
                            Status Pembayaran : {model.status_pembayaran}
                        </p>
                        <p
                            className={`${
                                model.status_konfirmasi_pembayaran ==
                                    "belum dikonfirmasi" && "text-red-500"
                            }`}
                        >
                            Status Konfirmasi Pembayaran :{" "}
                            {model.status_konfirmasi_pembayaran}
                        </p>
                    </div>
                </div>
                <div>
                    <p>Alamat : {model.alamat}</p>
                </div>
            </div>
            <div className="my-2.5 ">
                <p>Rincian Pemakaian Air</p>
                <DataTable
                    striped
                    dense
                    data={[model]}
                    columns={columnsPemakaian}
                />
            </div>
            <div className="my-2.5 ">
                <p>Rincian Tagihan Bulanan</p>
                <DataTable
                    striped
                    dense
                    data={[model]}
                    columns={columnsTarif}
                />
            </div>
            {model.pembayaran_tagihan == null && (
                <div>
                    <div className="py-2 px-3 rounded-md bg-red-500 my-2.5 text-white">
                        <p className="text-xs">
                            Pelanggan belum melakukan pembayaran di bulan ini,
                            silahkan menghubungi pelanggan bersangkutan, agar
                            segera melakukan pembayaran
                        </p>
                    </div>
                </div>
            )}
            {model.pembayaran_tagihan != null && (
                <div className="my-2.5 ">
                    <p>Rincian Pembayaran Pelanggan</p>
                    <DataTable
                        striped
                        dense
                        data={[model]}
                        columns={columnsPembayaran}
                    />
                </div>
            )}
            <div className="flex justify-end my-3">
                <div className="flex gap-x-3 items-center">
                    {model.pembayaran_tagihan == null && (
                        <button
                            onClick={() => kirimDataToParent(model.id)}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Tambah Pembayaran</p>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false);
                            setModel(null);
                        }}
                        className="btn-danger flex gap-x-1 items-center"
                    >
                        <p>
                            <Cancel color="inerit" fontSize="inherit" />
                        </p>
                        <p>Cancell</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
