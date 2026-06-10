import pool from "../config/db.js";

const PostModel = {
    // create new post
    async create({ userId, content, imageUrl }) {
        const query = `
      INSERT INTO posts (user_id, content, image_url)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, content, image_url, created_at
    `;
        const values = [userId, content, imageUrl || null];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // get all posts (latest first) with pagination
    async findAll(currentUserId = null, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `
      SELECT p.id, p.content, p.image_url, p.created_at,
             u.id AS user_id, u.username,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
             EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS is_liked,
             EXISTS(SELECT 1 FROM bookmarks WHERE post_id = p.id AND user_id = $1) AS is_bookmarked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `;
        const { rows } = await pool.query(query, [currentUserId, limit, offset]);
        return rows;
    },

    // get post by id
    async findById(postId) {
        const query = `
      SELECT p.id, p.content, p.created_at, p.user_id,
             u.id AS user_id, u.username
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `;
        const { rows } = await pool.query(query, [postId]);
        return rows[0];
    },

    // update post (owner only)
    async updateById(postId, userId, { content, imageUrl }) {
        const query = `
      UPDATE posts
      SET content = COALESCE($1, content), image_url = COALESCE($2, image_url)
      WHERE id = $3 AND user_id = $4
      RETURNING id, user_id, content, image_url, created_at
    `;
        const { rows } = await pool.query(query, [content, imageUrl, postId, userId]);
        return rows[0];
    },

    // delete post (owner only)
    async deleteById(postId, userId) {
        const query = `
      DELETE FROM posts
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;
        const { rows } = await pool.query(query, [postId, userId]);
        return rows[0];
    },

    // search posts by content
    async search({ query: searchQuery, currentUserId = null, page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;
        const query = `
      SELECT p.id, p.content, p.image_url, p.created_at,
             u.id AS user_id, u.username,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes_count,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comments_count,
             EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS is_liked,
             EXISTS(SELECT 1 FROM bookmarks WHERE post_id = p.id AND user_id = $1) AS is_bookmarked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.content ILIKE $2
      ORDER BY p.created_at DESC
      LIMIT $3 OFFSET $4
    `;
        const { rows } = await pool.query(query, [currentUserId, `%${searchQuery}%`, limit, offset]);
        return rows;
    }
};

export default PostModel;
