import FollowModel from "../models/follow.model.js";
import NotificationModel from "../models/notification.model.js";

export const toggleFollow = async (req, res, next) => {
  try {
    const { id: followingId } = req.params;
    const followerId = req.user.id;

    if (Number(followerId) === Number(followingId)) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const result = await FollowModel.toggle({ followerId, followingId });
    const followersCount = await FollowModel.getFollowersCount(followingId);

    if (result.following) {
      await NotificationModel.create({
        userId: followingId,
        actorId: followerId,
        postId: null,
        type: "follow"
      });
      const io = req.app.get("io");
      if (io) {
        io.to(`user:${followingId}`).emit("notification", {
          type: "follow",
          actorId: followerId,
        });
      }
    }

    res.json({
      following: result.following,
      followersCount
    });
  } catch (err) {
    next(err);
  }
};

export const getFollowStatus = async (req, res, next) => {
  try {
    const { id: followingId } = req.params;
    const followerId = req.user.id;

    const following = await FollowModel.isFollowing(followerId, followingId);
    res.json({ following });
  } catch (err) {
    next(err);
  }
};

export const getFollowers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const followers = await FollowModel.getFollowers(id);
    const count = await FollowModel.getFollowersCount(id);
    res.json({ followers, count });
  } catch (err) {
    next(err);
  }
};

export const getFollowing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const following = await FollowModel.getFollowing(id);
    const count = await FollowModel.getFollowingCount(id);
    res.json({ following, count });
  } catch (err) {
    next(err);
  }
};
