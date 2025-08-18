import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const BASE_URL = "https://lokeria.page.gd/api"; 

export default function AddNewJob() {
    const { id: editId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        job_description: "",
        job_qualification: "",
        job_type: "",
        job_tenure: "",
        job_status: 1,
        company_name: "",
        company_image_url: "",
        company_city: "",
        salary_min: 0,
        salary_max: 0
    });

    // Ambil data kalau mode edit
    useEffect(() => {
        if (editId) {
            axios.get(`${BASE_URL}/get_job.php?id=${editId}`)
                .then(res => {
                    const d = res.data;
                    setForm({
                        title: d.title || "",
                        job_description: d.job_description || "",
                        job_qualification: d.job_qualification || "",
                        job_type: d.job_type || "",
                        job_tenure: d.job_tenure || "",
                        job_status: d.job_status ?? 1,
                        company_name: d.company_name || "",
                        company_image_url: d.company_image_url || "",
                        company_city: d.company_city || "",
                        salary_min: d.salary_min || 0,
                        salary_max: d.salary_max || 0
                    });
                })
                .catch(err => console.error(err));
        }
    }, [editId]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (["salary_min", "salary_max", "job_status"].includes(name)) {
            newValue = parseInt(value) || 0;
        }

        setForm({ ...form, [name]: newValue });
    };

    // Submit data
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const token = Cookies.get("token");
        if (!token) {
            Swal.fire("Error", "Token tidak ditemukan, silakan login dulu.", "error");
            return;
        }

        const url = editId
            ? `${BASE_URL}/update_job.php?id=${editId}`
            : `${BASE_URL}/add_job.php`;
        const method = editId ? "put" : "post";

        axios[method](url, form, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            Swal.fire("Berhasil!", `Data berhasil ${editId ? "diupdate" : "ditambahkan"}.`, "success");
            navigate("/dashboard/list");
        })
        .catch((err) => Swal.fire("Error", err.response?.data?.message || "Terjadi kesalahan", "error"));
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{editId ? "Edit Data" : "Tambah Data Baru"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                <label className="block text-lg font-medium mb-2">Lowongan</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Deskripsi</label>
                <textarea
                    name="job_description"
                    value={form.job_description}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Kualifikasi</label>
                <textarea
                    name="job_qualification"
                    value={form.job_qualification}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Type</label>
                <input
                    type="text"
                    name="job_type"
                    value={form.job_type}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="Contoh: Onsite/Remote/Hybrid"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Tenure</label>
                <input
                    type="text"
                    name="job_tenure"
                    value={form.job_tenure}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    placeholder="Contoh: Full Time/Contract"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Status</label>
                <select
                    name="job_status"
                    value={form.job_status}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                >
                    <option value={1}>Open</option>
                    <option value={0}>Closed</option>
                </select>
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Perusahaan</label>
                <input
                    type="text"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Logo</label>
                <input
                    type="url"
                    name="company_image_url"
                    value={form.company_image_url}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Kota</label>
                <input
                    type="text"
                    name="company_city"
                    value={form.company_city}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Min Gaji</label>
                <input
                    type="number"
                    name="salary_min"
                    value={form.salary_min}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
                <div>
                <label className="block text-lg font-medium mb-2">Max Gaji</label>
                <input
                    type="number"
                    name="salary_max"
                    value={form.salary_max}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mt-4">
                <button
                type="submit"
                className="bg-[#666455] text-white px-6 py-3 rounded hover:bg-[#4d4c39]"
                >
                {editId ? "Update" : "Submit"}
                </button>
                <button
                type="button"
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-700"
                onClick={() => navigate("/dashboard/list")}
                >
                Kembali
                </button>
            </div>
            </form>
        </div>
        );
}
