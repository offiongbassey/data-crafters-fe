import ToolTip from "@/components/Tooltip";
import { Bell, Mail, Menu, UserRound } from "lucide-react";

type Props = {
    toggle: boolean;
    setToggle: () => void;
}

const Navbar = ({ toggle, setToggle }: Props) => {
    return (
        <nav className="flex items-center justify-between md:justify-end gap-2 w-full padding-container mt-6 mb-4">
            <Menu className="block md:hidden" onClick={setToggle}/>
                <div className="flex items-center gap-2">
                    <ToolTip message="Messages"><Mail size={30} className="rounded-full border p-2" /></ToolTip>|
                    <ToolTip message="Notifications"><Bell size={30} className="rounded-full border p-2"/></ToolTip>|
                    <div className="flex items-center justify-between gap-1">
                        <ToolTip message="Profile"><UserRound size={30} className="rounded-full border p-2"/></ToolTip>
                        <p>Daniel J.</p>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar;