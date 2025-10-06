import { Bell, Mail, UserRound } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between gap-2 w-full padding-container mt-6 mb-4">
            <h2 className="text-2xl">Welcome, Daniel</h2>
                <div className="flex items-center gap-2">
                    <Mail size={30} className="rounded-full border p-2" />|
                    <Bell size={30} className="rounded-full border p-2"/>|
                    <div className="flex items-center justify-between gap-1">
                        <UserRound size={30} className="rounded-full border p-2"/>
                        <p>Daniel J.</p>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar;