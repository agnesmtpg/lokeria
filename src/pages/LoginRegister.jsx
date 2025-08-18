import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginRegister() {
    const location = useLocation();
    const navigate = useNavigate();
    const mode = location.pathname.includes("register") ? "register" : "login";
    const [showPassword, setShowPassword] = useState(false);

    const [input, setInput] = useState({
        name: "",
        image_url: "",
        email: "",
        password: "",
    });

    const BASE_URL = "https://lokeria.page.gd/api"; // endpoint InfinityFree

    const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === "login") {
                const res = await axios.post(`${BASE_URL}/login.php`, {
                    email: input.email,
                    password: input.password,
                });

                const userData = {
                    id: res.data.user.id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    image_url: res.data.user.image_url,
                };

                Cookies.set("token", res.data.token, { expires: 1 });
                localStorage.setItem("user", JSON.stringify(userData));

                navigate("/"); // langsung ke home
            } else {
                await axios.post(`${BASE_URL}/register.php`, {
                    name: input.name,
                    image_url: input.image_url,
                    email: input.email,
                    password: input.password,
                });

                Swal.fire({
                    icon: "success",
                    title: "Registrasi Berhasil",
                    text: "Akun Anda telah dibuat. Silakan login!",
                    confirmButtonColor: "#666455",
                }).then(() => navigate("/login"));
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: err.response?.data?.message || err.message,
                confirmButtonColor: "#d33",
            });
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div className="w-full min-h-screen bg-[#F1EFEF] flex flex-col md:flex-row overflow-hidden">
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/Cover_Auth.jpg')", minHeight: "100vh" }}
            ></div>

            <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white border border-black rounded-[15px] w-full max-w-md p-8 sm:p-10 shadow-lg"
                    >
                        <div className="flex justify-center mb-2">
                            <div className="text-5xl font-medium text-[#1E1E1E] flex items-center gap-2">
                                <img src="/Logo_B.svg" alt="Lokeria Logo" className="h-10 w-auto" />
                            </div>
                        </div>

                        <h2 className={`text-center font-semibold text-3xl ${mode === "login" ? "mt-6" : "mt-4"}`}>
                            {mode === "login" ? "Masuk ke akun Anda" : "Buat Akun Anda"}
                        </h2>

                        <form className="w-full flex justify-center mt-6" onSubmit={handleSubmit}>
                            <div className="w-full max-w-xs sm:max-w-sm">
                                {mode === "register" && (
                                    <>
                                        <div className="mt-3">
                                            <label className="block text-sm font-light mb-1">Nama</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={input.name}
                                                onChange={handleChange}
                                                placeholder="Nama"
                                                className="w-full border border-black rounded-[15px] px-4 py-3 placeholder-gray-400"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-sm font-light mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                name="image_url"
                                                value={input.image_url}
                                                onChange={handleChange}
                                                placeholder="Link Foto Profil"
                                                className="w-full border border-black rounded-[15px] px-4 py-3 placeholder-gray-400"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className={`${mode === "login" ? "mt-8" : "mt-3"}`}>
                                    <label className="block text-sm font-light mb-1">Masukkan email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full border border-black rounded-[15px] px-4 py-3 placeholder-gray-400"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-sm font-light mb-1">Masukkan kata sandi</label>
                                    <div className="flex items-center border border-black rounded-[15px] px-4 py-3">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={input.password}
                                            onChange={handleChange}
                                            placeholder="Kata Sandi"
                                            className="w-full outline-none placeholder-gray-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-600 text-xl"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                {mode === "login" && (
                                    <div className="flex justify-between items-center text-sm mt-3">
                                        <label className="flex items-center gap-2 text-gray-600">
                                            <input type="checkbox" className="border border-black" />
                                            Ingat saya?
                                        </label>
                                        <a href="#" className="font-semibold">Lupa Kata Sandi?</a>
                                    </div>
                                )}

                                {mode === "register" && (
                                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                                        <input type="checkbox" />
                                        <span>Saya menyetujui Syarat & Ketentuan yang berlaku.</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full h-[50px] bg-[#666455] text-white py-3 rounded-[15px] text-lg font-semibold block mx-auto mt-5 hover:bg-[#555345] transition"
                                >
                                    {mode === "login" ? "Masuk" : "Daftar"}
                                </button>

                                <p className="text-center text-sm mt-5">
                                    {mode === "login" ? (
                                        <>
                                            Belum ada akun?{" "}
                                            <Link to="/register" className="font-semibold underline">Buat Akun</Link>
                                        </>
                                    ) : (
                                        <>
                                            Sudah punya akun?{" "}
                                            <Link to="/login" className="font-semibold underline">Masuk</Link>
                                        </>
                                    )}
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
