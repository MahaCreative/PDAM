import Layout from "@/Components/Layout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    const status = props.status;
    const sejarah = props.sejarah;
    const { settingApps } = usePage().props;
    console.log(sejarah);
    return (
        <div>
            <Layout>
                <div className="px-2 md:px-4 lg:px-8 w-[100%] md:w-[70%]">
                    <p className="font-light text-md uppercase text-gray-500 border-b border-gray-500/50">
                        profile perusahaan
                    </p>
                    <h3 className="font-bold font-fira text-4xl text-blue-800 Misi py-8">
                        Sejarah dan Status {settingApps.nama_perusaaan}
                    </h3>
                    <div className="w-full flex flex-col items-center justify-center ">
                        <h3 className="font-extralight text-3xl text-blue-500">
                            STATUS
                        </h3>
                        <div className="pt-3  w-[80%]  text-left text-blue-800 pb-9 border-b border-gray-500/50">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: status.text,
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full my-4 flex flex-col items-center justify-center ">
                        <h3 className="font-extralight text-3xl text-blue-500">
                            SEJARAH
                        </h3>
                        <ul className="flex flex-col gap-x-3 ">
                            {sejarah.map((item, key) => (
                                <li
                                    className={`py-[40px] w-full pl-[40px] before:-z-10 after:-z-10 before:w-[2px]  md:pl-0 flex flex-col md:flex-row justify-center items-center 
                            relative before:absolute ${
                                key + 1 !== 1 &&
                                "  before:h-1/2 before:bg-blue-500  before:top-0 "
                            }
                            -ml-1 ${
                                sejarah.length == key + 1
                                    ? ""
                                    : "after:absolute after:w-[2px] after:h-1/2 after:bg-blue-500 after:bottom-0 "
                            }
                            before:left-[30px] after:left-[30px] md:before:left-[50%] md:after:left-[50%]`}
                                >
                                    <span className="w-[40px] h-[40px] text-sm flex items-center justify-center text-white left-[30px] md:left-[50%] top-[50%] -z-[1] text-center absolute mt-[-30px] ml-[-20px] bg-blue-600 rounded-full ">
                                        {item.tahun}
                                    </span>
                                    <p
                                        className={`${
                                            (key + 1) % 2 == 1
                                                ? "md:text-right md:pr-[40px] lg:pr-[160px] "
                                                : "md:text-left md:pl-[40px] lg:pl-[160px] "
                                        } order-2 md:order-1  lg:text-md  w-[100%] text-left`}
                                        dangerouslySetInnerHTML={{
                                            __html: item.text,
                                        }}
                                    />

                                    <div
                                        className={` ${
                                            (key + 1) % 2 == 1
                                                ? "order-1 md:order-2 "
                                                : ""
                                        }   pr-0 md:pl-[70px] flex-grow[1] flex-shrink`}
                                    >
                                        <img src="/storage/icon/timeline-image.svg" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
