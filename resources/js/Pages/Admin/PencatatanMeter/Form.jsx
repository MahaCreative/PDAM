import SearchPemasanganBaru from "@/Components/SearchPemasanganBaru";
import { Add, Cancel, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import PemasanganBaru from "../PemasanganBaru/PemasanganBaru";
import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";

export default function Form({
    model,
    setModel,
    idPemasangan,
    setOpen,
    ...props
}) {
    const { data, setData, post, reset, errors } = useForm({
        pemasangan_baru_id: "",
        stand_meter_awal: "",
        stand_meter_sekarang: "",
        total_pemakaian: "",
    });
    // get data pemasangan pelanggan dari api
    const [getPemasangan, setPemasangan] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/pemasangan-pelanggan?id= ${idPemasangan}`
                );
                const result = await response.json();
                setPemasangan(result);
                console.log(result);
                setData({
                    ...data,
                    pemasangan_baru_id: result.id,
                    // stand_meter_awal: result
                    //     ? result.pencatatan_meter[0].stand_meter_sekarang
                    //     : 0,
                    stand_meter_awal:
                        result.pencatatan_meter.length > 0
                            ? result.pencatatan_meter[0].stand_meter_sekarang
                            : 0,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.pencatatan-meter-store"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };
    const updateHandler = (e) => {
        e.preventDefault();
    };
    const kalkulasiPemakaian = () => {
        setData({
            ...data,
            total_pemakaian: data.stand_meter_sekarang - data.stand_meter_awal,
        });
    };

    return (
        <div>
            <div className="my-2 py-1.5 px-4 rounded-md bg-gray-200 dark:bg-slate-800">
                <p className="font-bold text-xs">Pencatatan Pemakaian Air</p>
                <div className="flex gap-3">
                    <p>
                        Nomor sambungan :{" "}
                        {getPemasangan && getPemasangan.no_sambungan}
                    </p>
                    <p>
                        Kode sambungan :{" "}
                        {getPemasangan && getPemasangan.kode_pemasangan_baru}
                    </p>
                </div>
                <p>
                    Nama pelanggan :{" "}
                    {getPemasangan && getPemasangan.nama_pelanggan}
                </p>
                <p>
                    Alamat Pemasangan:{" "}
                    {getPemasangan && getPemasangan.alamat_pemasangan}
                </p>
            </div>
            <form onSubmit={model ? updateHandler : submitHandler}>
                {/* input */}
                <div className="flex flex-col gap-3">
                    <Input
                        disabled
                        value={data.stand_meter_awal}
                        title={"Stand Meter Awal (m3)"}
                    />
                    <Input
                        onChange={(e) =>
                            setData({
                                ...data,
                                stand_meter_sekarang: e.target.value,
                            })
                        }
                        onBlur={kalkulasiPemakaian}
                        errors={errors.stand_meter_sekarang}
                        value={data.stand_meter_sekarang}
                        title={"Stand Meter Akhir (m3)"}
                    />
                    <Input
                        disabled
                        errors={errors.total_pemakaian}
                        value={data.total_pemakaian}
                        title={"Stand Meter Awal (m3)"}
                    />
                </div>
                <div className="flex justify-end my-3">
                    <div className="flex gap-x-3 items-center">
                        <button className="btn-primary flex gap-x-1 items-center">
                            <p>
                                {model ? (
                                    <Edit color="inerit" fontSize="inherit" />
                                ) : (
                                    <Add color="inerit" fontSize="inherit" />
                                )}
                            </p>
                            <p>{model ? "Update" : "Tambah"}</p>
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
