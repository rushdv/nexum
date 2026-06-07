import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import PostCard from "../components/PostCard";

const Profile = () => {
    const { id } = useParams();
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    const isOwnProfile = !id || String(currentUser?.id) === String(id);
    const profileId = isOwnProfile ? currentUser?.id : id;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (isOwnProfile) {
                    const res = await api.get("/users/me");
                    setProfile(res.data);
                    setFollowersCount(res.data.followers_count || 0);
                } else {
                    const res = await api.get(`/users/${id}`);
                    setProfile(res.data);
                    setFollowersCount(res.data.followers_count || 0);
                    try {
                        const statusRes = await api.get(`/follow/${id}/status`);
                        setFollowing(statusRes.data.following);
                    } catch (_) {}
                }
                const postsRes = await api.get("/posts");
                const userPosts = postsRes.data.filter(p =>
                    String(p.user_id) === String(profileId)
                );
                const transformed = userPosts.map(post => ({
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
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id, currentUser, profileId]);

    const handleFollow = async () => {
        try {
            const res = await api.post(`/follow/${id}`);
            setFollowing(res.data.following);
            setFollowersCount(res.data.followersCount);
        } catch (err) {
            console.error("Error toggling follow:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!profile) {
        return <div className="text-center py-20 text-slate-500">User not found</div>;
    }

    return (
        <div className="pb-20">
            <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-[32px] p-8 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full ring-2 ring-cyan-500/20 overflow-hidden">
                            <img
                                src={`https://ui-avatars.com/api/?name=${profile.username}&background=random&color=fff&size=80`}
                                alt={profile.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-200">{profile.username}</h1>
                            <p className="text-slate-400">@{profile.username}</p>
                            {profile.email && <p className="text-sm text-slate-500 mt-1">{profile.email}</p>}
                            <div className="flex gap-6 mt-3">
                                <div>
                                    <span className="text-white font-bold">{followersCount}</span>
                                    <span className="text-slate-500 text-sm ml-1">Followers</span>
                                </div>
                                <div>
                                    <span className="text-white font-bold">{profile.following_count || 0}</span>
                                    <span className="text-slate-500 text-sm ml-1">Following</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!isOwnProfile && (
                        <button
                            onClick={handleFollow}
                            className={`btn rounded-full px-6 border-none font-bold ${
                                following
                                    ? 'bg-slate-800 text-slate-300 hover:bg-red-500/10 hover:text-red-400'
                                    : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                            }`}
                        >
                            {following ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>

            <h2 className="text-xl font-bold text-slate-200 mb-6 px-2">Posts</h2>
            {posts.length > 0 ? (
                posts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
                <div className="text-center py-16 text-slate-500">
                    <p className="text-lg font-medium">No posts yet</p>
                    <p className="text-sm mt-2">When you post, they'll show up here.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
