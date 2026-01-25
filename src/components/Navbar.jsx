import { Search, Bell, MessageSquare, User } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 h-16 px-6 lg:px-12 flex items-center justify-between shadow-sm">

            {/* 1. THE ANCHOR (Left) - Brand */}
            {/* "NEXUM" in bold, tracking tight, with a premium cyan dot accent */}
            <div className="flex-none w-64">
                <a className="group flex items-center gap-1 cursor-pointer select-none">
                    <span className="text-2xl font-[800] tracking-tighter text-white group-hover:text-slate-100 transition-colors">
                        NEXUM
                    </span>
                    <span className="text-3xl text-cyan-500 leading-none group-hover:animate-pulse">.</span>
                </a>
            </div>

            {/* 2. THE BALANCE (Center) - Command / Search */}
            {/* Floats in the center to balance the layout. Glassy, rounded, minimal. */}
            <div className="flex-1 max-w-lg hidden md:block">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white/5 text-slate-200 placeholder-slate-500 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 border border-transparent focus:border-cyan-500/20"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
            </div>

            {/* 3. THE CONTROLS (Right) - Actions */}
            {/* Minimalist Icon Dock. No clutter. */}
            <div className="flex-none w-64 flex justify-end items-center gap-1 sm:gap-2">

                {/* Icons Grid */}
                <div className="flex items-center gap-1 mr-4 border-r border-white/5 pr-4">
                    <button className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all relative group">
                        <MessageSquare className="w-5 h-5 stroke-[1.5px]" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-2 ring-[#0f172a]"></span>
                    </button>

                    <button className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all relative group">
                        <Bell className="w-5 h-5 stroke-[1.5px]" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full ring-2 ring-[#0f172a]"></span>
                    </button>
                </div>

                {/* Profile */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-9 h-9 rounded-full ring-2 ring-white/10 hover:ring-cyan-500/50 transition-all p-0.5">
                            <img alt="User" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="rounded-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
