import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";

export default function SearchKelompok({
    dataGolongan,
    title,
    errors,
    model,
    ...props
}) {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [search]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/get-kelompok?cari=${search}&golongan=${dataGolongan}`
            );
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [open, setOpen] = useState(false);
    const openRef = useRef();
    const handlerFocus = (e) => {
        setSearch(e.target.value);
        setTimeout(() => {
            setOpen(false);
        }, 5000);
        setOpen(true);
    };
    const pilihHandler = (value) => {
        setSearch(value.kelompok);
        setOpen(false);
        props.getData(value.kelompok);
    };
    useEffect(() => {
        let handler = (e) => {
            if (!openRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });

    useEffect(() => {
        setSearch(model ? model : "");
    }, [model]);
    useEffect(() => {
        fetchData();
    }, [dataGolongan]);

    return (
        <div ref={openRef} className="relative text-xs">
            <p>{title}</p>
            <Input
                onClick={() => setOpen(true)}
                value={search}
                onChange={handlerFocus}
            />

            <div
                className={`absolute top-12 ${
                    open
                        ? "max-h-fit overflow-auto"
                        : "max-h-[0] overflow-y-hidden"
                }  transition-all duration-300 w-full`}
            >
                <div className="relative max-h-[250px] z-[50] overflow-y-scroll lightBackground darkBackground text-white w-full">
                    {data.length > 0 ? (
                        data.map((item, key) => (
                            <div
                                onClick={() => pilihHandler(item)}
                                key={key}
                                className="hover:bg-slate-950 dark:hover:bg-blue-500 hover:text-white py-1 px-3 text-xs hover:cursor-pointer"
                            >
                                <div className="flex gap-3 ">
                                    <p>{item.kelompok}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="w-full py-1 px-3 text-xs">
                            Tidak ada data
                        </p>
                    )}
                </div>
            </div>
            {errors && <p className="my-1.5 text-red-500 italic">{errors}</p>}
        </div>
    );
}
