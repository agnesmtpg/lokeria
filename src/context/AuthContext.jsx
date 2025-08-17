import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(Cookies.get("token") || null);

    // Simpan token ke cookies saat login
    const login = (token) => {
        Cookies.set("token", token, { expires: 1 });
        setToken(token);
    };

    // Hapus token saat logout
    const logout = () => {
        Cookies.remove("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}
