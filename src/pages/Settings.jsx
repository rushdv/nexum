import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <SettingsIcon className="w-6 h-6 text-cyan-400" />
                    Settings
                </h1>
            </div>
            <div className="space-y-6">
                <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-6">
                    <h2 className="text-lg font-bold text-slate-200 mb-4">Account</h2>
                    <p className="text-slate-400 text-sm">Account settings coming soon</p>
                </div>
                <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-6">
                    <h2 className="text-lg font-bold text-slate-200 mb-4">Appearance</h2>
                    <p className="text-slate-400 text-sm">Theme preferences coming soon</p>
                </div>
                <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-6">
                    <h2 className="text-lg font-bold text-slate-200 mb-4">Notifications</h2>
                    <p className="text-slate-400 text-sm">Notification preferences coming soon</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
