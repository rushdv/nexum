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
  }
};

export default LikeModel;
