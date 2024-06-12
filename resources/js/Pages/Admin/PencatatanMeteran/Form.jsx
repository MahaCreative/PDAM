import Input from "@/Components/Input";
import InputUang from "@/Components/InputUang";

import { useForm } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Form({ value }) {
    const { data, setData, post, reset, errors } = useForm({
        id: value.id,
        meter_awal: value.meter_awal,
        meter_akhir: 0,
        meter_pemakaian: 0,
        tanggal_pencatatan: moment(new Date()).format("DD-MM-YYYY"),
        nama_petugas_pencatat: "",
        pemakaian1: 0,
        pemakaian2: 0,
        pemakaian3: 0,
        pemakaian4: 0,
        tarif1: 0,
        tarif2: 0,
        tarif3: 0,
        tarif4: 0,
        total_biaya: 0,
    });
    useEffect(() => {
        setData({ ...data, meter_awal: value.meter_awal });
    }, [value]);
    const kalkulasi = (e) => {
        setData({
            ...data,
            meter_pemakaian: data.meter_akhir - data.meter_awal,
        });
    };
    useEffect(() => {
        // Ambil data pemakaian meteran dari state
        const meterPemakaian = data.meter_pemakaian;

        // Hitung pemakaian tiap periode
        const pemakaian1 = Math.min(meterPemakaian, 10);
        const pemakaian2 = Math.min(Math.max(meterPemakaian - 10, 0), 10);
        const pemakaian3 = Math.min(Math.max(meterPemakaian - 20, 0), 10);
        const pemakaian4 = Math.max(meterPemakaian - 30, 0);

        // Hitung tarif untuk tiap periode
        const tarif1 = value.harga_tarif.tarif1 * pemakaian1;
        const tarif2 = value.harga_tarif.tarif2 * pemakaian2;
        const tarif3 = value.harga_tarif.tarif3 * pemakaian3;
        const tarif4 = value.harga_tarif.tarif4 * pemakaian4;

        // Hitung total biaya
        const totalBiaya = tarif1 + tarif2 + tarif3 + tarif4;

        // Update state dengan data yang dihitung
        setData({
            ...data,
            pemakaian1,
            pemakaian2,
            pemakaian3,
            pemakaian4,
            tarif1,
            tarif2,
            tarif3,
            tarif4,
            total_biaya: totalBiaya,
        });
    }, [data.meter_pemakaian]);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.store-catat-pemakaian-air-pelanggan"));
    };
    return (
        <form onSubmit={submitHandler}>
            <Input
                disabled
                title={"Meteran Awal"}
                name="meter_awal"
                value={data.meter_awal}
                errors={errors.meter_awal}
            />
            <Input
                onChange={(e) =>
                    setData({ ...data, meter_akhir: e.target.value })
                }
                onBlur={(e) => kalkulasi(e)}
                type="number"
                title={"Meteran Akhir"}
                name="meter_akhir"
                errors={errors.meter_akhir}
            />
            <Input
                disabled
                type="number"
                title={"Total Pemakaian"}
                name="meter_pemakaian"
                errors={errors.meter_pemakaian}
                value={data.meter_akhir}
            />
            <div className="my-3 ">
                <h3>Rincian Pemakaian Air</h3>
                <div className="flex gap-3 items-center">
                    <Input
                        disabled
                        type="number"
                        title={"Pemakaian 0-10 M3"}
                        name="meter_pemakaian"
                        value={data.pemakaian1}
                    />
                    <Input
                        disabled
                        type="number"
                        title={"Pemakaian 11-20 M3"}
                        name="pemakaian2"
                        value={data.pemakaian2}
                    />
                    <Input
                        disabled
                        type="number"
                        title={"Pemakaian 21-30 M3"}
                        name="meter_pemakaian"
                        value={data.pemakaian3}
                    />
                    <Input
                        disabled
                        type="number"
                        title={"Pemakaian 30+ M3"}
                        name="meter_pemakaian"
                        value={data.pemakaian4}
                    />
                </div>
            </div>
            <div className="my-3 ">
                <h3>Rincian Tarif Pemakaian Air</h3>
                <div className="flex gap-3 items-center">
                    <InputUang
                        disabled
                        title={"Tarif 0-10 M3"}
                        name="meter_pemakaian"
                        value={parseInt(data.tarif1)}
                    />
                    <InputUang
                        disabled
                        title={"Tarif 11-20 M3"}
                        name="pemakaian2"
                        value={data.tarif2}
                    />
                    <InputUang
                        disabled
                        title={"Tarif 21-30 M3"}
                        name="meter_pemakaian"
                        value={data.tarif3}
                    />
                    <InputUang
                        disabled
                        title={"Pemakaian 30+ M3"}
                        name="meter_pemakaian"
                        value={data.tarif4}
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <button className="btn-primary">Proses Pemakaian</button>
            </div>
        </form>
    );
}
