import pool from "../config/db.js";

export const getTrending = async (req, res, next) => {
  try {
    const query = `
      SELECT regexp_matches(LOWER(content), '#([a-zA-Z0-9_]+)', 'g') AS tags
      FROM posts
      WHERE created_at > NOW() - INTERVAL '7 days'
    `;
    const { rows } = await pool.query(query);
    const tagCounts = {};
    for (const row of rows) {
      for (const tag of row.tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
    const sorted = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));
    res.json(sorted);
  } catch (err) {
    next(err);
  }
};
