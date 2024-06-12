import React, { useEffect, useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Bahasa Indonesia locale
import ScheduleIcon from "@mui/icons-material/Schedule";
import clsx from "clsx";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CloseIcon from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";
export default function SidebarDesktop({ children, auth }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    console.log(auth);
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now);
        };

        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const options = { timeZone: "Asia/Jakarta" };
    const formattedTime = currentTime.toLocaleTimeString(
        "en-US",
        "HH:mm:ss",
        options
    );
    const formattedDay = format(currentTime, "EEEE", { locale: id }); // Menggunakan bahasa Indonesia
    const sidebarRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!sidebarRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });
    return (
        <div
            ref={sidebarRef}
            className={clsx(
                open ? "translate-x-0" : "-translate-x-full",
                "fixed text-white h-full min-w-[70%] md:w-[40%] lg:min-w-[20%]    transition-all duration-300 ease-in-out  transform z-[9999]"
            )}
        >
            <div className="relative h-full">
                <div className="w-full h-full absolute justify-end flex items-center -right-8">
                    <div
                        onClick={() => setOpen(!open)}
                        className="inline  lightBackground darkBackground    py-2 px-3 rounded-e-full hover:cursor-pointer hover:bg-white hover:text-blue-500 duration-300 transition-all"
                    >
                        {open ? (
                            <Close color="inherit" fontSize="inherit" />
                        ) : (
                            <WidgetsIcon color="inherit" fontSize="inherit" />
                        )}
                    </div>
                </div>
                <div className="w-full h-full lightBackground darkBackground  z-[44] absolute">
                    <div className="flex justify-start items-center gap-x-2 py-1 px-2 border-b border-white/50 text-center w-full">
                        <div className="w-[10%]">
                            <img
                                src={"storage/" + auth.profile.foto}
                                alt=""
                                className="w-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-semibold text-base lg:text-lg transiisi">
                                <p>Hy, {auth.user.name}</p>
                            </div>
                            <div className="font-light text-xs transiisi">
                                <p>Level: {auth.roles}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-3 w-full px-3 py-2 border-b border-white/50 ">
                        <div className="text-xl">
                            <ScheduleIcon color="inherit" fontSize="inherit" />
                        </div>
                        <div className="font-medium">
                            {formattedDay},{formattedTime}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
