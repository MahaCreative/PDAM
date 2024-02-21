import React from "react";
import MenuLink from "./MenuLink";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Add, Logout, Report, Settings, WaterDrop } from "@mui/icons-material";
export default function MenuPelanggan() {
    return (
        <div>
            <MenuLink
                href={route("pelanggan.permintaan-sambungan-baru")}
                active={"pelanggan.permintaan-sambungan-baru"}
                title={"Permintaan Sambungan Baru"}
                icon={<Add color="inerit" fontSize="inherit" />}
            />
            <MenuLink
                href={route("pelanggan.sambungan-pelanggan")}
                active={"pelanggan.sambungan-pelanggan"}
                title={"Menghubungkan Akun Meteran"}
                icon={<WaterDrop color="inerit" fontSize="inherit" />}
            />
            <MenuLink
                title={"History Pembayaran"}
                icon={<WidgetsIcon color="inerit" fontSize="inherit" />}
            />
            <MenuLink
                title={"History Pemakaian Air"}
                icon={<WidgetsIcon color="inerit" fontSize="inherit" />}
            />
            <MenuLink
                title={"Pengaduan"}
                icon={<Report color="inerit" fontSize="inherit" />}
            />
        </div>
    );
}
