const Profile = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <div className="mt-4">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <h2 className="text-xl mt-2">Current User</h2>
                <p className="text-base-content/60">@user</p>
            </div>
        </div>
    );
};

export default Profile;
