import pool from "../config/db.js";

const NotificationModel = {
  async create({ userId, actorId, postId, type }) {
    // don't notify self
    if (userId === actorId) return;

    const query = `
      INSERT INTO notifications (user_id, actor_id, post_id, type)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [userId, actorId, postId, type]);
  },

  async findByUser(userId) {
    const query = `
      SELECT 
        n.id,
        n.type,
        n.is_read,
        n.created_at,
        u.username AS actor
      FROM notifications n
      JOIN users u ON n.actor_id = u.id
      WHERE n.user_id = $1
      ORDER BY n.created_at DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  async markAsRead(userId) {
    const query = `
      UPDATE notifications
      SET is_read = TRUE
      WHERE user_id = $1
    `;
    await pool.query(query, [userId]);
  },
};

export default NotificationModel;
