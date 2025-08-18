import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaSearch } from "react-icons/fa";

export default function Vaccancy() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [titles, setTitles] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const BASE_URL = "https://lokeria.page.gd/api"; // endpoint InfinityFree

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/jobs.php`) // ganti ke PHP API
            .then((res) => {
                setJobs(res.data);
                setFilteredJobs(res.data);
                setTitles([...new Set(res.data.map((job) => job.title))]);
                setCompanies([...new Set(res.data.map((job) => job.company_name))]);
                setCities([...new Set(res.data.map((job) => job.company_city))]);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = () => {
        let filtered = jobs;
        if (search.trim() !== "") {
            filtered = filtered.filter((job) =>
                job.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredJobs(filtered);
    };

    const handleReset = () => {
        setSearch("");
        setSelectedTitle("");
        setSelectedCompany("");
        setSelectedCity("");
        setFilteredJobs(jobs);
    };

    const handleFilter = () => {
        let filtered = jobs;
        if (selectedTitle) filtered = filtered.filter((job) => job.title === selectedTitle);
        if (selectedCompany) filtered = filtered.filter((job) => job.company_name === selectedCompany);
        if (selectedCity) filtered = filtered.filter((job) => job.company_city === selectedCity);
        setFilteredJobs(filtered);
    };

    return (
        <div className="bg-[#F1EFEF] min-h-screen py-8 sm:py-10">
            {/* Banner */}
            <div className="bg-[#666455] w-full h-[200px] sm:h-[250px] py-6 sm:py-10 px-4 sm:px-10 text-center text-white mb-8 sm:mb-10 flex flex-col justify-center items-center">
                <h1 className="text-2xl sm:text-4xl font-extrabold mb-3">Temukan Pekerjaan Terbaikmu.</h1>
                <p className="text-base sm:text-xl italic max-w-3xl">
                    Jelajahi ribuan lowongan dari perusahaan terkemuka dan mulai langkah baru untuk karier impianmu bersama Lokeria.
                </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 px-4">
                <div className="relative w-full sm:w-[450px] lg:w-[650px]">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari Lowongan..."
                        className="w-full border rounded-xl pl-12 pr-5 py-2 sm:py-3 text-base sm:text-lg"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleSearch}
                        className="bg-[#666455] text-white flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold"
                    >
                        Cari
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-[#666455] text-white flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-between items-start lg:items-center mb-8 sm:mb-10 px-4 sm:px-8 lg:px-16">
                <p className="text-xl sm:text-2xl font-medium">Pencarian Lanjutan</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-auto">
                    {/* Posisi */}
                    <div className="relative">
                        <select
                            value={selectedTitle}
                            onChange={(e) => setSelectedTitle(e.target.value)}
                            className="w-full lg:w-[220px] bg-[#CCC8AA] px-4 py-2 sm:py-3 rounded-xl text-base sm:text-lg cursor-pointer appearance-none"
                        >
                            <option value="">Pilih Posisi</option>
                            {titles.map((title, idx) => (
                                <option key={idx} value={title}>{title}</option>
                            ))}
                        </select>
                        <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {/* Perusahaan */}
                    <div className="relative">
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="w-full lg:w-[220px] bg-[#CCC8AA] px-4 py-2 sm:py-3 rounded-xl text-base sm:text-lg cursor-pointer appearance-none"
                        >
                            <option value="">Pilih Perusahaan</option>
                            {companies.map((company, idx) => (
                                <option key={idx} value={company}>{company}</option>
                            ))}
                        </select>
                        <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {/* Lokasi */}
                    <div className="relative">
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full lg:w-[220px] bg-[#CCC8AA] px-4 py-2 sm:py-3 rounded-xl text-base sm:text-lg cursor-pointer appearance-none"
                        >
                            <option value="">Pilih Lokasi</option>
                            {cities.map((city, idx) => (
                                <option key={idx} value={city}>{city}</option>
                            ))}
                        </select>
                        <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
                <button
                    onClick={handleFilter}
                    className="bg-[#666455] text-white w-full lg:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-base sm:text-lg font-semibold"
                >
                    Filter
                </button>
            </div>

            {/* Job List */}
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-16 transition-opacity duration-700 ${
                    loading ? "opacity-0" : "opacity-100"
                }`}
            >
                {loading ? (
                    <p className="text-center col-span-full text-gray-600">Memuat data...</p>
                ) : filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-600">Tidak ada lowongan ditemukan.</p>
                )}
            </div>
        </div>
    );
}
