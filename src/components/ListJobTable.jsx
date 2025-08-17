import { useNavigate, useOutletContext } from "react-router-dom";

export default function ListJobTable({ onDelete }) {
    const navigate = useNavigate();
    const { jobs, fetchJobs } = useOutletContext();

    return (
        <div>
        <h2 className="text-3xl font-bold mb-6">List Job Table</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full min-w-[900px] border text-sm">
            <thead className="bg-gray-200">
                <tr>
                <th>No</th>
                <th>Lowongan</th>
                <th>Deskripsi</th>
                <th>Kualifikasi</th>
                <th>Type</th>
                <th>Tenure</th>
                <th>Status</th>
                <th>Perusahaan</th>
                <th>Logo</th>
                <th>Kota</th>
                <th>Gaji</th>
                <th className="w-32">Action</th>
                </tr>
            </thead>
            <tbody>
                {jobs.length > 0 ? (
                jobs.map((job, index) => (
                    <tr key={job._id} className="border-b">
                    <td>{index + 1}</td>
                    <td>{job.title}</td>
                    <td>{job.job_description}</td>
                    <td>{job.job_qualification}</td>
                    <td>{job.job_type}</td>
                    <td>{job.job_tenure}</td>
                    <td className={job.job_status === 1 ? "text-green-600" : "text-red-600"}>
                        {job.job_status === 1 ? "Open" : "Closed"}
                    </td>
                    <td>{job.company_name}</td>
                    <td>
                        <img src={job.company_image_url} alt="" className="w-16 h-16 object-contain" />
                    </td>
                    <td>{job.company_city}</td>
                    <td>
                        Rp{job.salary_min.toLocaleString()} - Rp{job.salary_max.toLocaleString()}
                    </td>
                    <td className="space-x-2 flex">
                        <button
                        onClick={() => navigate(`/dashboard/edit/${job._id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => onDelete(job._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={12} className="text-center py-6">
                    Belum ada data lowongan.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
}
