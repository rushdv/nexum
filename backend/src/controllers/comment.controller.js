import CommentModel from "../models/comment.model.js";
import NotificationModel from "../models/notification.model.js";
import pool from "../config/db.js";

// CREATE COMMENT
export const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = await CommentModel.create({
      postId,
      userId,
      content,
    });

    res.status(201).json(comment);

    const postOwner = await pool.query(
  "SELECT user_id FROM posts WHERE id = $1",
  [postId]
);

if (postOwner.rows[0]) {
  await NotificationModel.create({
    userId: postOwner.rows[0].user_id,
    actorId: userId,
    postId,
    type: "comment",
  });
}

  } catch (err) {
    next(err);
  }
};

// GET COMMENTS FOR A POST
export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.findByPost(postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// DELETE OWN COMMENT
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await CommentModel.deleteById(id, userId);

    if (!deleted) {
      return res
        .status(403)
        .json({ message: "Not allowed or comment not found" });
    }

    res.json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
};
