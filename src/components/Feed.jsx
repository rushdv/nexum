import PostCard from './PostCard';
import { MOCK_POSTS } from '../mock/posts';
import { Image, Smile, Calendar } from 'lucide-react';

const Feed = () => {
    return (
        <div className="flex-1 min-h-screen max-w-2xl mx-auto">
            {/* Post Composer - Dark Premium */}
            <div className="mb-8 p-4 rounded-[24px] bg-[#1e293b]/50 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex gap-4">
                    <div className="avatar">
                        <div className="w-11 h-11 rounded-full ring-2 ring-slate-700">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User" className="rounded-full" />
                        </div>
                    </div>
                    <div className="flex-1 z-10">
                        <textarea
                            className="textarea w-full h-20 bg-transparent focus:outline-none border-none resize-none text-lg text-slate-200 placeholder-slate-500 p-2"
                            placeholder="What's on your mind?"
                        ></textarea>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/50">
                            <div className="flex gap-1 text-cyan-500">
                                <button className="btn btn-ghost btn-sm btn-circle hover:bg-cyan-500/10">
                                    <Image className="w-5 h-5" />
                                </button>
                                <button className="btn btn-ghost btn-sm btn-circle hover:bg-cyan-500/10">
                                    <Smile className="w-5 h-5" />
                                </button>
                                <button className="btn btn-ghost btn-sm btn-circle hover:bg-cyan-500/10">
                                    <Calendar className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="btn btn-sm rounded-full px-6 bg-cyan-600 hover:bg-cyan-500 text-white border-none font-bold shadow-lg shadow-cyan-500/20">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className="pb-20 space-y-6">
                {MOCK_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
