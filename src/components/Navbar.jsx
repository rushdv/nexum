import { useState, useEffect } from 'react';
import { Search, Bell, MessageSquare, LogOut } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        const fetchUnread = async () => {
            try {
                const res = await api.get("/notifications");
                setUnreadNotifications(res.data.filter(n => !n.is_read).length);
            } catch (_) {}
        };
        fetchUnread();
        const interval = setInterval(fetchUnread, 30000);
        return () => clearInterval(interval);
    }, [user]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="navbar bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 h-16 px-6 lg:px-12 flex items-center justify-between shadow-sm">
            <div className="flex-none w-64">
                <Link to="/" className="group flex items-center gap-1 cursor-pointer select-none">
                    <span className="text-2xl font-[800] tracking-tighter text-white group-hover:text-slate-100 transition-colors">
                        NEXUM
                    </span>
                    <span className="text-3xl text-cyan-500 leading-none group-hover:animate-pulse">.</span>
                </Link>
            </div>

            <div className="flex-1 max-w-lg hidden md:block">
                <form onSubmit={handleSearch} className="relative group">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 text-slate-200 placeholder-slate-500 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 border border-transparent focus:border-cyan-500/20"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </form>
            </div>

            <div className="flex-none w-64 flex justify-end items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1 mr-4 border-r border-white/5 pr-4">
                    <button className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all relative group">
                        <MessageSquare className="w-5 h-5 stroke-[1.5px]" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-2 ring-[#0f172a]"></span>
                    </button>

                    <Link to="/notifications" className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all relative group">
                        <Bell className="w-5 h-5 stroke-[1.5px]" />
                        {unreadNotifications > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-cyan-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center ring-2 ring-[#0f172a]">
                                {unreadNotifications > 9 ? '9+' : unreadNotifications}
                            </span>
                        )}
                    </Link>
                </div>

                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-9 h-9 rounded-full ring-2 ring-white/10 hover:ring-cyan-500/50 transition-all p-0.5">
                                <img
                                    alt={user.username}
                                    src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff`}
                                    className="rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-800 rounded-box w-52 border border-slate-700">
                            <li><Link to="/profile" className="text-slate-300 font-medium">Profile</Link></li>
                            <li><a onClick={logout} className="text-red-400 font-medium hover:text-red-300"><LogOut className="w-4 h-4" /> Logout</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

