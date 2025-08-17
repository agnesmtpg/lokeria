import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
        navigate("/login");
        } else {
        setUser(storedUser);
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow p-8 max-w-xl w-full">
            <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Foto Profil */}
            <div className="flex-shrink-0">
                <img
                src={user.image_url}
                alt={user.name}
                className="w-48 h-48 sm:w-80 sm:h-80 rounded-full object-cover border-2 border-gray-300"
                />
            </div>

            {/* Nama & Email */}
            <div className="text-center sm:text-left">
                <h2 className="text-3xl sm:text-5xl font-bold mb-2">{user.name}</h2>
                <p className="text-lg text-gray-600">{user.email}</p>
            </div>
            </div>
        </div>
        </div>
    );
}
