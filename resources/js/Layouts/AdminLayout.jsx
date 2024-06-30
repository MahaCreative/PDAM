import MenuSidebar from "@/Components/MenuSidebar";
import SidebarDesktop from "@/Components/SidebarDesktop";
import React, { useEffect, useState } from "react";
import {
    ContactSupport,
    CorporateFare,
    Receipt,
    Report,
} from "@mui/icons-material";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Bahasa Indonesia locale
import { Head, Link, usePage } from "@inertiajs/react";
import MenuAdmin from "@/Components/MenuAdmin";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import MenuPelanggan from "@/Components/MenuPelanggan";
import {
    Light,
    LightMode,
    Logout,
    Nightlight,
    Settings,
    Widgets,
} from "@mui/icons-material";
import MenuLink from "@/Components/MenuLink";
export default function AdminLayout({ children, title, links }) {
    const { flash } = usePage().props;
    const { auth } = usePage().props;
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        // Cek apakah ada pesan flash dan tipe flash tidak sama dengan null
        if (flash && flash.type !== null) {
            setTimeout(() => {
                Swal.fire({
                    icon: flash.type,
                    title: flash.type === "error" ? "Error" : "Good Job",
                    text: flash.message,
                    background: true,
                    allowEscapeKey: true,
                });
            }, 300);
            // Set pesan flash menjadi null setelah menampilkan SweetAlert2
        }
    }, [flash]);

    const [togleTheme, setTogleTheme] = useState(false);
    const selectTheme = (value) => {
        localStorage.setItem("theme", value);
        const html = document.querySelector("html");

        html.classList.add(localStorage.getItem("theme"));
        if (value == "dark") {
            html.classList.remove("light");
        } else {
            html.classList.remove("dark");
        }
    };
    useEffect(() => {
        document
            .querySelector("html")
            .classList.add(localStorage.getItem("theme"));

        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now);
        };

        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const options = { timeZone: "Asia/Jakarta" };
    const formattedTime = currentTime.toLocaleTimeString(
        "en-US",
        "HH:mm:ss",
        options
    );
    const formattedDay = format(currentTime, "EEEE", { locale: id }); // Menggunakan bahasa Indonesia

    return (
        <div>
            <div className="relative overflow-x-hidden h-full bg-white darkBackground dark:text-white">
                {/* sidebar */}
                <Head title={title} />

                <SidebarDesktop auth={auth}>
                    <MenuLink
                        active={"dashboard"}
                        href={route("dashboard")}
                        title={"Dashboard"}
                        icon={<Widgets color="inerit" fontSize="inherit" />}
                    />
                    {auth.roles == "admin" && (
                        <>
                            <MenuSidebar
                                title={"Master Data"}
                                icon={
                                    <CorporateFare
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            >
                                <MenuSidebar.MenuLink
                                    href={route("admin.golongan-kelompok")}
                                >
                                    Golongan dan Kelompok
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.harga-tarif")}
                                >
                                    Harga Tarif
                                </MenuSidebar.MenuLink>

                                <MenuSidebar.MenuLink
                                    href={route("admin.jenis-pengaduan")}
                                >
                                    Jenis Pengaduan
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.meteran-pelanggan")}
                                >
                                    Meteran Pelanggan
                                </MenuSidebar.MenuLink>
                            </MenuSidebar>
                            <MenuSidebar
                                title={"Data Tagihan"}
                                icon={
                                    <CorporateFare
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            >
                                <MenuSidebar.MenuLink
                                    href={route("admin.periode-tagihan")}
                                >
                                    Periode Tagihan
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.tagihan-bulanan")}
                                >
                                    Tagihan Bulanan Pelanggan
                                </MenuSidebar.MenuLink>
                            </MenuSidebar>
                        </>
                    )}

                    {auth.roles == "admin" && (
                        <>
                            <MenuLink
                                active={"admin.pengaduan-pelanggan"}
                                href={route("admin.pengaduan-pelanggan")}
                                title={"Pengaduan Pelanggan"}
                                icon={
                                    <Report color="inerit" fontSize="inherit" />
                                }
                            />

                            <MenuSidebar
                                title={"Setting Perusahaan"}
                                icon={
                                    <CorporateFare
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            >
                                <MenuSidebar.MenuLink
                                    href={route("admin.setting-apps")}
                                >
                                    Profile Perusahaan
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.visi-misi")}
                                >
                                    Visi Misi
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.sejarah")}
                                >
                                    Sejarah
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.susunan-direksi")}
                                >
                                    Susunan Direksi
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.struktur-organisasi")}
                                >
                                    Struktur Organisasi
                                </MenuSidebar.MenuLink>
                            </MenuSidebar>
                            <MenuSidebar
                                title={"Blog"}
                                icon={
                                    <CorporateFare
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            >
                                <MenuSidebar.MenuLink
                                    href={route("admin.info-pdam")}
                                >
                                    Info PDAM
                                </MenuSidebar.MenuLink>

                                <MenuSidebar.MenuLink
                                    href={route("admin.galery")}
                                >
                                    Galery
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.slider")}
                                >
                                    Slider
                                </MenuSidebar.MenuLink>
                            </MenuSidebar>
                        </>
                    )}
                    {auth.roles == "petugas lapangan" && (
                        <>
                            <MenuSidebar
                                title={"Daftar Tugas"}
                                icon={
                                    <CorporateFare
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            >
                                <MenuSidebar.MenuLink
                                    href={route("admin.pencatatan-meter")}
                                >
                                    Pencatatan Meter
                                </MenuSidebar.MenuLink>
                                <MenuSidebar.MenuLink
                                    href={route("admin.pengaduan-pelanggan")}
                                >
                                    Pengaudan Pelanggan
                                </MenuSidebar.MenuLink>
                            </MenuSidebar>
                        </>
                    )}

                    {auth.roles == "pelanggan" && <MenuPelanggan />}

                    <MenuLink
                        active={"setting-profile"}
                        href={route("setting-profile")}
                        title={"Setting Profile"}
                        icon={<Settings color="inerit" fontSize="inherit" />}
                    />
                    <MenuLink
                        href={route("logout")}
                        active={"logout"}
                        title={"Logout"}
                        icon={<Logout color="inerit" fontSize="inherit" />}
                    />
                </SidebarDesktop>
                <div className="w-full ">
                    <div className="w-full duration-300 ease-in-out transition-all px-4 py-3">
                        <div className="flex justify-between items-center border-b border-blue-500 ">
                            <div className="py-2 flex gap-x-3 items-center">
                                <Link
                                    href=""
                                    className="text-blue-600 dark:text-white text-sm md:text-lg duration-300 transition-all ease-in-out"
                                >
                                    Dashboard
                                </Link>
                                <p className="text-xs text-blue-800 dark:text-white">
                                    {">>"}
                                </p>
                                <Link
                                    href={links}
                                    className="text-blue-600 dark:text-white   md:text-lg text-sm duration-300 transition-all ease-in-out"
                                >
                                    {title}
                                </Link>
                            </div>
                            <div className="lightBackground  text-white py-1 px-3 rounded-md shadow-md text-xs md:text-md lg:text-lg transisiAktif">
                                {formattedDay + ", " + formattedTime}
                            </div>
                        </div>
                        <div className="">{children}</div>
                    </div>
                </div>
                {/* tooggle Light dark */}
                <div className="fixed bottom-5 right-5 ">
                    <div className="flex  items-center transisiAktif lightBackground transisiAktif   py-1.5 px-1.5 rounded-full">
                        <div
                            onClick={() => setTogleTheme(!togleTheme)}
                            className="hover:cursor-pointer hover:text-slate-950 text-2xl flex animate-spin"
                        >
                            <Settings color="inherit" fontSize="inherit" />
                        </div>
                        <div
                            className={`flex gap-x-3 items-center overflow-hidden ${
                                togleTheme ? "w-full" : "w-0"
                            } transisiAktif`}
                        >
                            <div
                                onClick={() => selectTheme("light")}
                                className=" text-2xl mx-1 hover:text-slate-950"
                            >
                                <LightMode color="inherit" fontSize="inherit" />
                            </div>
                            <div
                                onClick={() => selectTheme("dark")}
                                className="text-2xl hover:text-slate-950"
                            >
                                <Nightlight
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex dark:bg-slate-950 justify-between px-4 text-center items-center text-gray-500">
                <p className="font-semibold flex items-center">
                    <span>©</span>
                    <span>2024</span>
                    <span className="text-blue-400 dark:text-white mx-2">
                        copyright
                    </span>
                </p>
                <p>
                    Powered by{" "}
                    <span className="text-blue-400 dark:text-white">
                        Musdalifah
                    </span>
                </p>
            </div>
        </div>
    );
}
