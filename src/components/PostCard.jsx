import { MessageCircle, Heart, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { useState } from 'react';
import api from '../api';

const PostCard = ({ post }) => {
    const { id, author, time, content, image, stats, is_liked } = post;
    const [liked, setLiked] = useState(is_liked);
    const [likesCount, setLikesCount] = useState(stats.likes);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [isCommenting, setIsCommenting] = useState(false);

    const handleLike = async () => {
        try {
            const res = await api.post(`/likes/${id}/like`);
            setLiked(res.data.liked);
            setLikesCount(prev => res.data.liked ? prev + 1 : prev - 1);
        } catch (err) {
            console.error("Error liking post:", err);
            if (err.response?.status === 401) alert("Please login to like posts");
        }
    };

    const fetchComments = async () => {
        try {
            const res = await api.get(`/comments/${id}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    const handleCommentToggle = () => {
        if (!showComments) fetchComments();
        setShowComments(!showComments);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;
        setIsCommenting(true);
        try {
            const res = await api.post(`/comments/${id}`, { content: commentContent });
            setComments(prev => [...prev, res.data]);
            setCommentContent("");
        } catch (err) {
            console.error("Error posting comment:", err);
            if (err.response?.status === 401) alert("Please login to comment");
        } finally {
            setIsCommenting(false);
        }
    };

    return (
        <article className="border-none bg-[#162032] p-6 lg:p-8 rounded-[32px] mb-8 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-500 cursor-default group relative overflow-hidden">
            {/* ... Header and Content ... */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-cyan-500/20 transition-all" />
                    <div>
                        <h3 className="text-slate-200 font-bold text-[15px] leading-tight group-hover:text-cyan-400 transition-colors cursor-pointer">{author.name}</h3>
                        <p className="text-slate-500 text-sm">{time}</p>
                    </div>
                </div>
                <button className="text-slate-600 hover:text-slate-300 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>

            <div className="relative z-10">
                <p className="text-slate-300 text-[16px] leading-[1.7] mb-6 font-medium whitespace-pre-wrap">{content}</p>
                {image && (
                    <div className="mb-6 rounded-2xl overflow-hidden bg-slate-800">
                        <img src={image} alt="Post Visual" className="w-full h-auto object-cover max-h-[600px] hover:scale-[1.01] transition-transform duration-500 ease-out" />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-6 relative z-10 pt-2 border-b border-slate-700/30 pb-4">
                <button className="flex items-center gap-2 group/action"><div className="p-2.5 rounded-xl bg-transparent group-hover/action:bg-slate-700/50 text-slate-500 group-hover/action:text-slate-300 transition-all"><Bookmark className="w-5 h-5 stroke-[2px]" /></div></button>
                <button className="flex items-center gap-2 group/action"><span className="text-xs font-semibold text-slate-500 opacity-0 group-hover/action:opacity-100 transition-all transform translate-x-2 group-hover/action:translate-x-0">Share</span><div className="p-2.5 rounded-xl bg-transparent group-hover/action:bg-indigo-500/10 text-slate-500 group-hover/action:text-indigo-400 transition-all"><Share2 className="w-5 h-5 stroke-[1.5px]" /></div></button>

                <button onClick={handleCommentToggle} className="flex items-center gap-2 group/action">
                    <span className="text-xs font-semibold text-slate-400">{comments.length || stats.comments}</span>
                    <div className={`p-2.5 rounded-xl transition-all ${showComments ? 'bg-cyan-500/10 text-cyan-400' : 'bg-transparent group-hover/action:bg-cyan-500/10 text-slate-500 group-hover/action:text-cyan-400'}`}>
                        <MessageCircle className="w-5 h-5 stroke-[1.5px]" />
                    </div>
                </button>

                <button onClick={handleLike} className="flex items-center gap-2 group/action">
                    <span className={`text-xs font-semibold ${liked ? 'text-pink-500' : 'text-slate-500'}`}>{likesCount}</span>
                    <div className={`p-2.5 rounded-xl transition-all ${liked ? 'bg-pink-500/10 text-pink-500' : 'bg-transparent group-hover/action:bg-pink-500/10 text-slate-500 group-hover/action:text-pink-500'}`}>
                        <Heart className={`w-5 h-5 stroke-[1.5px] ${liked ? 'fill-current' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <form onSubmit={handleCommentSubmit} className="flex gap-3">
                        <input
                            type="text"
                            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                            placeholder="Add a comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <button disabled={isCommenting} type="submit" className="btn btn-sm btn-circle bg-cyan-600 hover:bg-cyan-500 border-none text-white">
                            <PenTool className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="space-y-4">
                        {comments.length > 0 ? comments.map(c => (
                            <div key={c.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0 overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${c.username}&background=random&color=fff`} alt={c.username} />
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-3 flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-slate-200">{c.username}</span>
                                        <span className="text-[10px] text-slate-500">{new Date(c.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-slate-400">{c.content}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-xs text-slate-500 py-4">No comments yet</p>
                        )}
                    </div>
                </div>
            )}
        </article>
    );
};

export default PostCard;

