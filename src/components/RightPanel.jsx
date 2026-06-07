import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api';

const RightPanel = () => {
    const { user } = useAuth();
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get("/trending");
                setTrending(res.data);
            } catch (_) {}
        };
        fetch();
    }, []);

    return (
        <aside className="hidden xl:flex flex-col w-72 h-[calc(100vh-3rem)] sticky top-6 gap-8 pr-6 z-10">
            <div className="p-1">
                <h2 className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-6">Your Context</h2>

                {user && (
                    <Link to="/profile" className="flex items-center gap-4 mb-8 group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-800 p-1">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff&size=56`}
                                className="w-full h-full rounded-xl object-cover"
                                alt={user.username}
                            />
                        </div>
                        <div>
                            <h3 className="text-white font-bold leading-tight group-hover:text-cyan-400 transition-colors">{user.username}</h3>
                            <p className="text-slate-500 text-sm">@{user.username}</p>
                        </div>
                    </Link>
                )}

                {user && (
                    <div className="flex gap-6 mb-8">
                        <div>
                            <span className="block text-white font-bold text-lg">{user.followers_count || 0}</span>
                            <span className="text-slate-600 text-xs">Followers</span>
                        </div>
                        <div>
                            <span className="block text-white font-bold text-lg">{user.following_count || 0}</span>
                            <span className="text-slate-600 text-xs">Following</span>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-4">Trending</h2>
                <div className="space-y-1">
                    {trending.length > 0 ? trending.map((item, idx) => (
                        <Link key={idx} to={`/explore?q=${item.tag}`} className="group flex items-center justify-between py-3 px-3 -mx-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-colors">
                            <div>
                                <h4 className="text-slate-300 text-sm font-medium group-hover:text-cyan-400 transition-colors">#{item.tag}</h4>
                                <span className="text-slate-600 text-xs">{item.count} {item.count === 1 ? 'post' : 'posts'}</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                    )) : (
                        <p className="text-xs text-slate-600 px-3">No trending topics yet</p>
                    )}
                </div>
            </div>

            <div className="mt-auto pb-4 text-[10px] text-slate-700 leading-relaxed font-mono">
                Running Nexum v2.0 <br />
                Next-Gen Social Protocol
            </div>
        </aside>
    );
};

export default RightPanel;
