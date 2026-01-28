import LikeModel from "../models/like.model.js";
import PostModel from "../models/post.model.js";
import NotificationModel from "../models/notification.model.js";
import pool from "../config/db.js";

// LIKE A POST
export const likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Check if post exists
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user already liked this post
        const existingLike = await LikeModel.checkLike(postId, userId);
        if (existingLike) {
            return res.status(409).json({ message: "You already liked this post" });
        }

        // Create like
        const like = await LikeModel.create({ postId, userId });
        const likeCount = await LikeModel.getCountByPostId(postId);

        res.status(201).json({
            message: "Post liked successfully",
            like: like,
            likeCount: likeCount
        });

        const postOwner = await pool.query(
            "SELECT user_id FROM posts WHERE id = $1",
            [postId]
        );

        if (postOwner.rows[0]) {
            await NotificationModel.create({
                userId: postOwner.rows[0].user_id,
                actorId: userId,
                postId,
                type: "like",
            });
        }



    } catch (err) {
        next(err);
    }

};

// UNLIKE A POST
export const unlikePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        // Check if post exists
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user liked this post
        const existingLike = await LikeModel.checkLike(postId, userId);
        if (!existingLike) {
            return res.status(404).json({ message: "You didn't like this post" });
        }

        // Delete like
        await LikeModel.deleteByPostAndUser(postId, userId);
        const likeCount = await LikeModel.getCountByPostId(postId);

        res.json({
            message: "Post unliked successfully",
            likeCount: likeCount
        });
    } catch (err) {
        next(err);
    }
};

// GET LIKE COUNT FOR A POST
export const getLikeCount = async (req, res, next) => {
    try {
        const { postId } = req.params;

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
        const { postId } = req.params;

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
        const { postId } = req.params;
        const userId = req.user.id;

        const liked = await LikeModel.checkLike(postId, userId);

        res.json({
            postId: postId,
            userId: userId,
            liked: !!liked
        });
    } catch (err) {
        next(err);
    }
};
