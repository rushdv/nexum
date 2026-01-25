import { MessageCircle, Heart, Share2, MoreHorizontal, Bookmark } from 'lucide-react';

const PostCard = ({ post }) => {
    const { author, time, content, image, stats } = post;

    return (
        <article className="border-none bg-[#162032] p-6 lg:p-8 rounded-[32px] mb-8 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-500 cursor-default group relative overflow-hidden">

            {/* Subtle Gradient Spot on Hover */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/15 transition-all duration-700 pointer-events-none"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-cyan-500/20 transition-all"
                    />
                    <div>
                        <h3 className="text-slate-200 font-bold text-[15px] leading-tight group-hover:text-cyan-400 transition-colors cursor-pointer">
                            {author.name}
                        </h3>
                        <p className="text-slate-500 text-sm">{time}</p>
                    </div>
                </div>

                <button className="text-slate-600 hover:text-slate-300 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <p className="text-slate-300 text-[16px] leading-[1.7] mb-6 font-medium whitespace-pre-wrap">
                    {content}
                </p>

                {image && (
                    <div className="mb-6 rounded-2xl overflow-hidden bg-slate-800">
                        <img
                            src={image}
                            alt="Post Visual"
                            className="w-full h-auto object-cover max-h-[600px] hover:scale-[1.01] transition-transform duration-500 ease-out"
                        />
                    </div>
                )}
            </div>

            {/* Actions: Right Aligned | Order: Bookmark -> Share -> Comment -> Like  */}
            {/* Visual Flow (Right to Left): [Like] [Comment] [Share] [Bookmark] */}
            {/* HTML Flow (justify-end): [Bookmark] [Share] [Comment] [Like] */}

            <div className="flex justify-end items-center gap-6 relative z-10 pt-2">

                {/* BOOKMARK - Leftmost */}
                <button className="flex items-center gap-2 group/action">
                    <div className="p-2.5 rounded-xl bg-transparent group-hover/action:bg-slate-700/50 text-slate-500 group-hover/action:text-slate-300 transition-all">
                        <Bookmark className="w-5 h-5 stroke-[2px]" />
                    </div>
                </button>

                {/* SHARE */}
                <button className="flex items-center gap-2 group/action">
                    <span className="text-xs font-semibold text-slate-500 opacity-0 group-hover/action:opacity-100 transition-all transform translate-x-2 group-hover/action:translate-x-0">
                        Share
                    </span>
                    <div className="p-2.5 rounded-xl bg-transparent group-hover/action:bg-indigo-500/10 text-slate-500 group-hover/action:text-indigo-400 transition-all">
                        <Share2 className="w-5 h-5 stroke-[2px]" />
                    </div>
                </button>

                {/* COMMENT */}
                <button className="flex items-center gap-2 group/action">
                    <span className="text-xs font-semibold text-slate-500 opacity-0 group-hover/action:opacity-100 transition-all transform translate-x-2 group-hover/action:translate-x-0">
                        {stats.comments}
                    </span>
                    <div className="p-2.5 rounded-xl bg-transparent group-hover/action:bg-cyan-500/10 text-slate-500 group-hover/action:text-cyan-400 transition-all">
                        <MessageCircle className="w-5 h-5 stroke-[2px]" />
                    </div>
                </button>

                {/* LIKE - Rightmost */}
                <button className="flex items-center gap-2 group/action">
                    <span className="text-xs font-semibold text-slate-500 opacity-0 group-hover/action:opacity-100 transition-all transform translate-x-2 group-hover/action:translate-x-0">
                        {stats.likes}
                    </span>
                    <div className="p-2.5 rounded-xl bg-transparent group-hover/action:bg-pink-500/10 text-slate-500 group-hover/action:text-pink-500 transition-all">
                        <Heart className="w-5 h-5 stroke-[2px]" />
                    </div>
                </button>

            </div>
        </article>
    );
};

export default PostCard;
