import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [token, setToken] = useState(Cookies.get('token'))
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    // Biar kalau pindah halaman, menu tetap di posisi terakhir (open/tutup)
    useEffect(() => {
        // Bisa tambahkan efek jika mau auto-close pas pindah halaman
        // setMenuOpen(false) // kalau mau auto-close pas pindah halaman, aktifkan ini
    }, [location])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShow(false)
            } else {
                setShow(true)
            }
            setLastScrollY(window.scrollY)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const handleLogout = () => {
        Cookies.remove('token')
        localStorage.removeItem('user')
        setToken(null)
        setMenuOpen(false)  // logout tetap menutup menu
        navigate('/')
    }

    return (
        <header className={`h-16 w-full fixed py-2 px-2 top-0 left-0 z-50 bg-white shadow transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="container mx-auto flex items-center justify-between h-full px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo_B.svg" alt="Lokeria Logo" className="h-5 w-auto" />
                </Link>

                {/* Menu Desktop */}
                <nav className="hidden md:flex gap-8 text-lg">
                    <Link to="/" className="hover:text-[#666455]">Home</Link>
                    <Link to="/Vacancy" className="hover:text-[#666455]">Lowongan</Link>
                </nav>

                {/* Login / Logout Desktop */}
                <div className="hidden md:flex items-center">
                    {!token ? (
                        <Link
                            to="/login"
                            className="bg-[#666455] text-white px-8 py-2 rounded-[10px] text-base hover:bg-[#4d4c39] transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-5 py-2 rounded-[10px] text-base hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* Hamburger Icon (Mobile) */}
                <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu with Slide Transition */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 z-40 transform transition-all duration-500 ease-in-out
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
            >
                <Link to="/" className="text-lg hover:text-[#666455]">Home</Link>
                <Link to="/Vacancy" className="text-lg hover:text-[#666455]">Lowongan</Link>
                {!token ? (
                    <Link
                        to="/login"
                        className="bg-[#666455] text-white px-6 py-2 rounded-[10px] text-base text-center hover:bg-[#4d4c39] transition"
                    >
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-[10px] text-base hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    )
}
