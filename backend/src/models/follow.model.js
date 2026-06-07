import pool from "../config/db.js";

const FollowModel = {
  async toggle({ followerId, followingId }) {
    const checkQuery = `SELECT * FROM followers WHERE follower_id = $1 AND following_id = $2`;
    const { rows } = await pool.query(checkQuery, [followerId, followingId]);

    if (rows.length > 0) {
      const deleteQuery = `DELETE FROM followers WHERE follower_id = $1 AND following_id = $2`;
      await pool.query(deleteQuery, [followerId, followingId]);
      return { following: false };
    } else {
      const insertQuery = `INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)`;
      await pool.query(insertQuery, [followerId, followingId]);
      return { following: true };
    }
  },

  async isFollowing(followerId, followingId) {
    const query = `SELECT id FROM followers WHERE follower_id = $1 AND following_id = $2`;
    const { rows } = await pool.query(query, [followerId, followingId]);
    return rows.length > 0;
  },

  async getFollowersCount(userId) {
    const query = `SELECT COUNT(*) FROM followers WHERE following_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return parseInt(rows[0].count);
  },

  async getFollowingCount(userId) {
    const query = `SELECT COUNT(*) FROM followers WHERE follower_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return parseInt(rows[0].count);
  },

  async getFollowers(userId) {
    const query = `
      SELECT u.id, u.username
      FROM followers f
      JOIN users u ON f.follower_id = u.id
      WHERE f.following_id = $1
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  async getFollowing(userId) {
    const query = `
      SELECT u.id, u.username
      FROM followers f
      JOIN users u ON f.following_id = u.id
      WHERE f.follower_id = $1
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },
};

export default FollowModel;
