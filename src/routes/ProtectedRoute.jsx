// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginRoute = ({ children }) => {
    if (Cookies.get("token") !== undefined) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export const PrivateRoute = ({ children }) => {
    if (Cookies.get("token") === undefined) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
