import React, { useEffect, useRef, useState } from "react";

export default function DropdownLink({ children, name }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    return (
        <div>
            <div
                onClick={() => setOpen(true)}
                className={`py-1 px-2 hover:cursor-pointer hover:bg-slate-950 rounded-md relative h-auto transition-all duration-1000 ${
                    open ? "overflow-visible" : "overflow-y-hidden "
                }`}
            >
                <div className="">{name}</div>
                <div
                    ref={menuRef}
                    className={` absolute z-[50] transition-all transform duration-300 text-slate-600  right-0 text-xs top-10 bg-white border border-slate-500/50 rounded-md overflow-hidden ${
                        open ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                    <div className="relative">{children}</div>
                </div>
            </div>
        </div>
    );
}
