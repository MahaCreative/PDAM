import InputUang from "@/Components/InputUang";
import React, { useEffect } from "react";

export default function PrintInvoice(props) {
    // useEffect(() => {
    //     window.print();
    // });
    const setting = props.setting;
    const pembayaran = props.pembayaran;
    const meteran = props.meteran;
    const tagihan = props.tagihan;
    return (
        <div className="w-[800px] h-[600px] relative">
            <div className="w-full h-full justify-center flex items-center absolute left-0 top-0">
                <img
                    src={"/storage/" + setting.logo_perusahaan}
                    alt=""
                    className="opacity-20 h-[600px] object-cover"
                />
            </div>
            <div className="absolute w-full h-full left-4 top-0">
                <div className="py-3">
                    <h3 className="text-center">TANDA TERIMA PEMBAYARAN</h3>
                    <h3 className="text-center">
                        REKENING {setting.nama_perusahaan}
                    </h3>
                </div>
                <div className="flex justify-between items-start">
                    <div className="w-full">
                        <div className="grid grid-cols-2">
                            <p>No Sambungan </p>
                            <p>: {meteran.no_sambungan}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>No Meter </p>
                            <p>: {meteran.no_meteran}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Nama Pelanggan </p>
                            <p>: {meteran.nama}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Alamat </p>
                            <p>: {meteran.alamat}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Golongan </p>
                            <p>: {meteran.nama_kelompok}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-2">
                            <p>Tanggal Pembayaran </p>
                            <p>: {pembayaran.tanggal_pembayaran}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Payment Type </p>
                            <p>: {pembayaran.payment_type}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Periode Tagihan </p>
                            <p className="capitalize">
                                : {pembayaran.periode_tagihan}
                            </p>
                        </div>
                    </div>
                </div>
                <h3 className="font-bold text-blue-500 my-3">
                    Rincian Tagihan Bulanan
                </h3>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                Pemakaian
                            </td>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                0-10 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                11-20 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                21-30 <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                30+ <sup>m3</sup>
                            </td>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                Adm
                            </td>
                            <td className="bg-blue-200 py-1 px-1 border border-gray-500 text-center">
                                Denda
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                Pemakaian
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                {tagihan.pemakaian_10} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                {tagihan.pemakaian_20} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                {tagihan.pemakaian_30} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                {tagihan.pemakaian_30_keatas} <sup>m3</sup>
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                -
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                -
                            </td>
                        </tr>
                        <tr>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                Tarif Pemakain
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_10}
                                    disabled
                                    classname={"border-none text-xs"}
                                />
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_20}
                                    disabled
                                    classname={"border-none text-xs"}
                                />
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_30}
                                    disabled
                                    classname={"border-none text-xs"}
                                />
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.tarif_pemakaian_30_keatas}
                                    disabled
                                    classname={"border-none text-xs"}
                                />
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
                                <InputUang
                                    value={tagihan.adm}
                                    disabled
                                    classname={"border-none text-xs"}
                                />
                            </td>
                            <td className=" py-1 px-1 border border-gray-500 text-center">
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
                                className="bg-blue-200 py-1 px-1 border border-gray-500 text-center font-bold"
                            >
                                Total Pemakaian
                            </td>
                            <td
                                colSpan="2"
                                className=" py-1 px-1 border border-gray-500 text-center font-bold"
                            >
                                {tagihan.total_pemakaian} <sup>m3</sup>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan="5"
                                className="bg-blue-200 py-1 px-1 border border-gray-500 text-center font-bold"
                            >
                                Total Tagihan
                            </td>
                            <td
                                colSpan="2"
                                className=" py-1 px-1 border border-gray-500 text-center font-bold"
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
            </div>
        </div>
    );
}
