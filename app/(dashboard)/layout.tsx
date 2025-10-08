"use client";

import { useState } from "react";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar/Sidebar";

type Props = {
    children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className="flex bg-gray-100">
            <Sidebar toggle={toggle} setToggle={(() => setToggle((prev) => !prev))}/>
            <div className="w-full overflow-y-scroll">
                <Navbar toggle={toggle} setToggle={(() => setToggle((prev) => !prev))}/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;