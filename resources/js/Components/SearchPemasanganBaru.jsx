import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Input from "./Input";
import { Add, Check } from "@mui/icons-material";

export default function SearchPemasanganBaru({ ...props }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/get-pemasangan?cari=${search}`
            );
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <button
                    onClick={() => kirimDataToParent(row)}
                    className="btn-primary flex gap-2 items-center"
                >
                    <span>
                        <Check color="inherit" fontSize="inherit" />
                    </span>
                    <span>Pilih</span>
                </button>
            ),
            width: "120px",
        },
        {
            name: "Kode Pemasangan",
            selector: (row) => row.kode_pemasangan_baru,
            width: "170px",
        },

        {
            name: "Nama Lengkap",
            selector: (row) => row.nama_pelanggan,
            width: "200px",
            sortable: true,
        },
        {
            name: "nomor sambungan",
            selector: (row) => row.no_sambungan,
            width: "200px",
            sortable: true,
        },
    ];

    const kirimDataToParent = (value) => {
        props.onDataReceive(value);
    };
    return (
        <div className="my-2">
            <div className="flex justify-between my-2 items-center gap-3 text-sm">
                <p>Cari Pelanggan</p>
                <Input
                    placeholder="cari"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <DataTable data={data} columns={columns} />
        </div>
    );
}
