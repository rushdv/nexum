import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await register(username, email, password);
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 text-slate-200">
            <div className="w-full max-w-md bg-[#1e293b]/50 border border-slate-700 p-8 rounded-[32px] backdrop-blur-xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Join Nexum</h2>
                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-slate-700/50"></div>
                    <span className="text-xs text-slate-500 font-medium">OR</span>
                    <div className="h-[1px] flex-1 bg-slate-700/50"></div>
                </div>

                <p className="text-center text-sm text-slate-500">Google sign-up coming soon</p>

                <p className="text-center mt-6 text-slate-400">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
