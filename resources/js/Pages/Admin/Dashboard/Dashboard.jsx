import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { AccessTimeSharp, Water } from "@mui/icons-material";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import Statistik from "./Statistik";

export default function Dashboard(props) {
    const countTagihanBulanan = props.countTagihanBulanan;
    const countJenisPengaduan = props.countJenisPengaduan;
    const statPengaduan = props.statPengaduan;
    const stat_status_pengaduan = props.stat_status_pengaduan;
    const stat_total_tagihan = props.stat_total_tagihan;
    return (
        <div className="py-6">
            <div className="flex flex-col-reverse md:flex-row justify-between items-start">
                <div className="w-full md:w-[100%] px-2">
                    <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                            <div className="font-bold text-xl md:text-xl lg:text-3xl">
                                <Water color="inherit" fontSize="inherit" />
                            </div>
                            <div className="text-left leading-relaxed">
                                <p className="text-lg md:text-xl lg:text-3xl font-bold text-left">
                                    <CurrencyInput
                                        displayType="text"
                                        prefix="Rp. "
                                        className="border-none bg-inherit bg-blue-500 text-left p-0"
                                        disabled
                                        value={
                                            countTagihanBulanan.total_tagihan
                                        }
                                    />
                                </p>
                                <p className="text-xs md:text-md font-light capitalize">
                                    Total Tagihan
                                </p>
                                <p className="text-xs md:text-sm font-light capitalize">
                                    Lihat Detail
                                </p>
                            </div>
                        </div>
                        <div className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                            <div className="font-bold text-xl md:text-xl lg:text-3xl">
                                <Water color="inherit" fontSize="inherit" />
                            </div>
                            <div className="text-left leading-relaxed">
                                <p className="text-lg md:text-xl lg:text-3xl font-bold text-left">
                                    <CurrencyInput
                                        displayType="text"
                                        prefix="Rp. "
                                        className="border-none bg-inherit bg-blue-500 text-left"
                                        disabled
                                        value={countTagihanBulanan.lunas}
                                    />
                                </p>
                                <p className="text-xs md:text-md font-light capitalize">
                                    Total Pembayaran Lunas
                                </p>
                                <p className="text-xs md:text-sm font-light capitalize">
                                    Lihat Detail
                                </p>
                            </div>
                        </div>
                        <div className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                            <div className="font-bold text-xl md:text-xl lg:text-3xl">
                                <Water color="inherit" fontSize="inherit" />
                            </div>
                            <div className="text-left leading-relaxed">
                                <p className="text-lg md:text-xl lg:text-3xl font-bold text-left">
                                    <CurrencyInput
                                        displayType="text"
                                        prefix="Rp. "
                                        className="border-none bg-inherit bg-blue-500 text-left"
                                        disabled
                                        value={countTagihanBulanan.belum}
                                    />
                                </p>
                                <p className="text-xs md:text-md font-light capitalize">
                                    Total Pembayaran Belum Lunas
                                </p>
                                <p className="text-xs md:text-sm font-light capitalize">
                                    Lihat Detail
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Statistik
                countJenisPengaduan={countJenisPengaduan}
                statPengaduan={statPengaduan}
                stat_status_pengaduan={stat_status_pengaduan}
                stat_total_tagihan={stat_total_tagihan}
            />
        </div>
    );
}
Dashboard.layout = (page) => (
    <AdminLayout children={page} title={"Dashboard"} />
);
