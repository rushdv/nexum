import { MoreHorizontal } from 'lucide-react';

const RightPanel = () => {
    const trendingTopics = [
        { category: 'Technology', title: '#TailwindCSS', posts: '25.4K' },
        { category: 'Design', title: '#DaisyUI', posts: '12.1K' },
        { category: 'Programming', title: '#ReactJS', posts: '54.2K' },
        { category: 'AI', title: '#Gemini', posts: '100K' },
    ];

    const whoToFollow = [
        { name: 'Elon Musk', handle: '@elonmusk', img: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' },
        { name: 'Bill Gates', handle: '@BillGates', img: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' },
    ];

    return (
        <aside className="hidden xl:block w-80 h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto space-y-6">
            {/* Trending Section */}
            <div className="card bg-base-200/50 backdrop-blur-sm border-none shadow-sm">
                <div className="card-body p-4">
                    <h2 className="card-title text-xl font-bold mb-2">Trends for you</h2>
                    <div className="space-y-4">
                        {trendingTopics.map((topic, index) => (
                            <div key={index} className="flex justify-between items-start cursor-pointer hover:bg-base-200 p-2 rounded-lg transition-colors -mx-2">
                                <div>
                                    <div className="text-xs text-base-content/60">{topic.category} · Trending</div>
                                    <div className="font-bold">{topic.title}</div>
                                    <div className="text-xs text-base-content/60">{topic.posts} posts</div>
                                </div>
                                <button className="btn btn-ghost btn-xs btn-circle">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-ghost btn-sm text-primary w-full mt-2">Show more</button>
                </div>
            </div>

            {/* Who to follow */}
            <div className="card bg-base-200/50 backdrop-blur-sm border-none shadow-sm">
                <div className="card-body p-4">
                    <h2 className="card-title text-xl font-bold mb-2">Who to follow</h2>
                    <div className="space-y-4">
                        {whoToFollow.map((user, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.img} alt={user.name} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold truncate">{user.name}</div>
                                    <div className="text-sm text-base-content/60 truncate">{user.handle}</div>
                                </div>
                                <button className="btn btn-sm btn-neutral rounded-full hover:btn-primary transition-colors">Follow</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default RightPanel;
