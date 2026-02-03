import { useState } from "react"
import { useDarkMode } from "../hooks/useDarkMode";

import { Link } from "react-router-dom";

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiOutlinePlus } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { PiGearSix } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { AiOutlineShop } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {

    const [open, setOpen] = useState(false)
    const { isDark, toggle } = useDarkMode();

    
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <header className="z-99 bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 w-[95%] fixed rounded-2xl border border-gray-300 px-10 flex justify-between h-fit items-center">
            <Link to="/">
                <img src="/diagnovet-removebg.png" alt="logo" className="h-14 w-14 cursor-pointer" />
            </Link>
            <button
                onClick={toggle}
                className="
                    w-fit rounded-lg border 
                    border-gray-300 dark:border-neutral-600
                    px-3 py-2 text-sm
                    hover:bg-gray-100 dark:hover:bg-neutral-700
                    transition cursor-pointer
                "
                >
                {isDark ? "☀️" : "🌙"}
            </button>


            <div className="flex gap-10 p-0.5">
                <Link to="/" className="flex items-center gap-1">
                    <IoSpeedometerOutline className=" text-2xl" />
                    <button className=" hover:text-cyan-400 cursor-pointer font-medium">Mis Estudios</button>
                </Link>

                <Link to="/new-study" className="flex items-center gap-1">
                    <HiOutlinePlus className=" text-2xl" />
                    <button className=" hover:text-cyan-400 cursor-pointer font-medium">Nuevo Reporte</button>
                </Link>

                {/* TRIGGER PERFIL */}
                <div
                    className="group flex cursor-pointer items-center gap-3 border border-transparent rounded-full p-1.5 transition-colors duration-200 hover:border-cyan-400 "
                    onClick={() => setOpen(!open)}
                >
                    <img
                        src={user?.imgPerfil || "/user-default.png"}
                        alt="userImg"
                        className="h-12 w-12 rounded-full border border-cyan-400"
                    />

                    {open && (
                        <div className="absolute right-45 top-full mt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>

                            {/* MENU PRINCIPAL */}
                            <div className="
                                flex flex-col rounded-2xl p-6 shadow-lg items-center gap-4
                                bg-white dark:bg-neutral-900
                                border border-gray-200 dark:border-neutral-700
                                text-gray-900 dark:text-neutral-100
                            ">

                                {/* CONFIGURACION */}
                                <div className="relative group/config">

                                    <div className="flex justify-between gap-5 cursor-pointer">
                                        <div className="flex gap-2 font-medium items-center">
                                            <PiGearSix className=" text-xl text-cyan-400 transition-transform duration-200 w-5 group-hover/config:rotate-90"/>
                                            <p className="transition-colors duration-200 group-hover/config:text-cyan-400">
                                                Configuracion
                                            </p>
                                        </div>
                                        <IoIosArrowDown
                                            className="text-2xl transition-transform duration-200 text-cyan-400 -rotate-90 group-hover/config:rotate-0"
                                        />
                                    </div>

                                    {/* SUBMENU */}
                                    <div className="absolute -right-[110%] -top-5 pl-10
                                        opacity-0 pointer-events-none
                                        group-hover/config:opacity-100
                                        group-hover/config:pointer-events-auto
                                        transition-opacity duration-200">

                                        <div className="
                                            h-fit flex flex-col rounded-2xl p-6 shadow-lg items-center gap-4
                                            bg-white dark:bg-neutral-900
                                            border border-gray-200 dark:border-neutral-700
                                            text-gray-900 dark:text-neutral-100
                                        ">

                                            <div className="flex justify-between gap-5 w-full cursor-pointer">
                                                <div className="flex gap-2 font-medium items-center hover:text-cyan-400">
                                                    <GoPerson className="text-cyan-400 text-xl"/>
                                                    <p>Personal</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between gap-5 w-full cursor-pointer">
                                                <div className="flex gap-2 font-medium items-center hover:text-cyan-400">
                                                    <AiOutlineShop className="text-xl text-cyan-400"/>
                                                    <p>Veterinaria</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-300 dark:bg-neutral-700"/>

                                {/* CERRAR SESION */}
                                <div className="flex justify-between gap-5 w-full cursor-pointer group/logout">
                                    <div onClick={handleLogout} className="flex gap-2 font-medium items-center">
                                        <FaPowerOff className="transition-transform duration-200 text-cyan-400 rotate-90 group-hover/logout:rotate-0 w-5"/>
                                        <p className="group-hover/logout:text-cyan-400 transition-colors duration-200">
                                            Cerrar sesion
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    <div className="flex flex-col leading-3">
                        <p className="font-bold">
                            {user?.publicName}
                        </p>
                        <p className="
                            text-sm uppercase font-medium transition-colors duration-200
                            text-gray-500 dark:text-neutral-400
                            group-hover:text-cyan-400 dark:hover:text-cyan-300
                        ">
                            {user?.cargo}
                        </p>

                    </div>

                    <IoIosArrowDown
                        className={`text-2xl transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"}`}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
