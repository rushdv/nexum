import pool from "../config/db.js";

const CommentModel = {
  async create({ userId, postId, content }) {
    const query = `
      INSERT INTO comments (user_id, post_id, content)
      VALUES ($1, $2, $3)
      RETURNING id, content, created_at, user_id
    `;
    const values = [userId, postId, content];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async getByPostId(postId) {
    const query = `
      SELECT c.*, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `;
    const { rows } = await pool.query(query, [postId]);
    return rows;
  }
};

export default CommentModel;
