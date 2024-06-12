import AdminLayout from "@/Layouts/AdminLayout";
import provider from "@/Pages/Pelanggan/Pengaduan/provider";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default function Index(props) {
    const pengaduan = props.pengaduan;
    const mapRef = useRef();
    const zoom = 12;
    const icon = L.icon({
        iconUrl: "/storage/Image/marker.png",
        iconSize: [25, 25],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    });
    const columns = [
        {
            name: "#",
            selector: (row, id) => id + 1,
            width: "60px",
        },
        {
            name: "Kode Pengaduan",
            selector: (row) => row.kd_pengaduan,
            width: "150px",
        },
        {
            name: "Tanggal Pengaduan",
            selector: (row) => moment(row.tanggal_pengaduan).format("LL"),
            width: "160px",
        },
        {
            name: "Jenis Pengaduan",
            selector: (row) => row.jenis_pengaduan.jenis_pengaduan,
            width: "160px",
            wrap: true,
        },
        {
            name: "Nama Pelapor",
            selector: (row) => row.nama_pelapor,
            width: "160px",
            wrap: true,
        },
        {
            name: "Tanggal Di Proses",
            selector: (row) =>
                row.tanggal_proses_pengaduan
                    ? row.tanggal_proses_pengaduan
                    : "Belum Di Proses",
            width: "160px",
            wrap: true,
        },
        {
            name: "Petugas Menangani",
            selector: (row) =>
                row.nama_petugas_menangani
                    ? row.nama_petugas_menangani
                    : "Belum Di Proses",
            width: "160px",
            wrap: true,
        },
        {
            name: "Status Konfirmasi",
            selector: (row) => row.status_konfirmasi,
            width: "160px",
            wrap: true,
        },
        {
            name: "Status Pengaduan",
            selector: (row) => row.status,
            width: "160px",
            wrap: true,
        },
        {
            name: "Lihat Pengaduan",
            selector: (row) => (
                <Link
                    href={route(
                        "admin.show-pengaduan-pelanggan",
                        row.kd_pengaduan
                    )}
                    className="btn-primary"
                    as="button"
                >
                    Lihat Pengaduan
                </Link>
            ),
            width: "160px",
            wrap: true,
        },
    ];
    return (
        <div className="py-6">
            <div className="my-3 ">
                <Link
                    href={route("pelanggan.buat-pengaduan-pelanggan")}
                    as="button"
                    className="btn-primary"
                >
                    Buat Pengaduan
                </Link>
            </div>
            <DataTable data={pengaduan} columns={columns} pagination />
            <div className="w-full h-full">
                <h3 className="my-3 font-bold text-blue-500">
                    Geografis Pengaduan
                </h3>
                <MapContainer
                    center={
                        pengaduan.length > 0
                            ? [pengaduan[0].langtitude, pengaduan[0].longtitude]
                            : [-2.527674, 119.096151]
                    }
                    className="w-full h-[50vh] rounded-md shadow-sm shadow-gray-500"
                    ref={mapRef}
                    zoom={zoom}
                >
                    <TileLayer
                        url={provider.maptier.url}
                        attribution={provider.maptier.attribution}
                    />
                    {pengaduan &&
                        pengaduan.map((item, key) => (
                            <Marker
                                icon={icon}
                                key={key}
                                position={[item.langtitude, item.longtitude]}
                            >
                                <Popup>
                                    <div className="tracking-tighter leading-none">
                                        <div className=" border-b border-gray-500">
                                            <p className="capitalize font-bold text-blue-500">
                                                {
                                                    item.jenis_pengaduan
                                                        .jenis_pengaduan
                                                }
                                            </p>
                                        </div>
                                        <p>{item.nama_pelapor}</p>
                                        <p>{item.pengaduan}</p>
                                        <p className="text-blue-500">
                                            {moment(
                                                item.tanggal_pengaduan
                                            ).format("LL")}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title="Pengaduan Pelanggan" />
);
