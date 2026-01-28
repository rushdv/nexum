import pool from './config/db.js';

const createUsersTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        await pool.query(query);
        console.log('Users table ensured');
        process.exit(0);
    } catch (err) {
        console.error('Error creating users table:', err);
        process.exit(1);
    }
};

createUsersTable();
