import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) {
        Swal.fire({
            icon: "warning",
            title: "Email kosong",
            text: "Silakan masukkan email terlebih dahulu.",
        });
        return;
        }
        // Contoh kondisi kalau email sudah terdaftar
        Swal.fire({
        icon: "success",
        title: "Email sudah terdaftar",
        text: "Gunakan email lain atau cek kotak masuk Anda.",
        });
    };

    return (
        <footer className="bg-white mt-12">
        <div className="container mx-auto flex flex-col items-center py-16 px-6">
            {/* Logo + tagline */}
            <div className="text-center mb-6 relative">
            <img
                src="/Logo_B.svg"
                alt="Lokeria Logo"
                className="mx-auto w-48 max-w-full h-auto py-2"
            />
            <p className="mt-2 text-base italic font-medium text-black max-w-xs mx-auto">
                “Menghubungkan pencari kerja dengan peluang terbaik."
            </p>
            </div>

            {/* Newsletter */}
            <div className="text-center max-w-xl mb-8 w-full">
            <h3 className="text-2xl font-semibold mb-2">Berlangganan Newsletter</h3>
            <p className="text-sm text-black mb-4 px-4 sm:px-0">
                Dapatkan informasi lowongan kerja terbaru dan tips karier langsung di email Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 px-4 sm:px-0">
                {/* Input Frame */}
                <div className="flex items-center border border-black rounded-[15px] px-3 h-[45px] w-full sm:w-[300px]">
                <MdOutlineMail className="w-[25px] h-[25px] text-black opacity-80 mr-2" />
                <input
                    type="email"
                    placeholder="Masukkan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-[16px] font-normal placeholder-black/25 focus:outline-none"
                />
                </div>

                {/* Button Frame */}
                <button
                onClick={handleSubscribe}
                className="flex justify-center items-center w-full sm:w-[80px] h-[45px] bg-[#666455] rounded-[15px] text-white font-semibold text-[16px] hover:bg-[#4d4c39]"
                >
                Daftar
                </button>
            </div>
            <p className="text-[10px] text-black mt-2 px-4 sm:px-0 max-w-xs mx-auto">
                Privasi Anda adalah prioritas kami, silakan baca Kebijakan Privasi Data kami.
            </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-6 mb-8">
            <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-black"
                aria-label="Facebook"
            >
                <FaFacebookF className="w-6 h-6" />
            </a>
            <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-black"
                aria-label="Instagram"
            >
                <FaInstagram className="w-6 h-6" />
            </a>
            <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-black"
                aria-label="LinkedIn"
            >
                <FaLinkedinIn className="w-6 h-6" />
            </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-black text-center">
            © 2025 Lokeria. All rights reserved. By Agnes Katrin
            </p>
        </div>
        </footer>
    );
}
