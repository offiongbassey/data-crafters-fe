import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar/Sidebar";

type Props = {
    children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <div className="w-full">
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;