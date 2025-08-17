import { FaChartPie, FaList, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#666455",
        confirmButtonText: "Ya, Keluar",
        cancelButtonText: "Batal",
        }).then((result) => {
        if (result.isConfirmed) {
            Cookies.remove("token");
            localStorage.removeItem("user");
            navigate("/");
            window.location.reload(); // update Navbar
        }
        });
    };

    const menuItems = [
        { key: "/dashboard", label: "Dashboard", icon: <FaChartPie /> },
        { key: "/dashboard/list", label: "List Job Table", icon: <FaList /> },
        { key: "/dashboard/add", label: "Add New Job", icon: <FaPlus /> },
        { key: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
    ];

    return (
        <>
        {/* Backdrop overlay untuk mobile saat sidebar terbuka */}
        <div
            className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar utama */}
        <aside
            className={`fixed top-0 left-0 h-full bg-[#666455] text-white w-[250px] p-6 z-50 transform transition-transform
            md:relative md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            <img
            src="/Logo_W.svg"
            alt="Logo"
            className="mx-auto w-auto h-auto mb-10 cursor-pointer"
            onClick={() => {
                navigate("/");
                setSidebarOpen(false);
            }}
            />
            {menuItems.map((item) => (
            <button
                key={item.key}
                onClick={() => {
                navigate(item.key);
                setSidebarOpen(false);
                }}
                className="flex items-center gap-4 text-2xl mb-6 hover:text-gray-300 w-full text-left"
            >
                {item.icon} {item.label}
            </button>
            ))}
            <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-2xl hover:text-gray-300 mt-auto"
            >
            <FaSignOutAlt /> Logout
            </button>
        </aside>
        </>
    );
}
