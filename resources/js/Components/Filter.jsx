import React, { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { debounce } from "@mui/material";
import { router } from "@inertiajs/react";

export default function Filter({ links }) {
    const [params, setParams] = useState({
        cari: "",
        bulan: "",
        tahun: "",
    });
    const arrayTahun = [];
    const [tahunSekarang, setTahunSekarang] = useState({ tahunSekarang: "" });
    const [tahun, setTahun] = useState([]);
    useEffect(() => {
        // Mendapatkan tahun sekarang
        const tahunSekarang = new Date().getFullYear();

        // Memperbarui state
        setTahunSekarang((prevParams) => ({
            ...prevParams,
            tahunSekarang: tahunSekarang.toString(),
        }));
        for (let i = 10; i > 0; i--) {
            arrayTahun.push(tahunSekarang - i);
        }

        setTahun(arrayTahun);
    }, []); // Efek ini hanya dijalankan setelah render pertama
    const reload = useCallback(
        debounce((query) => {
            router.get(route(links), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="flex gap-x-3">
            <Input
                placeholder="cari"
                onChange={(e) => setParams({ ...params, cari: e.target.value })}
            />

            <div className="flex gap-x-3 items-center">
                <Select
                    onChange={(e) =>
                        setParams({ ...params, tahun: e.target.value })
                    }
                >
                    <option value={tahunSekarang.tahunSekarang}>
                        {tahunSekarang.tahunSekarang}
                    </option>
                    {tahun.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>
                <Select
                    onChange={(e) =>
                        setParams({ ...params, bulan: e.target.value })
                    }
                >
                    <option value="">pilih</option>
                    <option value="1">january</option>
                    <option value="2">february</option>
                    <option value="3">maret</option>
                    <option value="4">april</option>
                    <option value="5">mei</option>
                    <option value="6">juni</option>
                    <option value="7">juli</option>
                    <option value="8">agustus</option>
                    <option value="9">september</option>
                    <option value="10">oktober</option>
                    <option value="11">november</option>
                    <option value="12">desember</option>
                </Select>
            </div>
        </div>
    );
}
