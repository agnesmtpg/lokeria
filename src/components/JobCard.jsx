import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="border border-[#666455] rounded-2xl flex gap-4 p-6 bg-transparent cursor-pointer hover:bg-[#666455] transition duration-300 group w-full max-w-[500px] mx-auto"
        >
            {/* Logo Perusahaan */}
            <div className="w-[120px] h-[120px] flex items-center justify-center bg-white rounded-xl border">
                <img
                    src={job.company_image_url}
                    alt={job.company_name}
                    className="max-w-[100px] max-h-[80px] object-contain"
                />
            </div>

            {/* Info Pekerjaan */}
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-black group-hover:text-white">
                        {job.title}
                    </h2>
                    <p className="text-lg text-black group-hover:text-white">
                        {job.company_name}
                    </p>
                    <p className="text-gray-500 text-sm group-hover:text-gray-200">
                        {job.company_city}, {job.job_type}
                    </p>
                </div>
                <div className="mt-2">
                    <p className="text-gray-700 text-xs group-hover:text-gray-200">
                        Gaji: Rp{job.salary_min.toLocaleString()} - Rp{job.salary_max.toLocaleString()}
                    </p>
                    <p
                        className={`text-xs font-semibold ${
                            job.job_status === 1
                                ? "text-green-600 group-hover:text-green-300"
                                : "text-red-500 group-hover:text-red-300"
                        }`}
                    >
                        {job.job_status === 1 ? "Dibuka" : "Ditutup"}
                    </p>
                </div>
            </div>
        </div>
    );
}
