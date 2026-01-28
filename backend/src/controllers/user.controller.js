import { findMe, findPublicById } from "../models/user.model.js";

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
