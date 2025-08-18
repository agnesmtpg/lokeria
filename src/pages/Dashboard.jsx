import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const token = Cookies.get("token");
    const BASE_URL = "https://lokeria.page.gd/api"; // endpoint API InfinityFree

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/get_jobs.php`, {
                headers: { Authorization: "Bearer " + token },
            });
            setJobs(res.data);
        } catch (err) {
            console.error("Gagal ambil data:", err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar untuk desktop dan mobile toggle */}
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Konten utama */}
            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {/* Tombol toggle sidebar untuk mobile */}
                <button
                    className="md:hidden mb-4 px-3 py-2 bg-[#666455] text-white rounded-md"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle menu"
                >
                    {sidebarOpen ? "Close Menu" : "Open Menu"}
                </button>

                {/* Outlet untuk render sub-routes (List Jobs, Add/Edit Job) */}
                <Outlet context={{ jobs, fetchJobs }} />
            </div>
        </div>
    );
}
