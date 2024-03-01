import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { Add, Cancel } from "@mui/icons-material";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";

export default function ShowTagihan(props) {
    const bank = props.bank;
    const tagihan = props.tagihan;
    const date = props.date;
    const { settingApps } = usePage().props;

    const columns = [
        {
            name: "Periode",
            selector: (row) => row.periode_tagihan,
        },
        {
            name: "ST.Awal",
            selector: (row) => row.stand_meter_awal,
            width: "85px",
        },
        {
            name: "ST.Akir",
            selector: (row) => row.stand_meter_akhir,
            width: "85px",
        },
        {
            name: "VOL",
            selector: (row) => row.total_pemakaian,
            width: "55px",
        },
        {
            name: "Biaya Air",
            selector: (row) =>
                row.tarif_pemakaian_10 +
                row.tarif_pemakaian_20 +
                row.tarif_pemakaian_30 +
                row.tarif_pemakaian_30_keatas,
        },
        {
            name: "ADM",
            selector: (row) => row.adm,
        },
        {
            name: "Denda",
            selector: (row) => row.denda,
        },
        {
            name: "Sub Total",
            selector: (row) => row.total_tagihan,
        },
    ];
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
            selector: (row) => row.via_pembayaran,
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
                    <p>{row.bank_pengirim ? row.bank_pengirim : "-"}</p>
                    <p> {row.nama_pengirim ? row.nama_pengirim : "-"}</p>
                    <p> {row.req_pengirim ? row.req_pengirim : "-"}</p>
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
                    <p> {row.bank_pdam ? row.bank_pdam : "-"}</p>
                    <p> {row.nama_pdam ? row.nama_pdam : "-"}</p>
                    <p> {row.req_pdam ? row.req_pdam : "-"}</p>
                </div>
            ),
            width: "170px",
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) => row.tanggal_pembayaran,

            width: "165px",
        },
        {
            name: "Status Pembayaran",
            selector: (row) => row.status_pembayaran,
            width: "170px",
        },
        {
            name: "Nama Petugas Penerima",
            selector: (row) => row.nama_penerima,
            width: "190px",
        },
        {
            name: "Foto Pembayaran",
            selector: (row) => (
                <div>
                    {row.via_pembayaran == "Kantor PDAM" ? (
                        <p>Pembayaran melalui Kantor</p>
                    ) : (
                        <a
                            href={"../storage/" + row.foto_pembayaran}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={"/storage/" + row.foto_pembayaran}
                                alt=""
                                className="w-[100px]"
                            />
                        </a>
                    )}
                </div>
            ),
            width: "110px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) =>
                row.status_pembayaran !== "telah di terima" && (
                    <button
                        onClick={() => deleteHandler(row.id)}
                        className="btn-danger"
                    >
                        Delete
                    </button>
                ),
        },
    ];

    const { data, setData, post, reset, errors } = useForm({
        id: tagihan.id,
        nama_bank_pdam: "",
        nama_rek_pdam: "",
        no_rek_pdam: "",
        nama_bank_pengirim: "",
        nama_rek_pengirim: "",
        no_rek_pengirim: "",
        bukti_pembayaran: "",
    });
    const pilihBank = (nama_bank, nama, rek) => {
        setData({
            ...data,
            nama_bank_pdam: nama_bank,
            nama_rek_pdam: nama,
            no_rek_pdam: rek,
        });
    };
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("pelanggan.store-tagihan"));
    };
    const deleteHandler = (id) => {
        router.post(route("pelanggan.delete-tagihan"), { id });
    };
    return (
        <div className="py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                <div>
                    <div className="py-2 px-4 rounded-md bg-gray-200 dark:bg-slate-900">
                        <div className="flex justify-between gap-x-9">
                            <div className="text-xs">
                                <p>Nama Pelanggan : {tagihan.nama_pelanggan}</p>
                                <p>
                                    Nama Pelanggan :{" "}
                                    {tagihan.wilayah.nama_wilayah}
                                </p>
                                <p>
                                    Periode Tagihan : {tagihan.periode_tagihan}
                                </p>
                            </div>
                            <div className="text-xs">
                                <p>Kode Sambungan : {tagihan.kode_sambungan}</p>
                                <p>Nomor Sambungan : {tagihan.no_sambungan}</p>
                                <p
                                    className={`${
                                        tagihan.status_pembayaran ==
                                            "belum dibayar" && "text-red-500"
                                    }`}
                                >
                                    Status Pembayaran :{" "}
                                    {tagihan.status_pembayaran}
                                </p>
                                <p
                                    className={`${
                                        tagihan.status_konfirmasi_pembayaran ==
                                            "belum dikonfirmasi" &&
                                        "text-red-500"
                                    }`}
                                >
                                    Status Konfirmasi Pembayaran :{" "}
                                    {tagihan.status_konfirmasi_pembayaran}
                                </p>
                            </div>
                        </div>
                        <div className="text-xs">
                            <p>Alamat : {tagihan.alamat}</p>
                        </div>
                    </div>
                    <div className="my-2.5 ">
                        <p>Rincian Pemakaian Air</p>
                        <DataTable
                            striped
                            dense
                            data={[tagihan]}
                            columns={columnsPemakaian}
                        />
                    </div>
                    <div className="my-2.5 ">
                        <p>Rincian Tagihan Bulanan</p>
                        <DataTable
                            striped
                            dense
                            data={[tagihan]}
                            columns={columnsTarif}
                        />
                    </div>
                    {tagihan.pembayaran_tagihan != null && (
                        <div className="my-2.5 ">
                            <p>Rincian Pembayaran Pelanggan</p>
                            <DataTable
                                striped
                                dense
                                data={[tagihan.pembayaran_tagihan]}
                                columns={columnsPembayaran}
                            />
                        </div>
                    )}
                </div>

                <div className="w-full shadow-sm shadow-gray-500/50 py-2 px-3 rounded-md">
                    {tagihan.pembayaran_tagihan == null ? (
                        <div className="w-full">
                            <p>Pilih Metode Pembayaran</p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 my-3">
                                {bank.map((item, index) => (
                                    <div
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
                        </div>
                    ) : (
                        tagihan.status_pembayaran == "lunas" && (
                            <div className="my-2.5 w-full h-full relative">
                                <p>Kwitansi Pembayaran</p>
                                <div className="relative  w-full h-full">
                                    <div className="relative top-0 left-0 w-full h-full flex justify-center items-center px-8 pt-8">
                                        <img
                                            src={
                                                "/storage/" +
                                                settingApps.logo_perusahaan
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="w-full bg-cyan-200/50 h-full absolute top-0 left-0">
                                        <div className=" py-2 px-3 rounded-md shadow-md shadow-gray-500/50 w-full">
                                            <div className="w-full text-center">
                                                <p className="uppercase">
                                                    Tanda Terima Pembayaran
                                                </p>
                                                <p className="uppercase">
                                                    Rekening PDAM{" "}
                                                    {settingApps.nama_perusaaan}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Nomor Samb
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {
                                                                tagihan.no_sambungan
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Nama Pelanggan
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {
                                                                tagihan.nama_pelanggan
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Golongan Tarif
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {
                                                                tagihan.tarif
                                                                    .kelompok
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Total Pemakaian
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {tagihan.total_pemakaian +
                                                                " m3"}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Total Tagihan
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {tagihan.tarif_pemakaian_10 +
                                                                tagihan.tarif_pemakaian_20 +
                                                                tagihan.tarif_pemakaian_30 +
                                                                tagihan.tarif_pemakaian_30_keatas}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Admin
                                                        </p>
                                                        <p>: {tagihan.adm}</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Denda
                                                        </p>
                                                        <p>: {tagihan.denda}</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Total Bayar
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {
                                                                tagihan.total_tagihan
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Tanggal
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {
                                                                tagihan
                                                                    .pembayaran_tagihan
                                                                    .tanggal_pembayaran
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[105px]">
                                                            Petugas
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {
                                                                tagihan.nama_petugas_konfirmasi
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[125px]">
                                                            Periode Tagihan
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {moment(
                                                                tagihan.periode_tagihan
                                                            ).format("LL")}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[125px]">
                                                            Stand Awal
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {tagihan.stand_meter_awal +
                                                                " m3"}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[125px]">
                                                            Stand Akhir
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {tagihan.stand_meter_akhir +
                                                                " m3"}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-xs">
                                                        <p className="w-[125px]">
                                                            Total Pemakaian
                                                        </p>
                                                        <p>
                                                            :{" "}
                                                            {tagihan.total_pemakaian +
                                                                " m3"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

ShowTagihan.layout = (page) => (
    <AdminLayout children={page} title={"Show Tagihan Bulanan"} />
);
