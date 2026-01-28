import pool from "../config/db.js";

const PostModel = {
    // create new post
    async create({ userId, content }) {
        const query = `
      INSERT INTO posts (user_id, content)
      VALUES ($1, $2)
      RETURNING id, user_id, content, created_at
    `;
        const values = [userId, content];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // get all posts (latest first)
    async findAll(currentUserId = null) {
        const query = `
      SELECT p.id, p.content, p.created_at,
             u.id AS user_id, u.username,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
             EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `;
        const { rows } = await pool.query(query, [currentUserId]);
        return rows;
    },

    // get post by id
    async findById(postId) {
        const query = `
      SELECT p.id, p.content, p.created_at, p.user_id,
             u.id AS user_id, u.username
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `;
        const { rows } = await pool.query(query, [postId]);
        return rows[0];
    },

    // delete post (owner only)
    async deleteById(postId, userId) {
        const query = `
      DELETE FROM posts
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;
        const { rows } = await pool.query(query, [postId, userId]);
        return rows[0];
    }
};

export default PostModel;
