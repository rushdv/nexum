import { Home, Compass, Bell, Mail, Bookmark, User, Settings, PenTool, Hash } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: Home, label: 'Home', active: true },
        { icon: Compass, label: 'Explore' },
        { icon: Bell, label: 'Notifications' },
        { icon: Mail, label: 'Messages' },
        { icon: Bookmark, label: 'Bookmarks' },
        { icon: User, label: 'Profile' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* DESKTOP NAV: Right Side Vertical Icon Strip */}
            <aside className="hidden lg:flex flex-col w-20 h-[calc(100vh-3rem)] sticky top-6 items-center gap-8 z-50">
                {/* Brand Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4 cursor-pointer hover:scale-105 transition-transform">
                    {/* <span className="font-bold text-white text-xl">N</span> */}
                    <img src="./src/assets/nexum.png" alt="Nexum" className="rounded-lg w-full h-full object-cover" />
                </div>

                {/* Nav Icons */}
                <nav className="flex-1 flex flex-col gap-6">
                    {navItems.map((item, index) => (
                        <div key={index} className="group relative flex items-center justify-center">
                            <a className={`
                                w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 relative
                                ${item.active
                                    ? 'text-cyan-400 bg-slate-800 shadow-md shadow-black/20'
                                    : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50'
                                }
                            `}>
                                <item.icon className="w-6 h-6 stroke-[2px]" />

                                {item.active && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-500 rounded-l-full"></div>
                                )}
                            </a>

                            {/* Hover Label (Tooltip appearing on Left) */}
                            <div className="absolute right-full mr-4 px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/5">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Create Action */}
                <button className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-500 text-cyan-500 flex items-center justify-center transition-all hover:rotate-90 shadow-lg shadow-black/20">
                    <PenTool className="w-5 h-5" />
                </button>

                {/* Profile Mini */}
                <div className="w-10 h-10 rounded-full bg-slate-700 ring-2 ring-slate-800 hover:ring-cyan-500/50 transition-all cursor-pointer mt-auto">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
            </aside>

            {/* MOBILE NAV: Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f172a]/90 backdrop-blur-xl border-t border-slate-800 p-4 flex justify-between items-center z-50 safe-area-bottom">
                {navItems.slice(0, 5).map((item, index) => (
                    <a key={index} className={`flex flex-col items-center gap-1 ${item.active ? 'text-cyan-400' : 'text-slate-400'}`}>
                        <item.icon className={`w-6 h-6 ${item.active ? 'fill-cyan-500/10' : ''}`} />
                    </a>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
