import { MessageSquare, Repeat, Heart, Share, MoreHorizontal } from 'lucide-react';

const PostCard = ({ post }) => {
    const { author, time, content, image, stats } = post;

    return (
        <div className="card bg-base-100 border-b border-base-200 rounded-none hover:bg-base-200/30 transition-colors cursor-pointer">
            <div className="card-body p-4">
                <div className="flex gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={author.avatar} alt={author.name} />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm">
                                <span className="font-bold text-base-content">{author.name}</span>
                                <span className="text-base-content/60 truncate">{author.handle}</span>
                                <span className="text-base-content/60">·</span>
                                <span className="text-base-content/60">{time}</span>
                            </div>
                            <button className="btn btn-ghost btn-xs btn-circle opacity-60 hover:opacity-100">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="mt-1 text-[15px] leading-normal whitespace-pre-wrap">{content}</p>

                        {image && (
                            <div className="mt-3 rounded-2xl overflow-hidden border border-base-300">
                                <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                            </div>
                        )}

                        <div className="flex justify-between mt-3 max-w-md text-base-content/60">
                            <button className="btn btn-ghost btn-sm btn-circle group">
                                <MessageSquare className="w-4 h-4 group-hover:text-primary" />
                                <span className="text-xs group-hover:text-primary">{stats.comments}</span>
                            </button>
                            <button className="btn btn-ghost btn-sm btn-circle group">
                                <Repeat className="w-4 h-4 group-hover:text-secondary" />
                                <span className="text-xs group-hover:text-secondary">{stats.retweets}</span>
                            </button>
                            <button className="btn btn-ghost btn-sm btn-circle group">
                                <Heart className="w-4 h-4 group-hover:text-error" />
                                <span className="text-xs group-hover:text-error">{stats.likes}</span>
                            </button>
                            <button className="btn btn-ghost btn-sm btn-circle group">
                                <Share className="w-4 h-4 group-hover:text-info" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
