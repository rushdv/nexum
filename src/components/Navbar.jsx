import { Search, Bell, MessageSquare } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200 px-4">
            <div className="flex-1">
                <a className="btn btn-ghost text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Nexum
                </a>
            </div>

            <div className="flex-none gap-4">
                {/* Search Bar - Hidden on mobile */}
                <div className="form-control hidden sm:block">
                    <label className="input input-bordered flex items-center gap-2 h-10 rounded-full bg-base-200/50 focus-within:bg-base-100 focus-within:ring-2 ring-primary/20 transition-all">
                        <input type="text" className="grow w-24 md:w-auto" placeholder="Search..." />
                        <Search className="w-4 h-4 opacity-70" />
                    </label>
                </div>

                {/* Action Icons */}
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Bell className="w-5 h-5" />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <MessageSquare className="w-5 h-5" />
                        <span className="badge badge-xs badge-secondary indicator-item"></span>
                    </div>
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt="User" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
