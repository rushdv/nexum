import { ArrowUpRight, Plus } from 'lucide-react';

const RightPanel = () => {
    // This component is strictly "Contextual Info" now located on the Left.

    const trendingTopics = [
        { title: 'UX Design', count: '12k' },
        { title: 'React 19', count: '8.5k' },
        { title: 'Dark Mode', count: '24k' },
    ];

    return (
        <aside className="hidden xl:flex flex-col w-72 h-[calc(100vh-3rem)] sticky top-6 gap-8 pr-6 z-10">

            {/* User Context */}
            <div className="p-1">
                <h2 className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-6">Your Context</h2>

                {/* Mini Profile Summary */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 p-1">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="w-full h-full rounded-xl object-cover" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold leading-tight">Alex Designer</h3>
                        <p className="text-slate-500 text-sm">@alex_ux</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-8">
                    <div>
                        <span className="block text-white font-bold text-lg">1.4k</span>
                        <span className="text-slate-600 text-xs">Followers</span>
                    </div>
                    <div>
                        <span className="block text-white font-bold text-lg">892</span>
                        <span className="text-slate-600 text-xs">Following</span>
                    </div>
                </div>
            </div>

            {/* Trending Context */}
            <div>
                <h2 className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-4">Trending</h2>
                <div className="space-y-1">
                    {trendingTopics.map((item, idx) => (
                        <div key={idx} className="group flex items-center justify-between py-3 px-3 -mx-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-colors">
                            <div>
                                <h4 className="text-slate-300 text-sm font-medium group-hover:text-cyan-400 transition-colors">#{item.title}</h4>
                                <span className="text-slate-600 text-xs">{item.count} posts</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pb-4 text-[10px] text-slate-700 leading-relaxed font-mono">
                Running Nexum v2.0 <br />
                Next-Gen Social Protocol
            </div>

        </aside>
    );
};

export default RightPanel;
