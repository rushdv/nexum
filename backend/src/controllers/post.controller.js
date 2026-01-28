import PostModel from "../models/post.model.js";

// CREATE POST
export const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await PostModel.create({ userId, content });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// GET ALL POSTS
export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.findAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// DELETE POST (owner only)
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await PostModel.deleteById(id, userId);

    if (!deleted) {
      return res.status(403).json({ message: "Not allowed or post not found" });
    }

    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
