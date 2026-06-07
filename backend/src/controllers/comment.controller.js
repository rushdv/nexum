import CommentModel from "../models/comment.model.js";
import PostModel from "../models/post.model.js";
import NotificationModel from "../models/notification.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) return res.status(400).json({ message: "Content is required" });

    const comment = await CommentModel.create({ userId, postId, content });

    const post = await PostModel.findById(postId);
    if (post) {
      await NotificationModel.create({
        userId: post.user_id,
        actorId: userId,
        postId: Number(postId),
        type: "comment"
      });
      const io = req.app.get("io");
      if (io) {
        io.to(`user:${post.user_id}`).emit("notification", {
          type: "comment",
          actorId: userId,
          postId: Number(postId),
        });
      }
    }

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const comments = await CommentModel.getByPostId(postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

