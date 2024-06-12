import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import Select from "@/Components/Select";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index(props) {
    const tarif = props.tarif;
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        pakaian1: 0,
        tarif1: 0,
        pakaian2: 0,
        tarif2: 0,
        pakaian3: 0,
        tarif3: 0,
        pakaian4: 0,
        tarif4: 0,
    });
    const [params, setParams] = useState({ key: 0, pemakaian: "0" });
    const hitung = () => {
        let pakai1 = 0;
        let pakai2 = 0;
        let pakai3 = 0;
        let pakai4 = 0;
        let tarif1 = 0;
        let tarif2 = 0;
        let tarif3 = 0;
        let tarif4 = 0;

        if (params.pemakaian >= 0) {
            pakai1 = Math.min(10, params.pemakaian);
            tarif1 = tarif[params.key].tarif1 * pakai1;
        }
        if (params.pemakaian >= 10) {
            pakai2 = Math.min(10, params.pemakaian - pakai1);
            tarif2 = tarif[params.key].tarif2 * pakai2;
        }
        if (params.pemakaian >= 20) {
            pakai3 = Math.min(10, params.pemakaian - pakai1 - pakai2);
            tarif3 = tarif[params.key].tarif3 * pakai3;
        }
        if (params.pemakaian >= 30) {
            pakai4 = params.pemakaian - pakai1 - pakai2 - pakai3;
            tarif4 = tarif[params.key].tarif4 * pakai4;
        }

        setData({
            ...data,
            tarif1: tarif1,
            tarif2: tarif2,
            tarif3: tarif3,
            tarif4: tarif4,
            pakaian1: pakai1,
            pakaian2: pakai2,
            pakaian3: pakai3,
            pakaian4: pakai4,
        });
        setTimeout(() => {
            setShow(true);
        }, 1500);
    };
    console.log(data);
    return (
        <div>
            <Layout>
                <div className="px-2 md:px-4 lg:px-8 w-[100%] md:w-[70%]">
                    <h3 className="font-bold font-fira text-4xl text-blue-800 Misi py-8">
                        Simulasi
                    </h3>
                    <div className="w-full flex flex-col ">
                        <p className="text-blue-600 text-md md:text-lg lg:text-xl font-semibold">
                            Simulasi Tarif Pemakaian Air
                        </p>
                        <div className="flex flex-col gap-9 my-6 md:flex-row justify-between items-start w-full">
                            <div className="w-full flex flex-col gap-6">
                                <Select
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            key: e.target.value,
                                        })
                                    }
                                    title={"Golongan"}
                                >
                                    {tarif.map((item, key) => (
                                        <option key={key} value={key}>
                                            {item.kelompok}
                                        </option>
                                    ))}
                                </Select>
                                <Input
                                    type="number"
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            pemakaian: e.target.value,
                                        })
                                    }
                                    title={"pemakaian"}
                                />
                                <div className="py-3">
                                    <button
                                        onClick={hitung}
                                        className="btn-primary"
                                    >
                                        Hitung
                                    </button>
                                </div>
                            </div>
                            <div className="w-full">
                                <p className="font-bold text-blue-600">
                                    Catatan
                                </p>
                                <p>
                                    Perhitungan tidak memperhitungkan Rp
                                    Retribusi kebersihan, RP tunggakan, Rp
                                    Denda, RP Suplisi, Rp Restitusi, Rp Sewa
                                    Meter, Materai.
                                </p>
                            </div>
                        </div>
                    </div>
                    {show && (
                        <div className="w-full py-6">
                            <p className="font-bold text-xl text-blue-600">
                                Perincian Pemakaian
                            </p>
                            <p className="font-bold text-xl text-blue-600 my-6">
                                Kode {tarif[params.key].kelompok}
                            </p>
                            <p className="font-bold text-md text-blue-600 my-6">
                                Dengan pemakaian air sejumlah{" "}
                                {params.pemakaian + "(m3)"}
                            </p>
                            <div className="grid grid-cols-4 w-full gap-3">
                                <p className="py-3 border-b-2 border-blue-600/50 text-blue-500 font-semibold">
                                    Keterangan
                                </p>
                                <p className="py-3 border-b-2 border-blue-600/50 text-blue-500 font-semibold">
                                    Pemakaian (m3)
                                </p>
                                <p className="py-3 border-b-2 border-blue-600/50 text-blue-500 font-semibold">
                                    Harga Tarif (Rp)
                                </p>
                                <p className="py-3 border-b-2 border-blue-600/50 text-blue-500 font-semibold">
                                    Total (Rp)
                                </p>
                            </div>
                            <div className="grid grid-cols-4 w-full gap-3 my-4">
                                <div className="flex flex-col gap-y-6 text-xs md:text-md lg:text-lg font-light">
                                    <p>0 - 10 (m3)</p>
                                    <p>10 - 20 (m3)</p>
                                    <p>20 - 30 (m3)</p>
                                    <p> {">=30 (m3)"}</p>
                                </div>
                                <div className="flex flex-col gap-y-6 text-xs md:text-md lg:text-lg font-light">
                                    <p>{data.pakaian1}</p>
                                    <p>{data.pakaian2}</p>
                                    <p>{data.pakaian3}</p>
                                    <p>{data.pakaian4}</p>
                                </div>
                                <div className="flex flex-col gap-y-6 text-xs md:text-md lg:text-lg font-light">
                                    <p>{tarif[params.key].tarif1}</p>
                                    <p>{tarif[params.key].tarif2}</p>
                                    <p>{tarif[params.key].tarif3}</p>
                                    <p>{tarif[params.key].tarif4}</p>
                                </div>
                                <div className="flex flex-col gap-y-6 text-xs md:text-md lg:text-lg font-light">
                                    <p>{data.tarif1}</p>
                                    <p>{data.tarif2}</p>
                                    <p>{data.tarif3}</p>
                                    <p>{data.tarif4}</p>
                                </div>
                            </div>
                            <div className="py-3 border-y-2 border-blue-600/50 flex justify-between">
                                <p className="font-bold text-blue-600">
                                    {" "}
                                    Rp Total Pemakaian
                                </p>

                                <p className="font-bold text-blue-600">
                                    {data.tarif1 +
                                        data.tarif2 +
                                        data.tarif3 +
                                        data.tarif4}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} title={"Simulasi"} />;
