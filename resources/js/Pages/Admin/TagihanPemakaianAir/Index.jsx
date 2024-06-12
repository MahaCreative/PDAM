import "moment/locale/id"; // Impor bahasa Indonesia
import Input from "@/Components/Input";
import InputUang from "@/Components/InputUang";
import Select from "@/Components/Select";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Print, Water } from "@mui/icons-material";
import { debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
moment.locale("id");
export default function Index(props) {
    var date = moment(new Date()).toDate();
    const formatter = new Intl.DateTimeFormat("id", { month: "long" });
    const bulan = formatter.format(date);
    const tagihan = props.tagihan;
    const dataCount = props.dataCount;
    const [params, setParams] = useState({
        bulan: bulan,
        tahun: moment(new Date()).format("YYYY"),
        status_pembayaran: "",
        status_tunggakan: "",
        search: "",
    });

    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        {
            name: "Nama Pelanggan",
            selector: (row) => (
                <>
                    <p>{row.meteran.nama}</p>
                    <p>No Sam:{row.meteran.no_sambungan}</p>
                    <p>No Met:{row.meteran.no_meter}</p>
                </>
            ),
            width: "170px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.meteran.alamat,
            width: "170px",
            wrap: true,
        },
        {
            name: "Blok",
            selector: (row) => row.meteran.blok,
            width: "70px",
            wrap: true,
        },
        {
            name: "Periode Tagihan",
            selector: (row) => row.pemakaian.periode.periode_tagihan,

            wrap: true,
        },
        {
            name: "Jumlah Pemakaian",
            selector: (row) => (
                <p>
                    {row.total_pemakaian} <sup>m3</sup>
                </p>
            ),

            wrap: true,
        },
        {
            name: "Total Tagihan",
            selector: (row) => (
                <InputUang
                    value={row.total_tagihan}
                    disabled
                    classname={"border-none"}
                />
            ),

            wrap: true,
        },
        {
            name: "Status Tunggakan",
            selector: (row) => row.status_tunggakan,

            wrap: true,
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) =>
                row.tanggal_pembayaran
                    ? moment(row.tanggal_pembayaran).format("LL")
                    : "Belum Ada Pembayaran",

            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => row.status_pembayaran,

            wrap: true,
        },
        // {
        //     name: "Aksi",
        //     selector: (row) => (
        //         <div>
        //             <Link
        //                 href={route("admin.show-tagihan-bulanan-saya", row.id)}
        //                 className="btn-primary"
        //                 as="button"
        //             >
        //                 Lihat Pembayaran
        //             </Link>
        //         </div>
        //     ),
        //     wrap: true,
        // },
    ];
    const tahunSekarang = new Date().getFullYear();
    const tahunOptions = [];

    // Membuat opsi tahun dari 10 tahun sebelumnya
    for (let i = tahunSekarang; i > tahunSekarang - 10; i--) {
        tahunOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    const filterStatus = (value) => {
        setParams({ ...params, status_pembayaran: value });
    };
    const filterTunggakan = (value) => {
        setParams({ ...params, status_tunggakan: value });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.tagihan-bulanan"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const cetakHandler = () => {
        router.get(route("admin.cetak-tagihan-bulanan"), params);
    };
    return (
        <div className="py-6">
            {/* status pembayaran */}
            <div className="my-3">
                <div className="my-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                        onClick={() => filterStatus("lunas")}
                        className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                    >
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="md:text-3xl text-xl font-bold">
                                {dataCount.count_status_pembayaran.lunas}
                            </p>
                            <p className="text-sm lg:text-xl font-light capitalize">
                                Jumlah Pembayaran Lunas
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Periode Tagihan:
                                {params.bulan + " " + params.tahun}
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Lihat Detail
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => filterStatus("belum lunas")}
                        className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                    >
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="md:text-3xl text-xl font-bold">
                                {dataCount.count_status_pembayaran.belum_lunas}
                            </p>
                            <p className="text-sm lg:text-xl font-light capitalize">
                                Pembayaran Belum Lunas
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Periode Tagihan:
                                {params.bulan + " " + params.tahun}
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Lihat Detail
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => filterStatus("")}
                        className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                    >
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="md:text-3xl text-xl font-bold">
                                {dataCount.count_status_pembayaran.all}
                            </p>
                            <p className="text-sm lg:text-xl font-light capitalize">
                                Total Tagihan Bulanan
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Periode Tagihan:
                                {params.bulan + " " + params.tahun}
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Lihat Detail
                            </p>
                        </div>
                    </div>
                    {/* status tunggakan */}
                    <div
                        onClick={() => filterTunggakan("tidak menunggak")}
                        className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                    >
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="md:text-3xl text-xl font-bold">
                                {dataCount.count_status_tunggakan.tidak}
                            </p>
                            <p className="text-sm lg:text-xl font-light capitalize">
                                Tagihan Tidak Menunggak
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Periode Tagihan:
                                {params.bulan + " " + params.tahun}
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Lihat Detail
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => filterTunggakan("menunggak")}
                        className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                    >
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="md:text-3xl text-xl font-bold">
                                {dataCount.count_status_tunggakan.menunggak}
                            </p>
                            <p className="text-sm lg:text-xl font-light capitalize">
                                Tagihan Menunggak
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Periode Tagihan:
                                {params.bulan + " " + params.tahun}
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Lihat Detail
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => filterTunggakan("")}
                        className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                    >
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="md:text-3xl text-xl font-bold">
                                {dataCount.count_status_tunggakan.all}
                            </p>
                            <p className="text-sm lg:text-xl font-light capitalize">
                                Total Tagihan Bulanan
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Periode Tagihan:
                                {params.bulan + " " + params.tahun}
                            </p>
                            <p className="text-xs md:text-sm font-light capitalize">
                                Lihat Detail
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-3">
                <div className="flex gap-3">
                    <button onClick={cetakHandler} className="flex gap-3">
                        <p className="leading-none btn-success">
                            <Print color="inherit" />
                        </p>
                    </button>
                </div>
                <div className="w-2/3 flex gap-3">
                    <Input
                        placeholder="Cari"
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                    />
                    <Select
                        classname={"capitalize"}
                        onChange={(e) =>
                            setParams({ ...params, bulan: e.target.value })
                        }
                    >
                        <option value="">Pilih Bulan Periode</option>
                        <option value="Januari">Januari</option>
                        <option value="Februari">Februari</option>
                        <option value="Maret">Maret</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">Juni</option>
                        <option value="Juli">Juli</option>
                        <option value="Agustus">Agustus</option>
                        <option value="September">September</option>
                        <option value="Oktober">Oktober</option>
                        <option value="November">November</option>
                        <option value="Desember">Desember</option>
                    </Select>
                    <Select
                        classname={"capitalize"}
                        onChange={(e) =>
                            setParams({ ...params, tahun: e.target.value })
                        }
                    >
                        <option value="">Pilih Tahun Periode</option>
                        {tahunOptions}
                    </Select>
                </div>
            </div>
            <DataTable data={tagihan} columns={columns} pagination />
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Tagihan Pemakaian Air"} />
);
