import LikeModel from "../models/like.model.js";
import PostModel from "../models/post.model.js";

export const toggleLike = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    // Check if post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Toggle like/unlike
    const result = await LikeModel.toggle({ userId, postId });

    // Get updated like count
    const likeCount = await LikeModel.getCountsByPostId(postId);

    if (result.liked) {
      res.json({
        message: "Post liked successfully",
        liked: true,
        likeCount: likeCount
      });
    } else {
      res.json({
        message: "Post unliked successfully",
        liked: false,
        likeCount: likeCount
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET LIKE COUNT FOR A POST
export const getLikeCount = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    // Check if post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeCount = await LikeModel.getCountByPostId(postId);

    res.json({
      postId: postId,
      likeCount: likeCount
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL LIKES FOR A POST
export const getPostLikes = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    // Check if post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likes = await LikeModel.getLikesByPostId(postId);

    res.json({
      postId: postId,
      likeCount: likes.length,
      likes: likes
    });
  } catch (err) {
    next(err);
  }
};

// CHECK IF USER LIKED A POST
export const checkUserLike = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    const liked = await LikeModel.isLikedByUser(postId, userId);

    res.json({
      postId: postId,
      userId: userId,
      liked: liked
    });
  } catch (err) {
    next(err);
  }
};
