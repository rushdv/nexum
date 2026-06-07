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
    const comment = rows[0];
    const userQuery = `SELECT username FROM users WHERE id = $1`;
    const { rows: userRows } = await pool.query(userQuery, [userId]);
    return { ...comment, username: userRows[0]?.username || 'Unknown' };
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
