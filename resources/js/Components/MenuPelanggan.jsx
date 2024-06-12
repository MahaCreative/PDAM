import React from "react";
import MenuLink from "./MenuLink";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
    AccountBalance,
    Add,
    History,
    Logout,
    NewReleases,
    Payment,
    PaymentRounded,
    Report,
    Settings,
    WaterDrop,
} from "@mui/icons-material";
import MenuSidebar from "./MenuSidebar";
export default function MenuPelanggan() {
    return (
        <div>
            <MenuSidebar
                icon={<History color="inerit" fontSize="inherit" />}
                title={"Meteran Saya"}
            >
                <MenuSidebar.MenuLink
                    href={route("pelanggan.meteran-pelanggan")}
                >
                    Meteran Saya
                </MenuSidebar.MenuLink>

                <MenuSidebar.MenuLink
                    href={route("pelanggan.tagihan-bulanan-saya")}
                >
                    Tagihan Bulanan
                </MenuSidebar.MenuLink>
            </MenuSidebar>
            <MenuSidebar.MenuLink href={route("pelanggan.pengaduan-pelanggan")}>
                Pengaduan Pelanggan
            </MenuSidebar.MenuLink>

            {/* <MenuSidebar
                icon={<History color="inerit" fontSize="inherit" />}
                title={"History"}
            >
                <MenuLink
                    href={route("pelanggan.permintaan-sambungan-baru")}
                    active={"pelanggan.permintaan-sambungan-baru"}
                    title={"Pembayaran Tagihan Pemasangan Baru"}
                    icon={<Add color="inerit" fontSize="inherit" />}
                />
                <MenuLink
                    href={route("pelanggan.permintaan-sambungan-baru")}
                    active={"pelanggan.permintaan-sambungan-baru"}
                    title={"Pembayaran Tagihan Bulanan"}
                    icon={<Add color="inerit" fontSize="inherit" />}
                />
            </MenuSidebar> */}
        </div>
    );
}
