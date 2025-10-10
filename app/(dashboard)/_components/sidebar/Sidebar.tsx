"use client";

import { useAuthStore } from "@/store/auth";
import { BookCheck, LayoutDashboard, ListCheck, ListTodo, LogOut, Menu, Mic, Settings, TrendingUpDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        link: "/"
    },
    {
        title: "Lesson",
        icon: BookCheck,
        link: "/lessons"
    },
    // {
    //     title: "Assessment",
    //     icon: ListCheck,
    //     link: "/assessments"
    // },
    {
        title: "Task",
        icon: ListTodo,
        link: "/tasks"
    },
    {
        title: "Voice Assistant",
        icon: Mic,
        link: "/voice"
    },
]

type Props = {
    toggle: boolean; 
    setToggle: () => void;
}

const Sidebar = ({ toggle, setToggle }: Props) => {
    const pathName = usePathname();
    const logout = useAuthStore((state) => state.logout)

    return (
        <div  className={`px-10 py-6 bg-white ${toggle ? "flex": "hidden md:flex"} flex-col justify-between h-screen min-w-62 fixed md:static`}>
            <div className="flex flex-col justify-between gap-14">
                <div className="flex gap-4 items-center">
                    <Link href={"/"}><h1 className="flex gap-1 font-semibold text-base md:text-2xl"><TrendingUpDown size={20} />EduAI</h1></Link>
                    <X className="block md:hidden" onClick={setToggle}/>
                </div>
                
                <ul className="flex flex-col gap-8">
                {LINKS.map((item, key) => {
                    const Icon = item.icon
                    return (
                        <li onClick={setToggle} key={key}><Link href={item.link} className={`flex gap-2 items-center ${pathName === item.link && "text-purple-600 font-semibold"}`}><Icon size={18} />{item.title}</Link></li>
                    )
                })}
                </ul>
                
            </div>
            <ul className="flex flex-col gap-6">
                <li onClick={setToggle} className="flex cursor-pointer gap-2 items-center"><Settings /> Settings</li>
                <li  onClick={() => logout()} className="flex gap-2 cursor-pointer items-center"><LogOut /> Logout</li>
            </ul>
        </div>
    )
}

export default Sidebar;