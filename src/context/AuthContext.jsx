import { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Decode user from token or fetch profile
            // For now, let's assume valid and fetch basic info or set placeholder
            // In a real app, you'd call /api/auth/me
            api.get("/auth/me").then(res => {
                setUser(res.data);
            }).catch(() => {
                localStorage.removeItem("token");
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (username, email, password) => {
        const res = await api.post("/auth/register", { username, email, password });
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
