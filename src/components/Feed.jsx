import { useEffect, useState, useRef } from "react";
import { Image, Smile, Calendar, X } from 'lucide-react';
import PostCard from './PostCard';
import api from "../api";
import { useSocket } from "../context/SocketContext";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const sentinelRef = useRef(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;
        const handler = (post) => {
            const transformed = {
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
                is_bookmarked: post.is_bookmarked
            };
            setPosts(prev => [transformed, ...prev]);
        };
        socket.on("newPost", handler);
        return () => socket.off("newPost", handler);
    }, [socket]);

    const fetchPosts = async (pageNum = 1, append = false) => {
        try {
            const res = await api.get(`/posts?page=${pageNum}&limit=10`);
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
                is_liked: post.is_liked,
                is_bookmarked: post.is_bookmarked
            }));
            if (append) {
                setPosts(prev => [...prev, ...transformedPosts]);
            } else {
                setPosts(transformedPosts);
            }
            setHasMore(transformedPosts.length === 10);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts");
        } finally {
            setIsLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (!sentinelRef.current || !hasMore) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loadingMore) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, loadingMore, page]);

    const handleImageSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await api.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setImageUrl(res.data.url);
        } catch (err) {
            console.error("Error uploading image:", err);
            setError("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handlePostSubmit = async () => {
        if (!newPostContent.trim()) return;

        setError("");
        setIsSubmitting(true);
        try {
            await api.post("/posts", { content: newPostContent, imageUrl: imageUrl || undefined });
            setNewPostContent("");
            setImageUrl("");
            fetchPosts();
        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.response?.data?.message || "Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const loadMore = () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage, true);
    };

    return (
        <div className="flex-1 min-h-screen max-w-2xl mx-auto">
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                    {error}
                </div>
            )}

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
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-sm btn-circle hover:bg-cyan-500/10"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                >
                                    {uploading ? <span className="loading loading-spinner loading-xs" /> : <Image className="w-5 h-5" />}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
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
                {imageUrl && (
                    <div className="relative mt-3 rounded-2xl overflow-hidden bg-slate-800">
                        <img src={`http://localhost:5000${imageUrl}`} alt="Upload preview" className="w-full h-auto max-h-48 object-cover" />
                        <button
                            onClick={() => setImageUrl("")}
                            className="absolute top-2 right-2 p-1 bg-slate-900/80 rounded-full text-slate-300 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="pb-20 space-y-6">
                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-[#162032] p-8 rounded-[32px] animate-pulse">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-700/50" />
                                    <div className="space-y-2">
                                        <div className="w-24 h-4 bg-slate-700/50 rounded" />
                                        <div className="w-16 h-3 bg-slate-700/30 rounded" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-full h-4 bg-slate-700/30 rounded" />
                                    <div className="w-3/4 h-4 bg-slate-700/30 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <>
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        {hasMore && (
                            <div ref={sentinelRef} className="h-4" />
                        )}
                        {loadingMore && (
                            <div className="flex justify-center py-4">
                                <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 text-slate-500">
                        <p className="text-lg font-medium">No posts yet</p>
                        <p className="text-sm mt-2">Be the first to share something!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feed;
