import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ icon, title, href, active }) {
    return (
        <Link
            href={href}
            as="div"
            className={`${
                route().current(active) ? "bg-slate-950" : ""
            } relative px-3 py-2 hover:dark:bg-blue-600 hover:bg-slate-950  cursor-pointer duration-300 ease-in-out transition-all capitalize`}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3  items-center">
                    <div className="text-md m-0 lg:text-xl duration-300 transition-all ease-in-out">
                        {icon}
                    </div>
                    <div className="">{title}</div>
                </div>
            </div>
        </Link>
    );
}
