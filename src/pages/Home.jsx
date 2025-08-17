import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaLaptop, FaPalette, FaMoneyBill, FaUsers, FaHospital, FaBook } from "react-icons/fa";

export default function Home() {
    const token = Cookies.get("token");

    const categories = [
        { title: "Teknologi & IT", desc: "Bangun masa depan di dunia digital dan teknologi.", icon: <FaLaptop /> },
        { title: "Marketing & Creative", desc: "Ciptakan strategi dan ide kreatif untuk brand.", icon: <FaPalette /> },
        { title: "Finance & Accounting", desc: "Kelola keuangan dan buat keputusan bisnis yang tepat.", icon: <FaMoneyBill /> },
        { title: "Human Resources", desc: "Bangun tim dan budaya kerja yang kuat.", icon: <FaUsers /> },
        { title: "Healthcare & Medical", desc: "Berkarier di bidang kesehatan dan pelayanan publik.", icon: <FaHospital /> },
        { title: "Education & Training", desc: "Berikan dampak melalui dunia pendidikan.", icon: <FaBook /> },
    ];

    // Hook animasi scroll
    function useScrollFadeIn() {
        const [visible, setVisible] = useState(false);
        const ref = useRef(null);

        useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
        }, []);

        return [ref, visible];
    }

    const [refMotivation, visibleMotivation] = useScrollFadeIn();
    const [refCategories, visibleCategories] = useScrollFadeIn();
    const [refPartners, visiblePartners] = useScrollFadeIn();

    return (
        <div className="bg-[#f5f3f2] px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* HERO SECTION */}
        <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Temukan Pekerjaan Impian Anda di{" "}
                <img
                src="/Logo_B.svg"
                alt="Lokeria Logo"
                className="h-[40px] sm:h-[50px] md:h-[60px] w-auto inline-block align-middle"
                />
            </h1>
            <p className="text-gray-600 italic mb-6 text-base sm:text-lg">
                "Lokeria membantu Anda terhubung dengan ribuan perusahaan di seluruh Indonesia. Cari lowongan sesuai minat, keahlian, dan lokasi Anda cepat, mudah, dan terpercaya."
            </p>
            <div className="flex gap-4 flex-wrap">
                <Link
                to="/vacancy"
                className="bg-[#4d4c39] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#3e3d2f] text-center text-base sm:text-lg"
                >
                Cari Lowongan
                </Link>
                {token && (
                <Link
                    to="/dashboard"
                    className="bg-[#c1bca1] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#a8a286] text-center text-base sm:text-lg"
                >
                    Dashboard
                </Link>
                )}
            </div>
            </div>

            <div className="flex justify-center">
            <img
                src="/Hero_Image.jpg"
                alt="Hero"
                className="rounded-lg w-full max-w-[500px] h-auto object-cover"
            />
            </div>
        </section>

        {/* MOTIVASI SECTION */}
        <section
            ref={refMotivation}
            className={`container mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center transition-all duration-700 ease-out
            ${visibleMotivation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <img
                src="/Section_2.jpg"
                alt="Team Left"
                className="rounded-lg object-cover h-[250px] sm:h-[400px] md:h-[500px] w-full object-left"
            />
            <img
                src="/Section_2.jpg"
                alt="Team Right"
                className="rounded-lg object-cover h-[250px] sm:h-[400px] md:h-[500px] w-full object-right"
            />
            </div>
            <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Temukan Minatmu dan Raih Kesuksesan</h2>
            <p className="text-gray-600 italic text-base sm:text-lg">
                "Temukan pekerjaan yang sesuai dengan minat dan bakat Anda. Gaji tinggi bukanlah segalanya yang terpenting, Anda dapat bekerja sesuai passion dan tetap memiliki keseimbangan hidup yang sehat."
            </p>
            </div>
        </section>

        {/* KATEGORI SECTION */}
        <section
            ref={refCategories}
            className={`container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center transition-all duration-700 ease-out
            ${visibleCategories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Jelajahi Berdasarkan Kategori</h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Cari pekerjaan sesuai bidang yang sesuai dengan minat dan keahlian Anda.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {categories.map((cat, idx) => (
                <div
                key={idx}
                className="group border-2 rounded-lg p-4 sm:p-6 bg-transparent hover:bg-[#4d4c39] transition grid grid-cols-[auto_1fr] items-center gap-4 min-h-[120px] sm:min-h-[140px]"
                >
                <div className="text-4xl sm:text-5xl text-[#4d4c39] group-hover:text-white transition flex-shrink-0">
                    {cat.icon}
                </div>
                <div className="text-left">
                    <h3 className="font-semibold text-base sm:text-lg text-black group-hover:text-white transition">
                    {cat.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm group-hover:text-white transition">
                    {cat.desc}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* PARTNER SECTION */}
        <section
            ref={refPartners}
            className={`container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center transition-all duration-700 ease-out
            ${visiblePartners ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Perusahaan yang Bekerja Sama dengan Lokeria</h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Kami berkolaborasi dengan berbagai perusahaan terkemuka di Indonesia untuk menghadirkan peluang karier terbaik bagi Anda.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-16 items-center py-5">
            {[
                "https://cdn.brandfetch.io/idPzHtHc1B/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1748289505184",
                "https://cdn.brandfetch.io/idOMfK-vnp/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1723013767663",
                "https://cdn.brandfetch.io/idCtRStnaP/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668076451152",
                "https://cdn.brandfetch.io/idoruRsDhk/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667561320464",
                "https://cdn.brandfetch.io/idbQOkNjfB/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667564421858",
                "https://cdn.brandfetch.io/idN9w9iZUZ/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1701100242437",
                "https://cdn.brandfetch.io/idnKhZr9W6/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1679040642343",
                "https://cdn.brandfetch.io/idXdZiXMOz/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1748278957185",
            ].map((logo, idx) => (
                <img key={idx} src={logo} alt="Partner" className="h-8 sm:h-12 mx-auto" />
            ))}
            </div>
        </section>
        </div>
    );
}
