import { findMe, findPublicById, updateProfile, updatePassword } from "../models/user.model.js";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

// GET /api/users/me
export const getMyProfile = async (req, res, next) => {
  try {
    const user = await findMe(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await findPublicById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/me
export const updateMyProfile = async (req, res, next) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (newPassword) {
      const user = await findMe(userId);
      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
      if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters" });
      const hash = await bcrypt.hash(newPassword, 10);
      await updatePassword(userId, hash);
    }

    const updated = await updateProfile(userId, { username, email });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/search?q=
export const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json([]);
    const query = `SELECT id, username FROM users WHERE username ILIKE $1 LIMIT 10`;
    const { rows } = await pool.query(query, [`%${q}%`]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
