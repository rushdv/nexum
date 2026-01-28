import { useEffect, useState } from "react";
import { Image, Smile, Calendar } from 'lucide-react';
import PostCard from './PostCard';
import api from "../api";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchPosts = () => {
        api.get("/posts")
            .then((res) => {
                const transformedPosts = res.data.map(post => ({
                    id: post.id,
                    content: post.content,
                    time: new Date(post.created_at).toLocaleDateString(),
                    author: {
                        name: post.username || 'Anonymous',
                        avatar: `https://ui-avatars.com/api/?name=${post.username || 'A'}&background=random&color=fff`
                    },
                    stats: {
                        likes: parseInt(post.likes_count) || 0,
                        comments: parseInt(post.comments_count) || 0
                    },
                    image: post.image_url,
                    is_liked: post.is_liked
                }));
                setPosts(transformedPosts);
            })
            .catch(err => console.error("Error fetching posts:", err));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostSubmit = async () => {
        if (!newPostContent.trim()) return;

        setIsSubmitting(true);
        try {
            await api.post("/posts", { content: newPostContent });
            setNewPostContent("");
            fetchPosts(); // Refresh feed after posting
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Failed to create post. Please make sure you are logged in.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
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
                            <button
                                className={`btn btn-sm rounded-full px-6 bg-cyan-600 hover:bg-cyan-500 text-white border-none font-bold shadow-lg shadow-cyan-500/20 ${isSubmitting ? 'loading' : ''}`}
                                onClick={handlePostSubmit}
                                disabled={isSubmitting || !newPostContent.trim()}
                            >
                                {isSubmitting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className="pb-20 space-y-6">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="text-center py-10 text-slate-500">
                        Loading posts or no posts found...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;

