import { Home, Compass, Bell, Mail, Bookmark, User, Settings, MoreHorizontal } from 'lucide-react';

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
        <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto">
            <ul className="menu bg-base-100 w-full rounded-box gap-2">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a className={`flex items-center gap-4 py-3 text-lg ${item.active ? 'active font-bold' : ''}`}>
                            <item.icon className="w-6 h-6" />
                            {item.label}
                        </a>
                    </li>
                ))}
                <li>
                    <a className="flex items-center gap-4 py-3 text-lg">
                        <MoreHorizontal className="w-6 h-6" />
                        More
                    </a>
                </li>
            </ul>

            <div className="mt-auto pt-4">
                <button className="btn btn-primary w-full rounded-full text-lg shadow-lg shadow-primary/30">
                    Post
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
