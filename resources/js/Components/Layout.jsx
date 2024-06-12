import { Link } from "@inertiajs/react";
import React from "react";

export default function Layout({ children }) {
    return (
        <div className="flex gap-3 py-16 px-4 md:px-8 lg:px-16 w-full">
            <div className="hidden w-[30%] md:inline-block ">
                <div className="border-r border-gray-500/50 text-lg py-16">
                    <Link
                        as="div"
                        href={route("visi-misi")}
                        className={`${
                            route().current("visi-misi") ? "text-blue-900" : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Visi Misi
                    </Link>
                    <Link
                        as="div"
                        href={route("susunan-direksi")}
                        className={`${
                            route().current("susunan-direksi")
                                ? "text-blue-500"
                                : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Susunan Direksi
                    </Link>
                    <Link
                        as="div"
                        href={route("sejarah")}
                        className={`${
                            route().current("sejarah") ? "text-blue-900" : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Sejarah
                    </Link>
                    <Link
                        as="div"
                        href={route("struktur-organisasi")}
                        className={`${
                            route().current("struktur-organisasi")
                                ? "text-blue-500"
                                : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Struktur Organisasi
                    </Link>
                    <Link
                        as="div"
                        href={route("simulasi")}
                        className={`${
                            route().current("simulasi") ? "text-blue-500" : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Simulasi
                    </Link>
                    <Link
                        as="div"
                        href={route("info-pdam")}
                        className={`${
                            route().current("info-pdam") ? "text-blue-500" : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Info PDAM
                    </Link>
                    <Link
                        as="div"
                        href={route("berita")}
                        className={`${
                            route().current("berita") ? "text-blue-500" : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Berita
                    </Link>
                    <Link
                        as="div"
                        href={route("galery")}
                        className={`${
                            route().current("galery") ? "text-blue-500" : ""
                        } py-1 px-3 hover:bg-slate-950 hover:text-white text-xl my-3 hover:cursor-pointer`}
                    >
                        Galery
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
}
