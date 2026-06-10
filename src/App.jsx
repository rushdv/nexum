import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-cyan-500">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <>
        <Toaster position="top-right" toastOptions={{
            style: {
                background: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '12px',
                fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22d3ee', secondary: '#1e293b' } },
            error: { iconTheme: { primary: '#f87171', secondary: '#1e293b' } },
        }} />
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
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile/:id"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/explore"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Explore />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/messages"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Messages />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/bookmarks"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Bookmarks />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Settings />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Notifications />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </>
    );
}

export default App;
