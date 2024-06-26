import DropdownLink from "@/Components/DropdownLink";
import GuestLink from "@/Components/GuestLink";
import MenuPelanggan from "@/Components/MenuPelanggan";
import { Head, Link, usePage } from "@inertiajs/react";
import { Add, Menu, Report, WaterDrop } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function GuestLayout({ title, children }) {
    const { settingApps } = usePage().props;
    const { auth } = usePage().props;
    const [sidebar, setSidebar] = useState(false);
    const sidebarRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!sidebarRef.current.contains(e.target)) {
                setSidebar(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div className="font-fira">
            <Head title={title} />
            <div
                ref={sidebarRef}
                className={`fixed  z-50 w-[80%] bg-white/50 backdrop-blur-sm h-screen right-0 top-0 ${
                    sidebar
                        ? "translate-x-0 md:translate-x-full"
                        : "translate-x-full "
                } transition-all duration-300 transform ease-in-out`}
            >
                <div className="px-4 py-6 w-full font-light">
                    <Link
                        className={`${
                            route().current("home") ? "bg-slate-950" : ""
                        } w-full mx-4 block py-1 px-4 rounded-md text-white hover:bg-slate-950`}
                    >
                        Beranda
                    </Link>

                    <div className="my-4 ">
                        <p className="font-bold">Pelanggan</p>
                        <div>
                            <div>
                                <GuestLink
                                    title={"Permintaan Sambungan Baru"}
                                    icon={
                                        <Add
                                            color="inerit"
                                            fontSize="inherit"
                                        />
                                    }
                                />
                                <GuestLink
                                    title={"Menghubungkan Akun Meteran"}
                                    icon={
                                        <WaterDrop
                                            color="inerit"
                                            fontSize="inherit"
                                        />
                                    }
                                />

                                <GuestLink
                                    title={"Layanan Pelanggan"}
                                    icon={
                                        <Report
                                            color="inerit"
                                            fontSize="inherit"
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-4 ">
                        <p className="font-bold">Info PDAM</p>
                        <div>
                            <Link
                                as="div"
                                href={route("visi-misi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Visi Misi
                            </Link>
                            <Link
                                as="div"
                                href={route("susunan-direksi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Susunan Direksi
                            </Link>
                            <Link
                                as="div"
                                href={route("sejarah")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Sejarah
                            </Link>
                            <Link
                                as="div"
                                href={route("struktur-organisasi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Struktur Organisasi
                            </Link>
                            <Link
                                as="div"
                                href={route("simulasi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Simulasi
                            </Link>
                            <Link
                                as="div"
                                href={route("info-pdam")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Info PDAM
                            </Link>
                            <Link
                                as="div"
                                href={route("berita")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Berita
                            </Link>
                            <Link
                                as="div"
                                href={route("galery")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white"
                            >
                                Galery
                            </Link>
                        </div>
                    </div>

                    <div className="mx-4">
                        {auth.user && (
                            <Link
                                href={route("dashboard")}
                                className={` block hover:text-white hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                    route().current("dashboard")
                                        ? "bg-slate-950 text-white"
                                        : ""
                                }`}
                            >
                                Dashboard
                            </Link>
                        )}
                        {auth.user != null ? (
                            <Link
                                href={route("logout")}
                                className={` hover:text-white block hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                    route().current("logout")
                                        ? "bg-slate-950text-white "
                                        : ""
                                }`}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className={`hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                    route().current("login")
                                        ? "bg-slate-950"
                                        : ""
                                }`}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between lightBackground items-center text-white font-fira">
                    <div className=" px-3 flex gap-x-3 items-center ">
                        <img
                            src={"/storage/" + settingApps.logo_perusahaan}
                            alt=""
                            className="w-[50px]"
                        />
                        <p>{settingApps.nama_perusaaan}</p>
                    </div>
                    <div className="hidden md:flex gap-x-3 px-3">
                        <Link
                            href={route("home")}
                            className={`hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                route().current("home") ? "bg-slate-950" : ""
                            }`}
                        >
                            Beranda
                        </Link>
                        <DropdownLink name={"Info PDAM"}>
                            <Link
                                as="div"
                                href={route("visi-misi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Visi Misi
                            </Link>
                            <Link
                                as="div"
                                href={route("susunan-direksi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Susunan Direksi
                            </Link>
                            <Link
                                as="div"
                                href={route("sejarah")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Sejarah
                            </Link>
                            <Link
                                as="div"
                                href={route("struktur-organisasi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Struktur Organisasi
                            </Link>
                            <Link
                                as="div"
                                href={route("simulasi")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Simulasi
                            </Link>
                            <Link
                                as="div"
                                href={route("info-pdam")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Info PDAM
                            </Link>
                            <Link
                                as="div"
                                href={route("berita")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Berita
                            </Link>
                            <Link
                                as="div"
                                href={route("galery")}
                                className="py-1 px-3 hover:bg-slate-950 hover:text-white w-[150px] hover:cur\"
                            >
                                Galery
                            </Link>
                        </DropdownLink>
                        {auth.roles == "pelanggan" && (
                            <DropdownLink name={"Pelanggan"}>
                                <MenuPelanggan />
                            </DropdownLink>
                        )}
                        {auth.user && (
                            <Link
                                href={route("dashboard")}
                                className={`hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                    route().current("dashboard")
                                        ? "bg-slate-950"
                                        : ""
                                }`}
                            >
                                Dashboard
                            </Link>
                        )}
                        {auth.user != null ? (
                            <Link
                                href={route("logout")}
                                className={`hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                    route().current("logout")
                                        ? "bg-slate-950"
                                        : ""
                                }`}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className={`hover:bg-slate-950 active:bg-slate-950 py-1 px-2 rounded-md ${
                                    route().current("login")
                                        ? "bg-slate-950"
                                        : ""
                                }`}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    <div
                        onClick={() => setSidebar(true)}
                        className="block md:hidden px-3 hover:text-slate-950 text-xl hover:cursor-pointer"
                    >
                        <Menu color="inherit" fontSize="inherit" />
                    </div>
                </div>
            </div>
            {children}
            {/* Sidebar */}

            <div className="p-[50px] bg-cover md:bg-contain md:h-[449px] h-[200px] bg-left-bottom bg-no-repeat w-full  bg-[url('storage/icon/footer-top-background-mobile.png')] transition-all duration-300"></div>
        </div>
    );
}
