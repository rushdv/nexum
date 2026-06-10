import crypto from "crypto";
import pool from "../config/db.js";

const RefreshTokenModel = {
  async create(userId) {
    const token = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const query = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      RETURNING token, expires_at
    `;
    const { rows } = await pool.query(query, [userId, token, expiresAt]);
    return rows[0];
  },

  async findByToken(token) {
    const query = `
      SELECT * FROM refresh_tokens
      WHERE token = $1 AND expires_at > NOW()
    `;
    const { rows } = await pool.query(query, [token]);
    return rows[0];
  },

  async deleteByToken(token) {
    await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [token]);
  },

  async deleteByUser(userId) {
    await pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);
  },
};

export default RefreshTokenModel;
