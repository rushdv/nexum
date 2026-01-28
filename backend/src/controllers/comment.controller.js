import CommentModel from "../models/comment.model.js";

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
