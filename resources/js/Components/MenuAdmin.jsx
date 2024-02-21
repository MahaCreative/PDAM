import React from "react";
import MenuSidebar from "./MenuSidebar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PeopleIcon from "@mui/icons-material/People";
import { usePage } from "@inertiajs/react";
import {
    ContactSupport,
    CorporateFare,
    Receipt,
    Report,
} from "@mui/icons-material";

export default function MenuAdmin() {
    const { wilayah } = usePage().props;
    return (
        <div>
            <MenuSidebar
                title={"Master Data"}
                icon={<CorporateFare color="inherit" fontSize="inherit" />}
            >
                <MenuSidebar.MenuLink href={route("admin.setting-apps")}>
                    Profile Perusahaan
                </MenuSidebar.MenuLink>
                <MenuSidebar.MenuLink href={route("admin.wilayah")}>
                    Data Wilayah
                </MenuSidebar.MenuLink>
                <MenuSidebar.MenuLink href={route("admin.harga-tarif")}>
                    Harga Tarif
                </MenuSidebar.MenuLink>
                <MenuSidebar.MenuLink href={route("admin.golongan-kelompok")}>
                    Golongan dan Kelompok
                </MenuSidebar.MenuLink>
                <MenuSidebar.MenuLink href={route("admin.data-pelanggan")}>
                    Data Pelanggan
                </MenuSidebar.MenuLink>
            </MenuSidebar>
            <MenuSidebar
                title={"Transaksi"}
                icon={<Receipt color="inherit" fontSize="inherit" />}
            >
                <MenuSidebar.MenuLink href={route("admin.pemasangan-baru")}>
                    Pemasangan Baru
                </MenuSidebar.MenuLink>
                <MenuSidebar.MenuLink href={route("admin.pencatatan-meter")}>
                    Pencatatan Meter
                </MenuSidebar.MenuLink>
                <MenuSidebar.MenuLink href={route("admin.tagihan-bulanan")}>
                    Tagihan Bulanan
                </MenuSidebar.MenuLink>
            </MenuSidebar>
            <MenuSidebar
                title={"Pengaduan Pelanggan"}
                icon={<ContactSupport color="inherit" fontSize="inherit" />}
            >
                <MenuSidebar.MenuLink
                    href={route("admin.pengajuan-pemasangan-baru")}
                >
                    Pemasangan Baru
                </MenuSidebar.MenuLink>
            </MenuSidebar>
        </div>
    );
}
