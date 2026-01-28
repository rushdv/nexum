import CommentModel from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) return res.status(400).json({ message: "Content is required" });

    const comment = await CommentModel.create({ userId, postId, content });
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
