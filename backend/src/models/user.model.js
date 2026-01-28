import pool from "../config/db.js";

const UserModel = {
    async create({ username, email, passwordHash }) {
        const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
        const values = [username, email, passwordHash];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    },
};

export default UserModel;




// get logged-in user's profile
async function findMe(userId) {
  const query = `
    SELECT id, username, email, created_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
}

// get public profile by user id
async function findPublicById(userId) {
  const query = `
    SELECT id, username, created_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
}

export { findMe, findPublicById };
