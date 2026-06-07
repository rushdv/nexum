import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import api from "../api";
import PostCard from "../components/PostCard";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get("/bookmarks");
                const transformed = res.data.map(post => ({
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
                    is_liked: post.is_liked,
                    is_bookmarked: true
                }));
                setBookmarks(transformed);
            } catch (err) {
                console.error("Error fetching bookmarks:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <Bookmark className="w-6 h-6 text-cyan-400" />
                    Bookmarks
                </h1>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : bookmarks.length > 0 ? (
                bookmarks.map(post => <PostCard key={post.id} post={post} />)
            ) : (
                <div className="text-center py-20 text-slate-500">
                    <Bookmark className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-lg font-medium">No bookmarks yet</p>
                    <p className="text-sm mt-2">Click the bookmark icon on any post to save it here</p>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
