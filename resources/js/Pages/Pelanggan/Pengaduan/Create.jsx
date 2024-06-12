import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useRef, useState } from "react";

import provider from "./provider";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Input from "@/Components/Input";
import { Search } from "@mui/icons-material";
import ReactSelect from "react-select";
import Form from "./Form";
import { usePage } from "@inertiajs/react";
const nominatim_url = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    country: "Indonesia",
    format: "json",
    addressdetails: "addressdetails",
};
export default function Create(props) {
    const jenisPengaduan = props.jenisPengaduan;
    const [loc, setLoc] = useState({ lat: "", lng: "" });
    const mapRef = useRef();
    const [view, setView] = useState(false);
    const icon = L.icon({
        iconUrl: "/storage/Image/marker.png",
        iconSize: [25, 25],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
    });
    const [dataLocation, setDataLocation] = useState(null);

    const zoom = 9;
    const [address, setAdress] = useState("");
    const [center, setCenter] = useState({
        lat: -2.527674,
        lng: 119.096151,
    });
    const handlerSearch = (e) => {
        setAdress(e.target.value);
    };
    useEffect(() => {
        const params = {
            q: address,
            // country: "Indonesia",
            format: "json",
            addressdetails: 1,
        };
        const queryString = new URLSearchParams(params).toString();
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch(`${nominatim_url}${queryString}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                setDataLocation(data);
            })
            .catch((err) => alert(`err:${err}`));
    }, [address]);
    const selectLocation = (value) => {
        console.log(value.lat);
        setView(false);
        setTimeout(() => {
            setCenter({ lat: value.lat, lng: value.lon });

            mapRef.current.flyTo([center.lat, center.lng], 13);
        }, 1000);
    };
    const onSuccess = (location) => {
        setCenter({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
        setLoc({
            ...loc,
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
        mapRef.current.flyTo([center.lat, center.lng], 13);
    };

    const onError = (error) => {
        alert(err);
    };
    const showLocation = () => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    };
    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setCenter({ ...center, lat: lat, lng: lng });
                setLoc({ ...loc, lat: lat, lng: lng });
                map.flyTo([lat, lng], map.getZoom());
            },
        });

        return (
            <>
                <Marker position={[center.lat, center.lng]}>
                    <Popup>Lokasi Saya Saat Ini</Popup>
                </Marker>
            </>
        );
    };

    return (
        <div className="py-6">
            <h3 className="font-semibold text-blue-500">
                Buat Pengaduan Pelanggan Baru
            </h3>
            <div className="flex flex-col gap-3">
                <Input
                    title={"Cari Kota"}
                    onChange={handlerSearch}
                    name="Cari Alamat Anda"
                />
                {dataLocation && (
                    <div className="py-3 shadow-sm shadow-gray-400/50 rounded-md px-2">
                        {dataLocation.map((item, index) => (
                            <div
                                onClick={() => selectLocation(item)}
                                className="my-2 flex gap-3 border-b border-gray-500/50 py-2 items-center hover:bg-blue-500 cursor-pointer hover:text-white px-3 max-h=[40vh] overflow-auto"
                            >
                                <img
                                    src="/storage/Image/marker.png"
                                    className="w-[20px] h-[30px]"
                                />
                                <div>
                                    <p className="capitalize">
                                        {item.display_name}
                                    </p>
                                    <p>Kota : {item.address.city}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col md:flex-row gap-3 h-full">
                <div className="w-full h-full">
                    <MapContainer
                        center={[center.lat, center.lng]}
                        className="w-full h-[50vh] rounded-md shadow-sm shadow-gray-500"
                        ref={mapRef}
                        zoom={zoom}
                    >
                        {loc.lat && <LocationMarker />}
                        <TileLayer
                            url={provider.maptier.url}
                            attribution={provider.maptier.attribution}
                        />
                    </MapContainer>
                    <button onClick={showLocation} className="btn-primary my-3">
                        Locate Me
                    </button>
                </div>
                <Form loc={loc} jenisPengaduan={jenisPengaduan} />
            </div>
        </div>
    );
}

Create.layout = (page) => (
    <AdminLayout children={page} title={"Buat Pengaduan Baru"} />
);
