import pool from "../config/db.js";

const CommentModel = {
  async create({ postId, userId, content }) {
    const query = `
      INSERT INTO comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING id, post_id, user_id, content, created_at
    `;
    const { rows } = await pool.query(query, [postId, userId, content]);
    return rows[0];
  },

  async findByPost(postId) {
    const query = `
      SELECT 
        c.id,
        c.content,
        c.created_at,
        u.id AS user_id,
        u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `;
    const { rows } = await pool.query(query, [postId]);
    return rows;
  },

  async deleteById(commentId, userId) {
    const query = `
      DELETE FROM comments
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;
    const { rows } = await pool.query(query, [commentId, userId]);
    return rows[0];
  },
};

export default CommentModel;
