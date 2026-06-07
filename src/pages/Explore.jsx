import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass } from "lucide-react";
import api from "../api";
import PostCard from "../components/PostCard";

const Explore = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await api.get("/posts");
                let filtered = res.data;
                if (query) {
                    filtered = res.data.filter(p =>
                        p.content.toLowerCase().includes(query.toLowerCase())
                    );
                }
                const transformed = filtered.map(post => ({
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
                setPosts(transformed);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [query]);

    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <Compass className="w-6 h-6 text-cyan-400" />
                    Explore
                </h1>
                {query && (
                    <p className="text-slate-400 mt-2">Results for "{query}"</p>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : posts.length > 0 ? (
                posts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
                <div className="text-center py-20 text-slate-500">
                    <p className="text-lg font-medium">
                        {query ? `No results for "${query}"` : "No posts to explore yet"}
                    </p>
                    <p className="text-sm mt-2">
                        {query ? "Try a different search term" : "Check back later for new content"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Explore;
