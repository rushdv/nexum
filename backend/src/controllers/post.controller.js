import sanitizeHtml from "sanitize-html";
import pool from "../config/db.js";
import PostModel from "../models/post.model.js";

// CREATE POST
export const createPost = async (req, res, next) => {
    try {
        let { content, imageUrl } = req.body;
        const userId = req.user.id;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        content = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
        const post = await PostModel.create({ userId, content, imageUrl });

        const io = req.app.get("io");
        if (io) {
          const userQuery = `SELECT username FROM users WHERE id = $1`;
          const { rows } = await pool.query(userQuery, [userId]);
          io.emit("newPost", {
            ...post,
            username: rows[0]?.username || "Anonymous",
            likes_count: 0,
            comments_count: 0,
            is_liked: false,
          });
        }

        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

// GET ALL POSTS (with pagination)
export const getPosts = async (req, res, next) => {
    try {
        const userId = req.user?.id || null;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const posts = await PostModel.findAll(userId, page, limit);
        res.json(posts);
    } catch (err) {
        next(err);
    }
};

// UPDATE POST (owner only)
export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        let { content, imageUrl } = req.body;

        if (content) content = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });

        const post = await PostModel.updateById(id, userId, { content, imageUrl });

        if (!post) {
            return res.status(403).json({ message: "Not allowed or post not found" });
        }

        res.json(post);
    } catch (err) {
        next(err);
    }
};

// SEARCH POSTS
export const searchPosts = async (req, res, next) => {
    try {
        const userId = req.user?.id || null;
        const q = req.query.q;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (!q || q.length < 2) {
            return res.json([]);
        }

        const posts = await PostModel.search({ query: q, currentUserId: userId, page, limit });
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
