import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import { Add, Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

export default function FormPembayaran({ idForm, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        tagihan_id: idForm,
        via: "",
        bank_pengirim: "",
        nama_pengirim: "",
        rek_pengirim: "",
        bank_pdam: "",
        nama_pdam: "",
        rek_pdam: "",
    });
    const [getDataTagihan, setDataTagihan] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`api/get-tagihan/${idForm}`);
                const result = await response.json();
                setDataTagihan(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.pembayaran-tagihan"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };
    return (
        <div>
            <div className="py-2 px-3 rounded-md bg-gray-200">
                <div className="flex justify-between gap-x-8">
                    <div className="">
                        <p>Kode Sambungan : {getDataTagihan.kode_sambungan}</p>
                        <p>Nomor Sambungan : {getDataTagihan.no_sambungan}</p>
                        <p>Nama Pelanggan : {getDataTagihan.nama_pelanggan}</p>
                    </div>
                    <div>
                        <p>Periode Tagihan: {getDataTagihan.periode_tagihan}</p>
                        <p>Total Tagihan: {getDataTagihan.total_tagihan}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={submitHandler}>
                <div className="my-2">
                    <p>Data Pemakaian Air</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Input
                            value={getDataTagihan.pemakaian_10}
                            disabled
                            name="pemakaian1"
                            title="Pemakaian 0 - 10 m3"
                        />
                        <Input
                            value={getDataTagihan.pemakaian_20}
                            disabled
                            name="pemakaian2"
                            title="Pemakaian 11 - 20 m3"
                        />
                        <Input
                            value={getDataTagihan.pemakaian_30}
                            disabled
                            name="pemakaian3"
                            title="Pemakaian 21 - 30 m3"
                        />
                        <Input
                            value={getDataTagihan.pemakaian_30_keatas}
                            disabled
                            name="pemakaian4"
                            title="Pemakaian 30 m3 Keatas"
                        />
                    </div>
                    <p>Tarif Pemakaian</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Input
                            value={getDataTagihan.tarif_pemakaian_10}
                            disabled
                            name="tarif1"
                            title="Tarif 0 - 10 m3"
                        />
                        <Input
                            value={getDataTagihan.tarif_pemakaian_20}
                            disabled
                            name="tarif2"
                            title="Tarif 11 - 20 m3"
                        />
                        <Input
                            value={getDataTagihan.tarif_pemakaian_30}
                            disabled
                            name="tarif3"
                            title="Tarif 21 - 30 m3"
                        />
                        <Input
                            value={getDataTagihan.tarif_pemakaian_30_keatas}
                            disabled
                            name="tarif4"
                            title="Tarif 30 m3 Keatas"
                        />
                    </div>
                    <p>Total Pemakaian</p>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                        <Input
                            disabled
                            value={getDataTagihan.total_pemakaian}
                            title={"Total Pemakaian"}
                        />
                        <Input
                            disabled
                            value={
                                getDataTagihan.tarif_pemakaian_10 +
                                getDataTagihan.tarif_pemakaian_20 +
                                getDataTagihan.tarif_pemakaian_30 +
                                getDataTagihan.tarif_pemakaian_30_keatas
                            }
                            title={"Total Harga"}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                        <Input
                            disabled
                            value={getDataTagihan.adm}
                            title={"Biaya Adm"}
                        />
                        <Input
                            disabled
                            value={getDataTagihan.denda}
                            title={"Denda"}
                        />
                    </div>
                    <p className="my-3">
                        Total Pembayaran (Total Harga + ADM + Denda)
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                        <Input
                            disabled
                            value={getDataTagihan.total_tagihan}
                            title={"Total Pembayaran"}
                        />
                    </div>
                </div>
                <div className="flex justify-end my-3">
                    <div className="flex gap-x-3 items-center">
                        <button className="btn-primary flex gap-x-1 items-center">
                            <p>
                                <Add color="inerit" fontSize="inherit" />
                            </p>
                            <p>Bayar Tagihan</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="btn-danger flex gap-x-1 items-center"
                        >
                            <p>
                                <Cancel color="inerit" fontSize="inherit" />
                            </p>
                            <p>Cancell</p>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
