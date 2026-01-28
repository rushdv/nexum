import pool from "../config/db.js";

const LikeModel = {
  async toggle({ userId, postId }) {
    // Check if liked
    const checkQuery = `SELECT * FROM likes WHERE user_id = $1 AND post_id = $2`;
    const { rows } = await pool.query(checkQuery, [userId, postId]);

    if (rows.length > 0) {
      // Unlike
      const deleteQuery = `DELETE FROM likes WHERE user_id = $1 AND post_id = $2`;
      await pool.query(deleteQuery, [userId, postId]);
      return { liked: false };
    } else {
      // Like
      const insertQuery = `INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`;
      await pool.query(insertQuery, [userId, postId]);
      return { liked: true };
    }
  },

  async getCountsByPostId(postId) {
    const query = `SELECT COUNT(*) FROM likes WHERE post_id = $1`;
    const { rows } = await pool.query(query, [postId]);
    return parseInt(rows[0].count);
  },

  async isLikedByUser(postId, userId) {
    const query = `SELECT id FROM likes WHERE post_id = $1 AND user_id = $2`;
    const { rows } = await pool.query(query, [postId, userId]);
    return rows.length > 0;
  },

  // Get like count for a post
  async getCountByPostId(postId) {
    const query = `SELECT COUNT(*) as like_count FROM likes WHERE post_id = $1`;
    const { rows } = await pool.query(query, [postId]);
    return parseInt(rows[0].like_count);
  },

  // Get all likes for a post with user info
  async getLikesByPostId(postId) {
    const query = `
      SELECT l.id, l.post_id, l.user_id, l.created_at,
             u.id AS user_id, u.username
      FROM likes l
      JOIN users u ON l.user_id = u.id
      WHERE l.post_id = $1
      ORDER BY l.created_at DESC
    `;
    const { rows } = await pool.query(query, [postId]);
    return rows;
  }
};

export default LikeModel;
