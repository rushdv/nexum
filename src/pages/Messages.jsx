import { Mail } from "lucide-react";

const Messages = () => {
    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-cyan-400" />
                    Messages
                </h1>
            </div>
            <div className="text-center py-20 text-slate-500">
                <Mail className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm mt-2">Start a conversation with someone</p>
            </div>
        </div>
    );
};

export default Messages;
