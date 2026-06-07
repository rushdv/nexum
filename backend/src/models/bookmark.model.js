import pool from "../config/db.js";

const BookmarkModel = {
  async toggle({ userId, postId }) {
    const checkQuery = `SELECT * FROM bookmarks WHERE user_id = $1 AND post_id = $2`;
    const { rows } = await pool.query(checkQuery, [userId, postId]);

    if (rows.length > 0) {
      await pool.query(`DELETE FROM bookmarks WHERE user_id = $1 AND post_id = $2`, [userId, postId]);
      return { bookmarked: false };
    } else {
      await pool.query(`INSERT INTO bookmarks (user_id, post_id) VALUES ($1, $2)`, [userId, postId]);
      return { bookmarked: true };
    }
  },

  async isBookmarked(userId, postId) {
    const { rows } = await pool.query(`SELECT id FROM bookmarks WHERE user_id = $1 AND post_id = $2`, [userId, postId]);
    return rows.length > 0;
  },

  async findByUser(userId) {
    const query = `
      SELECT p.id, p.content, p.image_url, p.created_at,
             u.id AS user_id, u.username,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
             EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS is_liked
      FROM bookmarks b
      JOIN posts p ON b.post_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
};

export default BookmarkModel;
