import MenuPelanggan from "@/Components/MenuPelanggan";
import SliderCard from "@/Components/SliderCard";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import { ArrowForward } from "@mui/icons-material";
import moment from "moment";
import React from "react";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Index(props) {
    const slide = props.slide;
    const galery = props.galery;
    const berita = props.berita;
    const info = props.info;
    const spanStyle = {
        padding: "10px",
        background: "#34erew",
        color: "#000000",
    };

    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        height: "50vh",
    };

    const settings = {
        autoplay: true,
        indicators: true,
        infinite: true,
        pauseOnHover: true,
        duration: 2000,
        transitionDuration: 1000,
    };
    const buttonStyle = {
        width: "30px",
        background: "white",
        padding: 10,
        border: "0px",
        borderRadius: "100%",
    };
    const properties = {
        prevArrow: (
            <button style={{ ...buttonStyle }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="#3b82f6"
                >
                    <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
                </svg>
            </button>
        ),
        nextArrow: (
            <button className="rounded-full" style={{ ...buttonStyle }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="#3b82f6 "
                >
                    <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
                </svg>
            </button>
        ),
    };

    // console.log(auth.user || "anuuuu");
    return (
        <div>
            {/* navbar */}

            {/* children disini yah*/}

            <div className="px-3 md:px-6 lg:px-16 py-6 bg-no-repeat bg-center bg-[foto('/storage/icon/header-background.svg')]">
                <div className="slide-container">
                    <Slide {...settings} {...properties}>
                        {slide.map((item, index) => (
                            <div key={index}>
                                <div
                                    style={{
                                        ...divStyle,
                                        backgroundImage: `url(./storage/${item.foto})`,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
            {/* Menu */}
            <div>
                <div className="py-6 px-4 md:px-8 lg:px-16">
                    {/* <div className="grid grid-cols-2 md:grid-cols-4">
                        <Link
                            href=""
                            as="div"
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="rounded-full hover:bg-blue-500 inline-block p-10 stroke-blue-500 hover:stroke-white">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="59"
                                        height="58"
                                        viewBox="0 0 59 58"
                                    >
                                        <g
                                            fill="none"
                                            fill-rule="evenodd"
                                            stroke="inherit"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        >
                                            <path d="M57.965 48.663V36.92c-2.287 0-4.52-.698-6.408-2.003l-6.2-4.28A9.23 9.23 0 0 0 40.113 29H27.33c-1.415 0-2.564 1.162-2.564 2.595 0 1.433 1.149 2.594 2.564 2.594h8.091c1.493 0 2.706 1.228 2.706 2.74a2.736 2.736 0 0 1-1.763 2.566l-11.719 4.41a5.739 5.739 0 0 1-5.338-.689L6.731 34.317a3.637 3.637 0 0 0-5.016.793 3.736 3.736 0 0 0 .648 5.16l19.086 15.194a7.024 7.024 0 0 0 6.194 1.298l30.322-8.1zM26.965 23l-11.03-10.776a6.47 6.47 0 0 1 0-9.299c2.63-2.567 6.889-2.567 9.516 0a6.534 6.534 0 0 1 1.514 2.263 6.534 6.534 0 0 1 1.514-2.263c2.627-2.567 6.889-2.567 9.516 0a6.47 6.47 0 0 1 0 9.299L26.965 23z" />
                                        </g>
                                    </svg>
                                </div>
                                <p></p>
                            </div>
                            <p className="text-blue-500 font-semibold my-2">
                                Layanan Pelanggan
                            </p>
                        </Link>
                        <Link
                            href={route("pelanggan.pengaduan-pelanggan")}
                            as="div"
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="rounded-full hover:bg-blue-500 inline-block p-10 stroke-blue-500 hover:stroke-white">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="58"
                                        height="58"
                                        viewBox="0 0 39 58"
                                    >
                                        <g
                                            fill="none"
                                            fill-rule="evenodd"
                                            stroke="inherit"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        >
                                            <path d="M21.965 34a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM2.965 57c0-7.596 4.045-12 4.045-12a12.645 12.645 0 0 0 6.956 2.075c2.562 0 4.949-.761 6.954-2.075 0 0 4.045 4.404 4.045 12h-22zM35.965 38c0 3.312-2.463 6-5.5 6s-5.5-2.688-5.5-6c0-3.314 2.463-6 5.5-6s5.5 2.686 5.5 6zM23.965 48.518c.76-1.634 1.6-2.518 1.6-2.518a8.965 8.965 0 0 0 4.803 1.384c1.77 0 3.418-.508 4.804-1.384 0 0 2.793 2.936 2.793 8H25.591M17.215 18.17L13.337 22v-3.83h-7.72c-2.009 0-3.652-1.62-3.652-3.604V4.605C1.965 2.623 3.608 1 5.617 1h20.698c2.008 0 3.65 1.623 3.65 3.605v9.96c0 1.984-1.642 3.606-3.65 3.606h-9.1z" />
                                            <path d="M20.965 18.485v1.913c0 1.229.939 2.233 2.086 2.233h5.2L31.128 25v-2.369h3.752c1.147 0 2.086-1.004 2.086-2.233v-6.166c0-1.228-.939-2.232-2.086-2.232h-5.01" />
                                        </g>
                                    </svg>
                                </div>
                                <p></p>
                            </div>
                            <p className="text-blue-500 font-semibold my-2">
                                Pengaduan Pelanggan
                            </p>
                        </Link>
                        <Link
                            href={route("pelanggan.permintaan-sambungan-baru")}
                            as="div"
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="rounded-full hover:bg-blue-500 inline-block p-10 stroke-blue-500 hover:stroke-white">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="61"
                                        height="58"
                                        viewBox="0 0 61 58"
                                    >
                                        <g
                                            fill="none"
                                            fill-rule="evenodd"
                                            stroke="inherit"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        >
                                            <path d="M6.465 35V22M52.965 22v31h-31" />
                                            <path d="M.988 27.04l29.12-25.446L59.225 27.04M30.107 42.458a7.478 7.478 0 0 0 5.081-1.963 7.093 7.093 0 0 0 2.228-4.124M13.346 50.112c-2.872 0-5.2-2.317-5.2-5.175 0-2.857 2.328-5.174 5.2-5.174 2.87 0 5.2 2.317 5.2 5.174 0 2.858-2.33 5.175-5.2 5.175zm12.102-2.8v-4.749h-2.727a9.613 9.613 0 0 0-1.058-2.544l1.928-1.92-3.375-3.357-1.928 1.919a9.659 9.659 0 0 0-2.556-1.055v-2.714H10.96v2.714a9.64 9.64 0 0 0-2.556 1.055l-1.928-1.919L3.101 38.1l1.928 1.919a9.523 9.523 0 0 0-1.058 2.544H1.244v4.749H3.97c.23.906.59 1.76 1.058 2.544l-1.928 1.92 3.375 3.357 1.928-1.919a9.64 9.64 0 0 0 2.556 1.055v2.712h4.772V54.27a9.659 9.659 0 0 0 2.556-1.055l1.928 1.919 3.375-3.358-1.928-1.919a9.613 9.613 0 0 0 1.058-2.544h2.727z" />
                                            <path d="M25.448 44.813a10.26 10.26 0 0 0 4.66 1.111c2.478 0 4.957-.884 6.876-2.656 1.7-1.567 2.688-3.524 3.016-5.583.332-2.059.003-4.218-.926-6.192-1.014-2.154-3.256-6.232-5.244-9.775a696.037 696.037 0 0 0-3.723-6.541s-1.734 3.002-3.723 6.541c-1.988 3.543-4.23 7.62-5.244 9.775a11.064 11.064 0 0 0-.961 3.243" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <p className="text-blue-500 font-semibold my-2">
                                Pemasangan Baru
                            </p>
                        </Link>
                        <Link
                            as="div"
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="rounded-full hover:bg-blue-500 inline-block p-10 stroke-blue-500 hover:stroke-white">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="60"
                                        height="53"
                                        viewBox="0 0 60 53"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <path
                                                fill="#B2E2F5"
                                                d="M45.345 29.198c0 8.864-7.186 16.05-16.05 16.05-8.865 0-16.05-7.186-16.05-16.05s7.185-16.051 16.05-16.051c8.864 0 16.05 7.187 16.05 16.05"
                                            />
                                            <path
                                                stroke="#2C4A9A"
                                                stroke-width="2"
                                                d="M53.634 28.33c0 12.962-10.508 23.47-23.471 23.47-12.962 0-23.47-10.508-23.47-23.47 0-12.963 10.508-23.471 23.47-23.471 12.963 0 23.47 10.508 23.47 23.47z"
                                            />
                                            <path
                                                stroke="#2C4A9A"
                                                stroke-width="2"
                                                d="M48.081 28.33c0 9.896-8.022 17.918-17.918 17.918-9.896 0-17.918-8.022-17.918-17.918 0-9.896 8.022-17.92 17.919-17.92 9.895 0 17.917 8.024 17.917 17.92z"
                                            />
                                            <path
                                                stroke="#2A84C4"
                                                stroke-width="2"
                                                d="M19.406 22.462H40.92M19.406 28.33H40.92M25.273 36.153h9.78"
                                            />
                                            <path
                                                stroke="#2C4A9A"
                                                stroke-width="2"
                                                d="M7.018 24.418H0m0 7.823h7.02m46.283 0H60m0-7.824h-6.695M24.578 5.529V.999h11.17v4.529"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                <p></p>
                            </div>
                            <p className="text-blue-500 font-semibold my-2">
                                History Pemakaian
                            </p>
                        </Link>
                    </div> */}
                </div>
            </div>
            {/* info */}
            <div className="px-3 md:px-6 lg:px-16 pt-6">
                <div className="flex gap-x-3 justify-between items-center">
                    <h1 className="text-blue-500 font-fira font-semibold text-lg md:text-xl lg:text-2xl">
                        INFO PDAM
                    </h1>
                    <Link
                        href={route("info-pdam")}
                        className="text-blue-500 font-fira font-semibold text-xs"
                    >
                        SELENGKAPNYA{" "}
                        <span className="p-1 bg-blue-500 text-white rounded-full">
                            <ArrowForward fontSize="inherit" color="inherit" />
                        </span>
                    </Link>
                </div>
                <div className="slide-container my-3">
                    <SliderCard show={info.length}>
                        {info.map((item, index) => (
                            <SliderCard.Item
                                link={route("show-info-pdam", item.slug)}
                                key={index}
                                image={item.foto}
                            >
                                <div
                                    as="div"
                                    className="flex justify-end items-end h-full w-full"
                                >
                                    <div className="bg-blue-500/50 backdrop-blur-sm w-full px-3 py-2 rounded-md">
                                        <div className="">
                                            <p className="text-white font-semibold text-sm">
                                                {item.judul}
                                            </p>
                                            <p className="text-xs font-extralight text-white">
                                                {moment(item.created_at).format(
                                                    "ll"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SliderCard.Item>
                        ))}
                    </SliderCard>
                </div>
            </div>
            <div className="px-3 md:px-6 lg:px-16 pt-6">
                <div className="flex gap-x-3 justify-between items-center">
                    <h1 className="text-blue-500 font-fira font-semibold text-lg md:text-xl lg:text-2xl">
                        Berita
                    </h1>
                    <Link
                        href={route("berita")}
                        className="text-blue-500 font-fira font-semibold text-xs"
                    >
                        SELENGKAPNYA{" "}
                        <span className="p-1 bg-blue-500 text-white rounded-full">
                            <ArrowForward fontSize="inherit" color="inherit" />
                        </span>
                    </Link>
                </div>
                <div className="slide-container my-3">
                    <SliderCard show={berita.length}>
                        {berita.map((item, index) => (
                            <SliderCard.Item
                                link={route("show-berita", item.slug)}
                                key={index}
                                image={item.foto}
                            >
                                <div
                                    as="div"
                                    className="flex justify-end items-end h-full w-full"
                                >
                                    <div className="bg-blue-500/50 backdrop-blur-sm w-full px-3 py-2 rounded-md">
                                        <div className="">
                                            <p className="text-white font-semibold text-sm">
                                                {item.judul}
                                            </p>
                                            <p className="text-xs font-extralight text-white">
                                                {moment(item.created_at).format(
                                                    "ll"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SliderCard.Item>
                        ))}
                    </SliderCard>
                </div>
            </div>
            <div className="px-3 md:px-6 lg:px-16 pt-6">
                <div className="flex gap-x-3 justify-between items-center">
                    <h1 className="text-blue-500 font-fira font-semibold text-lg md:text-xl lg:text-2xl">
                        Galery
                    </h1>
                    <Link
                        href={route("galery")}
                        className="text-blue-500 font-fira font-semibold text-xs"
                    >
                        SELENGKAPNYA{" "}
                        <span className="p-1 bg-blue-500 text-white rounded-full">
                            <ArrowForward fontSize="inherit" color="inherit" />
                        </span>
                    </Link>
                </div>
                <div className="slide-container my-3">
                    <SliderCard show={galery.length}>
                        {galery.map((item, index) => (
                            <SliderCard.Item
                                link={route("show-galery", item.slug)}
                                key={index}
                                image={item.foto}
                            ></SliderCard.Item>
                        ))}
                    </SliderCard>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
