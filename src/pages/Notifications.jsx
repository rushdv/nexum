import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import api from "../api";

const NotificationIcon = ({ type }) => {
    const icons = {
        like: "❤️",
        comment: "💬",
        follow: "👤",
    };
    return <span className="text-lg">{icons[type] || "🔔"}</span>;
};

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await api.get("/notifications");
                setNotifications(res.data);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const markRead = async () => {
        try {
            await api.patch("/notifications/read");
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (err) {
            console.error("Error marking notifications read:", err);
        }
    };

    return (
        <div className="pb-20">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-cyan-400" />
                    Notifications
                </h1>
                {notifications.some(n => !n.is_read) && (
                    <button onClick={markRead} className="text-xs text-cyan-400 hover:underline">
                        Mark all as read
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : notifications.length > 0 ? (
                <div className="space-y-2">
                    {notifications.map(n => (
                        <div
                            key={n.id}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
                                n.is_read ? 'bg-transparent' : 'bg-cyan-500/5 border border-cyan-500/10'
                            }`}
                        >
                            <NotificationIcon type={n.type} />
                            <div className="flex-1">
                                <p className="text-sm text-slate-300">
                                    <span className="font-bold text-slate-200">{n.actor}</span>
                                    {n.type === "like" && " liked your post"}
                                    {n.type === "comment" && " commented on your post"}
                                    {n.type === "follow" && " started following you"}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {new Date(n.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            {!n.is_read && (
                                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-lg font-medium">No notifications yet</p>
                    <p className="text-sm mt-2">Activity from your posts will show up here</p>
                </div>
            )}
        </div>
    );
};

export default Notifications;
