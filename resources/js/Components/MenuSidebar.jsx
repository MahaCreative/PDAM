import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import clsx from "clsx";
import { Link } from "@inertiajs/react";
function MenuSidebar({ children, title, icon }) {
    const [open, setOpen] = useState(false);
    const menurRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!menurRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
        document.read;
    });
    return (
        <div
            onClick={() => setOpen(!open)}
            ref={menurRef}
            className={clsx(
                open ? "bg-blue-600" : "",
                "relative px-3 py-2 hover:dark:bg-blue-600 hover:bg-slate-950  cursor-pointer duration-300 ease-in-out transition-all capitalize text-sm"
            )}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-x-3  items-center">
                    <div className="text-md m-0 lg:text-xl duration-300 transition-all ease-in-out">
                        {icon}
                    </div>
                    <div className="">{title}</div>
                </div>
                <div
                    className={clsx(
                        open ? "rotate-180" : "rotate-0",
                        "text-2xl duration-300 ease-in-out transition-all"
                    )}
                >
                    <ArrowDropDownIcon color="inherit" fontSize="inerit" />
                </div>
            </div>
            <div
                className={clsx(
                    open
                        ? "max-h-full translate-x-0 block  py-2 opacity-100 overflow-visible"
                        : "h-0 -translate-x-8 collapse opacity-0 py-0 overflow-hidden",
                    "text-sm relative transform duration-300 ease-in-out transition-all capitalize"
                )}
            >
                {children}
            </div>
        </div>
    );
}

function MenuLink({ children, ...props }) {
    return (
        <div>
            <Link
                as="div"
                className="hover:bg-blue-500 w-full px-10 py-1 ease-in-out transition-all duration-200 rounded-md"
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}
MenuSidebar.MenuLink = MenuLink;
export default MenuSidebar;
