import { BookCheck, Icon, LayoutDashboard, ListCheck, ListTodo, LogOut, Settings, TrendingUpDown } from "lucide-react";
import Link from "next/link";

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
    {
        title: "Assessment",
        icon: ListCheck,
        link: "/assessments"
    },
    {
        title: "Task",
        icon: ListTodo,
        link: "/tasks"
    },
]

const Sidebar = () => {
    return (
        <div className="px-10 py-6 bg-white flex flex-col justify-between h-screen min-w-62">
            <div className="flex flex-col justify-between gap-14">
                <Link href={"/"}><h1 className="flex gap-1 font-semibold text-xl"><TrendingUpDown size={20} />Data Crafters</h1></Link>
                
                <ul className="flex flex-col gap-8">
                {LINKS.map((item, key) => {
                    const Icon = item.icon
                    return (
                        <li key={key}><Link href={item.link} className="flex gap-2 items-center"><Icon size={18} />{item.title}</Link></li>
                    )
                })}
                </ul>
                
            </div>
            <ul className="flex flex-col gap-6">
                <li className="flex gap-2 items-center"><Settings /> Settings</li>
                <li className="flex gap-2 items-center"><LogOut /> Logout</li>
            </ul>
        </div>
    )
}

export default Sidebar;