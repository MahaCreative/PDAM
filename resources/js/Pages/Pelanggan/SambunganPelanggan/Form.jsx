import Input from "@/Components/Input";
import { router } from "@inertiajs/react";
import { Check } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Form() {
    const [search, setSearch] = useState({
        kode_sambungan: "",
        no_sambungan: "",
    });
    const [data, setData] = useState();

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `api/get-meteran?kode_sambungan=${search.kode_sambungan}&no_sambungan=${search.no_sambungan}`
            );
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const changeHandler = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };
    const columns = [
        {
            name: "Nama Pelanggan",
            selector: (row) => row.nama_pelanggan,
            width: "170px",
        },
        {
            name: "Kode Pemasangan",
            selector: (row) => row.kode_pemasangan_baru,
            width: "170px",
        },
        {
            name: "Nomor Sambungan",
            selector: (row) => row.no_sambungan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat_pemasangan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Golongan / Kelompok",
            selector: (row) => row.nama_golongan + " / " + row.nama_kelompok,
            width: "170px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => pilihHandler(row)}
                        className="btn-warning flex gap-x-1 items-center"
                    >
                        <p>
                            <Check color="inerit" fontSize="inherit" />
                        </p>
                        <p>Pilih</p>
                    </button>
                </div>
            ),
        },
    ];
    const pilihHandler = (row) => {
        router.post(route("pelanggan.pilih-sambungan-pelanggan"), {
            id: row.id,
        });
    };
    console.log(data);
    return (
        <div className="w-full">
            <div className="py-2 my-2 px-3 bg-gray-200 rounded-md">
                <p className="max-w-[80vw] lg:max-w-[50vw] text-xs">
                    "Untuk mengaitkan akun meteran Anda dengan kami, harap
                    masukkan kode sambungan dan nomor sambungan Anda. Jika kedua
                    informasi tersebut benar, maka akun Anda akan terhubung
                    secara otomatis dengan meteran Anda."
                </p>
                <p></p>
            </div>
            <div className="flex gap-3 my-3 w-full">
                <Input
                    onChange={changeHandler}
                    title={"Nomor Sambungan"}
                    name="no_sambungan"
                />
                <Input
                    onChange={changeHandler}
                    title={"Kode Sambungan"}
                    name="kode_sambungan"
                />
            </div>
            <div>
                {data ? (
                    <DataTable dense data={[data]} columns={columns} />
                ) : (
                    <p className="w-full py-2 px-4 text-center bg-gray-200 rounded-md">
                        Tidak ada data yang ditemukan
                    </p>
                )}
            </div>
        </div>
    );
}
