import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Add, Cancel } from "@mui/icons-material";
import React, { useState } from "react";

export default function PembayaranSambungan(props) {
    const pemasanganBaru = props.pemasanganBaru;
    const bank = props.bank;
    const { data, setData, post, reset, errors } = useForm({
        id_tagihan: pemasanganBaru.tagihan_pemasangan.id,
        nama_bank_pdam: "",
        nama_rek_pdam: "",
        no_rek_pdam: "",
        nama_bank_pengirim: "",
        nama_rek_pengirim: "",
        no_rek_pengirim: "",
        bukti_pembayaran: "",
        nama_penerima: "",
        nama_pembayar: "",
        metode: "",
    });
    const [metodePembayaran, setMetodePembayaran] =
        useState("pembayaran manual");
    const pilihBank = (metode, nama_bank, nama, rek) => {
        setMetodePembayaran(metode);
        setData({ ...data, metode: metode });
        if (metode === "pembayaran manual") {
        } else {
            setData({
                ...data,
                nama_bank_pdam: nama_bank,
                nama_rek_pdam: nama,
                no_rek_pdam: rek,
                metode: metode,
            });
        }
    };
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-pembayaran-pemasangan"));
    };
    const submitManualHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-pembayaran-pemasangan"));
    };
    return (
        <div className="py-6">
            <p className="text-sm py-1 px-2 rounded-md bg-gray-200 text-slate-900">
                Silahkan mengisikan pembayaran pelanggan
            </p>
            <div className="w-full h-full py-3 flex  justify-center items-center">
                <div className="shadow-md shadow-gray-500/50  rounded-md darkBackground flex flex-col md:flex-row gap-3 w-full px-4">
                    <div className="w-full lg:w-1/2">
                        <div className="py-2 px-4  text-slate-950 ">
                            <div className="bg-gray-200 py-1 5 px-3 rounded-md">
                                <p className="font-bold">
                                    Detail Pemasangan Baru
                                </p>
                                <p>
                                    Nama Pemasang :{" "}
                                    {pemasanganBaru.nama_pelanggan}
                                </p>
                                <p>
                                    Kode Pemasangan :{" "}
                                    {pemasanganBaru.kode_pemasangan_baru}
                                </p>
                                <p>
                                    Nomor Pemasangan :{" "}
                                    {pemasanganBaru.no_sambungan}
                                </p>
                                <p>
                                    Tgl Pemasangan :{" "}
                                    {pemasanganBaru.tgl_pemasangan}
                                </p>
                                <p>
                                    Status Pemasangan :{" "}
                                    {pemasanganBaru.status_pemasangan}
                                </p>
                            </div>
                            <p className="text-white my-2">Rincian Biaya</p>
                            <div className="my-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input
                                        title={"uang pendaftaran"}
                                        disabled
                                        value={
                                            pemasanganBaru.tagihan_pemasangan
                                                .uang_pendaftaran
                                        }
                                    />
                                    <Input
                                        title={"Biaya Perencanaan"}
                                        disabled
                                        value={
                                            pemasanganBaru.tagihan_pemasangan
                                                .biaya_perencanaan
                                        }
                                    />
                                </div>
                            </div>
                            <div className="my-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input
                                        title={"biaya pemasangan"}
                                        disabled
                                        value={
                                            pemasanganBaru.tagihan_pemasangan
                                                .biaya_pemasangan
                                        }
                                    />
                                    <Input
                                        title={"biaya instalasi"}
                                        disabled
                                        value={
                                            pemasanganBaru.tagihan_pemasangan
                                                .biaya_instalasi
                                        }
                                    />
                                </div>
                                <Input
                                    title={"Total Biaya"}
                                    disabled
                                    value={
                                        pemasanganBaru.tagihan_pemasangan
                                            .total_biaya
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p>Pilih Metode Pembayaran</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 my-3">
                            {bank.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        pilihBank(
                                            "pembayaran transfer",
                                            item.nama_bank,
                                            item.nama_rek,
                                            item.no_rek
                                        )
                                    }
                                    className="py-2 px-4 rounded-md shadow-md shadow-gray-500/50 hover:bg-blue-600 hover:cursor-pointer hover:text-white dark:hover:bg-slate-700"
                                >
                                    <div className="">
                                        <div>
                                            <p className="text-xs">
                                                {item.nama_rek}
                                            </p>
                                            <p className="text-xs">
                                                {item.no_rek}
                                            </p>
                                        </div>
                                        <p className="md:text-base text-xs lg:text-xl ">
                                            {item.nama_bank}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div
                                onClick={() => pilihBank("pembayaran manual")}
                                className="py-2 px-4 rounded-md shadow-md shadow-gray-500/50 hover:bg-blue-600 hover:cursor-pointer hover:text-white dark:hover:bg-slate-700"
                            >
                                <div className="">
                                    <div>
                                        <p>Pembayaran Manual</p>
                                    </div>
                                    <p className="text-xs ">
                                        pembayaran manual dilakukan jika
                                        pelanggan membayar langsung di kantor
                                    </p>
                                </div>
                            </div>
                        </div>
                        {metodePembayaran == "pembayaran transfer" ? (
                            <form onSubmit={submitHandler} className="my-3">
                                <p className="my-5">Data Bank PDAM</p>
                                <div className="flex gap-3 md:flex-row flex-col">
                                    <div className="">
                                        <Input
                                            errors={errors.nama_bank_pdam}
                                            value={data.nama_bank_pdam}
                                            disabled
                                            title={"Bank"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input
                                            errors={errors.nama_rek_pdam}
                                            value={data.nama_rek_pdam}
                                            disabled
                                            title={"Nama"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input
                                            errors={errors.no_rek_pdam}
                                            value={data.no_rek_pdam}
                                            disabled
                                            title={"Rekening"}
                                        />
                                    </div>
                                </div>
                                <p className="my-5">Data Pengirim</p>
                                <div className="flex gap-3 md:flex-row flex-col">
                                    <div className="">
                                        <Input
                                            name="nama_bank_pengirim"
                                            errors={errors.nama_bank_pengirim}
                                            onChange={changeHandler}
                                            title={"Bank"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input
                                            errors={errors.nama_rek_pengirim}
                                            name="nama_rek_pengirim"
                                            onChange={changeHandler}
                                            title={"Nama"}
                                        />
                                    </div>
                                    <div className="">
                                        <Input
                                            errors={errors.no_rek_pengirim}
                                            name="no_rek_pengirim"
                                            onChange={changeHandler}
                                            title={"Rekening"}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <Input
                                        onChange={(e) =>
                                            setData(
                                                "bukti_pembayaran",
                                                e.target.files[0]
                                            )
                                        }
                                        type="file"
                                        title={"Bukti Pembayaran"}
                                        name="bukti_pembayaran"
                                        errors={errors.bukti_pembayaran}
                                    />
                                </div>
                                <div className="my-3 w-full flex gap-2 justify-center">
                                    <button className="btn-primary flex gap-x-1 items-center">
                                        <p>
                                            <Add
                                                color="inerit"
                                                fontSize="inherit"
                                            />
                                        </p>
                                        <p>{"Tambah"}</p>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-danger flex gap-x-1 items-center"
                                    >
                                        <p>
                                            <Cancel
                                                color="inerit"
                                                fontSize="inherit"
                                            />
                                        </p>
                                        <p>Cancell</p>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form
                                onSubmit={submitManualHandler}
                                className="my-3"
                            >
                                <p className="my-5">
                                    Silakan Mengisikan form manual
                                </p>
                                <div className="flex gap-3 md:flex-row flex-col">
                                    <Input
                                        onChange={changeHandler}
                                        errors={errors.nama_penerima}
                                        name="nama_penerima"
                                        value={data.nama_penerima}
                                        title={"Nama Petugas Menerima"}
                                    />
                                    <Input
                                        onChange={changeHandler}
                                        errors={errors.nama_pembayar}
                                        name="nama_pembayar"
                                        value={data.nama_pembayar}
                                        title={"Nama Pembayar"}
                                    />
                                </div>

                                <div className="my-3 w-full flex gap-2 justify-center">
                                    <button className="btn-primary flex gap-x-1 items-center">
                                        <p>
                                            <Add
                                                color="inerit"
                                                fontSize="inherit"
                                            />
                                        </p>
                                        <p>{"Tambah"}</p>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-danger flex gap-x-1 items-center"
                                    >
                                        <p>
                                            <Cancel
                                                color="inerit"
                                                fontSize="inherit"
                                            />
                                        </p>
                                        <p>Cancell</p>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

PembayaranSambungan.layout = (page) => (
    <AdminLayout children={page} title={"Pembayaran Sambungan Baru"} />
);
