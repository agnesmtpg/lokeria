import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    const BASE_URL = "https://lokeria.page.gd/api"; // endpoint API InfinityFree

    useEffect(() => {
        axios
            .get(`${BASE_URL}/get_jobs.php`) // Ambil semua jobs
            .then((res) => {
                // Filter berdasarkan id
                const data = res.data.find((j) => parseInt(j.id) === parseInt(id));
                setJob(data || null);
            })
            .catch((err) => console.error("Gagal ambil data job:", err));
    }, [id]);

    if (!job) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6 sm:p-10 bg-gray-100 min-h-screen flex justify-center items-start">
            <div className="w-full max-w-6xl">
                {/* Tombol Kembali */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-lg mb-6 text-gray-700 hover:text-gray-900 transition"
                >
                    <span className="mr-2 text-xl sm:text-2xl">←</span> Kembali
                </button>

                {/* Kontainer utama */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col md:flex-row gap-6 md:gap-12">
                    {/* Logo Perusahaan */}
                    <div className="w-full md:w-1/3 flex justify-center items-center">
                        <img
                            src={job.company_image_url}
                            alt={job.company_name}
                            className="w-full max-w-[400px] rounded-xl border shadow object-contain"
                        />
                    </div>

                    {/* Info Pekerjaan */}
                    <div className="w-full md:w-2/3">
                        <h1 className="text-2xl sm:text-4xl font-extrabold mb-3">{job.title}</h1>
                        <p className="text-lg sm:text-2xl text-gray-700 mb-2">
                            {job.company_name}{" "}
                            <span className="text-sm sm:text-lg text-gray-500">({job.job_type})</span>
                        </p>
                        <p className="mt-3 text-base sm:text-xl">
                            <strong>Status:</strong>{" "}
                            {parseInt(job.job_status) === 1 ? (
                                <span className="font-bold text-green-600">Open Hiring</span>
                            ) : (
                                "Closed"
                            )}
                        </p>
                        <p className="text-base sm:text-xl">
                            <strong>Kota:</strong> {job.company_city}
                        </p>
                        <p className="mt-5 text-sm sm:text-lg leading-relaxed">
                            <strong>Deskripsi:</strong> {job.job_description}
                        </p>
                        <p className="mt-5 text-sm sm:text-lg leading-relaxed">
                            <strong>Kualifikasi:</strong> {job.job_qualification}
                        </p>
                        <p className="mt-5 text-lg sm:text-xl font-semibold">
                            <strong>Gaji:</strong> Rp{parseInt(job.salary_min).toLocaleString()} – Rp{parseInt(job.salary_max).toLocaleString()} / bulan
                        </p>

                        {/* Tombol Apply */}
                        <button
                            onClick={() => navigate("/vacancy")}
                            className="mt-8 w-full md:w-auto px-6 py-3 bg-[#666455] text-white rounded-xl text-lg sm:text-xl font-semibold hover:opacity-90 transition"
                        >
                            Apply Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
