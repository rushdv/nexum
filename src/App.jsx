import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-cyan-500">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
