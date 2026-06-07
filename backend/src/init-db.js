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
  } catch (err) {
    console.error('Error creating users table:', err);
    process.exit(1);
  }
};

const createPostsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Posts table ensured');
  } catch (err) {
    console.error('Error creating posts table:', err);
    process.exit(1);
  }
};

const createLikesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS likes (
      id SERIAL PRIMARY KEY,
      post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(post_id, user_id)
    );
  `;

  try {
    await pool.query(query);
    console.log('Likes table ensured');
  } catch (err) {
    console.error('Error creating likes table:', err);
    process.exit(1);
  }
};

const createCommentsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Comments table ensured');
  } catch (err) {
    console.error('Error creating comments table:', err);
    process.exit(1);
  }
};

const createFollowersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS followers (
      id SERIAL PRIMARY KEY,
      follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(follower_id, following_id)
    );
  `;

  try {
    await pool.query(query);
    console.log('Followers table ensured');
  } catch (err) {
    console.error('Error creating followers table:', err);
    process.exit(1);
  }
};

const createNotificationsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      actor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      type VARCHAR(50) NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Notifications table ensured');
  } catch (err) {
    console.error('Error creating notifications table:', err);
    process.exit(1);
  }
};

const initDb = async () => {
  try {
    await createUsersTable();
    await createPostsTable();
    await createLikesTable();
    await createCommentsTable();
    await createFollowersTable();
    await createNotificationsTable();
    console.log('All tables initialized successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

initDb();
