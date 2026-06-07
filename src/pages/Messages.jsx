import { useState, useEffect, useRef } from "react";
import { Mail, Send, ArrowLeft, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import api from "../api";

const Messages = () => {
    const { user } = useAuth();
    const { socket } = useSocket();
    const [conversations, setConversations] = useState([]);
    const [activeConv, setActiveConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showNewChat, setShowNewChat] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get("/messages");
                setConversations(res.data);
            } catch (err) {
                console.error("Error fetching conversations:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!socket) return;
        const handler = ({ conversationId, message }) => {
            if (activeConv === conversationId) {
                setMessages(prev => [...prev, message]);
            }
        };
        socket.on("newMessage", handler);
        return () => socket.off("newMessage", handler);
    }, [socket, activeConv]);

    const openConversation = async (convId) => {
        setActiveConv(convId);
        try {
            const res = await api.get(`/messages/${convId}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!content.trim() || !activeConv) return;
        try {
            const res = await api.post(`/messages/${activeConv}`, { content });
            setMessages(prev => [...prev, res.data]);
            setContent("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const handleSearchUsers = async (q) => {
        setSearch(q);
        if (q.length < 2) { setSearchResults([]); return; }
        try {
            const res = await api.get(`/users/search?q=${q}`);
            setSearchResults(res.data);
        } catch (_) {}
    };

    const startConversation = async (userId) => {
        setShowNewChat(false);
        setSearch("");
        setSearchResults([]);
        try {
            const res = await api.post(`/messages/user/${userId}`);
            setActiveConv(res.data.conversationId);
            setMessages(res.data.messages);
            const convsRes = await api.get("/messages");
            setConversations(convsRes.data);
        } catch (err) {
            console.error("Error starting conversation:", err);
        }
    };

    return (
        <div className="pb-20 flex h-[calc(100vh-8rem)] gap-4">
            <div className="w-80 shrink-0 bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-cyan-400" /> Messages
                    </h2>
                    <button onClick={() => setShowNewChat(!showNewChat)} className="btn btn-xs rounded-full bg-cyan-600 hover:bg-cyan-500 text-white border-none">
                        + New
                    </button>
                </div>

                {showNewChat && (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => handleSearchUsers(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                        />
                        {searchResults.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {searchResults.filter(u => u.id !== user?.id).map(u => (
                                    <button
                                        key={u.id}
                                        onClick={() => startConversation(u.id)}
                                        className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors"
                                    >
                                        @{u.username}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1 overflow-y-auto space-y-1">
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : conversations.length > 0 ? (
                        conversations.map(c => (
                            <button
                                key={c.id}
                                onClick={() => openConversation(c.id)}
                                className={`w-full text-left p-3 rounded-xl transition-colors ${
                                    activeConv === c.id ? 'bg-slate-700/50' : 'hover:bg-slate-800/50'
                                }`}
                            >
                                <p className="text-sm font-bold text-slate-200">{c.other_user || 'Unknown'}</p>
                                <p className="text-xs text-slate-500 truncate mt-1">{c.last_message || 'No messages yet'}</p>
                            </button>
                        ))
                    ) : (
                        <p className="text-center text-xs text-slate-500 py-10">No conversations</p>
                    )}
                </div>
            </div>

            <div className="flex-1 bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] flex flex-col">
                {activeConv ? (
                    <>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map(m => (
                                <div key={m.id} className={`flex ${m.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                                        m.sender_id === user?.id
                                            ? 'bg-cyan-600/20 text-cyan-200'
                                            : 'bg-slate-800/50 text-slate-300'
                                    }`}>
                                        <p className="text-sm">{m.content}</p>
                                        <p className="text-[10px] text-slate-500 mt-1">{new Date(m.created_at).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSend} className="p-4 border-t border-slate-700/50 flex gap-3">
                            <input
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                            />
                            <button type="submit" className="btn btn-sm btn-circle bg-cyan-600 hover:bg-cyan-500 text-white border-none">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-500">
                        <div className="text-center">
                            <Mail className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                            <p className="text-lg font-medium">Select a conversation</p>
                            <p className="text-sm mt-2">Choose a chat from the sidebar or start a new one</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
