import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import Form from "./Form";
export default function Create(props) {
    const dataMeteran = props.dataMeteran;
    const data = props.data;

    return (
        <div className="py-6">
            <div className="flex flex-col gap-3">
                <div className="py-2 px-3 shadow-sm shadow-gray-500/50">
                    <h1>Data Pemakaian </h1>
                    <div className="">
                        <table className="w-full">
                            <thead className="w-full">
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        No Sambungan
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.meteran.no_sambungan}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        No Meter
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.meteran.no_meteran}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        Nama Pelanggan
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.meteran.nama}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        Nik
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.meteran.nik}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        Alamat
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.meteran.alamat}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        Blok
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.meteran.blok}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[220px] bg-blue-200 border border-gray-500">
                                        Periode Tagihan
                                    </td>
                                    <td className="bg-blue-100 border border-gray-500">
                                        {dataMeteran.periode.periode_tagihan}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className="py-2 px-3 shadow-sm shadow-gray-500/50">
                    <Form value={data} />
                </div>
            </div>
        </div>
    );
}

Create.layout = (page) => (
    <AdminLayout children={page} title={"Catat Pemakaian Pelanggan"} />
);
