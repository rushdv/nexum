import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Compass, Users } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api";
import PostCard from "../components/PostCard";

const Explore = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("posts");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (tab === "posts") {
                    const res = await api.get("/posts");
                    let filtered = res.data;
                    if (query) {
                        filtered = res.data.filter(p =>
                            p.content.toLowerCase().includes(query.toLowerCase())
                        );
                    }
                    const transformed = filtered.map(post => ({
                        id: post.id,
                        user_id: post.user_id,
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
                        is_bookmarked: post.is_bookmarked
                    }));
                    setPosts(transformed);
                } else {
                    const res = await api.get(`/users/search?q=${query}`);
                    setUsers(res.data);
                }
            } catch {
                toast.error("Search failed");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [query, tab]);

    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <Compass className="w-6 h-6 text-cyan-400" />
                    Explore
                </h1>
                {query && <p className="text-slate-400 mt-2">Results for "{query}"</p>}

                <div className="flex gap-4 mt-4 border-b border-slate-700/50 pb-2">
                    <button
                        onClick={() => setTab("posts")}
                        className={`text-sm font-medium pb-1 ${tab === "posts" ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}
                    >
                        Posts
                    </button>
                    <button
                        onClick={() => setTab("users")}
                        className={`text-sm font-medium pb-1 ${tab === "users" ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}
                    >
                        People
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : tab === "posts" ? (
                posts.length > 0 ? (
                    posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <p className="text-lg font-medium">{query ? `No results for "${query}"` : "No posts to explore yet"}</p>
                    </div>
                )
            ) : (
                users.length > 0 ? (
                    <div className="space-y-2">
                        {users.map(u => (
                            <Link key={u.id} to={`/profile/${u.id}`} className="flex items-center gap-4 p-4 bg-[#1e293b]/50 rounded-2xl border border-slate-700/50 hover:bg-[#1e293b] transition-colors">
                                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${u.username}&background=random&color=fff`} alt={u.username} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200">{u.username}</p>
                                    <p className="text-xs text-slate-500">@{u.username}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <Users className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                        <p className="text-lg font-medium">{query ? `No users found for "${query}"` : "Search for people"}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Explore;
