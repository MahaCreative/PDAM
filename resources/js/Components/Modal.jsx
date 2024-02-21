import { Close } from "@mui/icons-material";
import React from "react";

export default function Modal({ open, setOpen, title, children }) {
    return (
        <div
            className={`fixed top-0 left-0 overflow-hidden w-full h-full bg-gray-950/30 transiiAktif backdrop-blur-sm z-[555] ${
                open ? "min-h-full" : "max-h-0"
            }`}
        >
            <div className="w-full h-full flex justify-center items-center relative p-4">
                <div
                    className={`bg-white darkBackground dark:text-white py-2 px-3 rounded-md ${
                        open ? "translate-y-0" : " translate-y-5"
                    } transition-all duration-300 transform max-h-[90%] overflow-auto`}
                >
                    <div className="flex jutify-between items-center border-b border-blue-600 py-1 gap-x-10 w-full">
                        <p>{title}</p>
                        <button
                            className="hover:text-blue-600 active:text-blue-600"
                            onClick={() => setOpen(false)}
                        >
                            <Close color="inherit" />
                        </button>
                    </div>
                    <div className="py-3">{open && children}</div>
                </div>
            </div>
        </div>
    );
}
