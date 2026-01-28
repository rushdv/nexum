import pool from "../config/db.js";

const LikeModel = {
  // like a post
  async create({ postId, userId }) {
    const query = `
      INSERT INTO likes (post_id, user_id)
      VALUES ($1, $2)
      RETURNING id, post_id, user_id, created_at
    `;
    const values = [postId, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // unlike a post
  async deleteByPostAndUser(postId, userId) {
    const query = `
      DELETE FROM likes
      WHERE post_id = $1 AND user_id = $2
      RETURNING id
    `;
    const values = [postId, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // check if user already liked the post
  async checkLike(postId, userId) {
    const query = `
      SELECT id FROM likes
      WHERE post_id = $1 AND user_id = $2
    `;
    const values = [postId, userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // get like count for a post
  async getCountByPostId(postId) {
    const query = `
      SELECT COUNT(*) as like_count FROM likes
      WHERE post_id = $1
    `;
    const values = [postId];
    const { rows } = await pool.query(query, values);
    return parseInt(rows[0].like_count);
  },

  // get all likes for a post with user info
  async getLikesByPostId(postId) {
    const query = `
      SELECT l.id, l.post_id, l.user_id, l.created_at,
             u.id AS user_id, u.username
      FROM likes l
      JOIN users u ON l.user_id = u.id
      WHERE l.post_id = $1
      ORDER BY l.created_at DESC
    `;
    const values = [postId];
    const { rows } = await pool.query(query, values);
    return rows;
  }
};

export default LikeModel;
