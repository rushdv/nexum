import { Bookmark } from "lucide-react";

const Bookmarks = () => {
    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <Bookmark className="w-6 h-6 text-cyan-400" />
                    Bookmarks
                </h1>
            </div>
            <div className="text-center py-20 text-slate-500">
                <Bookmark className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-lg font-medium">No bookmarks yet</p>
                <p className="text-sm mt-2">Save posts to read them later</p>
            </div>
        </div>
    );
};

export default Bookmarks;
