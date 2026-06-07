import { useState } from "react";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const Settings = () => {
    const { user, login } = useAuth();
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setSaving(true);
        try {
            const body = { username, email };
            if (newPassword) {
                body.currentPassword = currentPassword;
                body.newPassword = newPassword;
            }
            const res = await api.put("/users/me", body);
            setMessage("Profile updated successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="pb-20 max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <SettingsIcon className="w-6 h-6 text-cyan-400" />
                    Settings
                </h1>
            </div>

            {message && (
                <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                    {message}
                </div>
            )}
            {error && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-6 space-y-4">
                    <h2 className="text-lg font-bold text-slate-200 mb-4">Profile</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                    </div>
                </div>

                <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-6 space-y-4">
                    <h2 className="text-lg font-bold text-slate-200 mb-4">Change Password</h2>
                    <p className="text-xs text-slate-500 mb-2">Leave blank to keep current password</p>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className={`btn rounded-full px-8 bg-cyan-600 hover:bg-cyan-500 text-white border-none font-bold ${saving ? 'loading' : ''}`}
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </form>
        </div>
    );
};

export default Settings;
