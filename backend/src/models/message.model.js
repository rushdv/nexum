import pool from "../config/db.js";

const MessageModel = {
  async createConversation(participantIds) {
    const { rows } = await pool.query(`INSERT INTO conversations DEFAULT VALUES RETURNING id`);
    const convId = rows[0].id;
    for (const userId of participantIds) {
      await pool.query(
        `INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2)`,
        [convId, userId]
      );
    }
    return convId;
  },

  async findOrCreateConversation(userId1, userId2) {
    const query = `
      SELECT c.id
      FROM conversations c
      WHERE EXISTS (
        SELECT 1 FROM conversation_participants WHERE conversation_id = c.id AND user_id = $1
      )
      AND EXISTS (
        SELECT 1 FROM conversation_participants WHERE conversation_id = c.id AND user_id = $2
      )
      AND (SELECT COUNT(*) FROM conversation_participants WHERE conversation_id = c.id) = 2
    `;
    const { rows } = await pool.query(query, [userId1, userId2]);
    if (rows.length > 0) return rows[0].id;
    return await this.createConversation([userId1, userId2]);
  },

  async sendMessage({ conversationId, senderId, content }) {
    const query = `
      INSERT INTO messages (conversation_id, sender_id, content)
      VALUES ($1, $2, $3)
      RETURNING id, sender_id, content, created_at
    `;
    const { rows } = await pool.query(query, [conversationId, senderId, content]);
    const userQuery = `SELECT username FROM users WHERE id = $1`;
    const { rows: userRows } = await pool.query(userQuery, [senderId]);
    return { ...rows[0], username: userRows[0]?.username || "Unknown" };
  },

  async getConversations(userId) {
    const query = `
      SELECT c.id, c.created_at,
        (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message,
        (SELECT created_at FROM messages WHERE conversation_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message_at,
        (SELECT username FROM conversation_participants cp JOIN users u ON cp.user_id = u.id WHERE cp.conversation_id = c.id AND cp.user_id != $1 LIMIT 1) AS other_user
      FROM conversations c
      WHERE EXISTS (SELECT 1 FROM conversation_participants WHERE conversation_id = c.id AND user_id = $1)
      ORDER BY last_message_at DESC NULLS LAST
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  async getMessages(conversationId) {
    const query = `
      SELECT m.id, m.sender_id, m.content, m.created_at, u.username
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = $1
      ORDER BY m.created_at ASC
    `;
    const { rows } = await pool.query(query, [conversationId]);
    return rows;
  },

  async getParticipants(conversationId) {
    const query = `
      SELECT u.id, u.username
      FROM conversation_participants cp
      JOIN users u ON cp.user_id = u.id
      WHERE cp.conversation_id = $1
    `;
    const { rows } = await pool.query(query, [conversationId]);
    return rows;
  }
};

export default MessageModel;
