import PostCard from './PostCard';
import { MOCK_POSTS } from '../mock/posts';

const Feed = () => {
    return (
        <div className="flex-1 min-h-screen border-x border-base-200 max-w-2xl mx-auto">
            {/* Feed Header */}
            <div className="sticky top-[4.5rem] z-40 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 py-3">
                <h2 className="text-xl font-bold">Home</h2>
            </div>

            {/* Post Composer Placeholder */}
            <div className="p-4 border-b border-base-200 bg-base-100">
                <div className="flex gap-4">
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <textarea
                            className="textarea textarea-bordered w-full h-24 focus:outline-none border-none resize-none text-lg"
                            placeholder="What's happening?"
                        ></textarea>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-2">
                                {/* Icons could go here */}
                            </div>
                            <button className="btn btn-primary btn-sm rounded-full px-6">Post</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className="pb-20">
                {MOCK_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
