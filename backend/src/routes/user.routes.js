import { Router } from "express";
import {
  getMyProfile,
  getUserProfile,
  updateMyProfile,
  searchUsers,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/search", searchUsers);

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

// public profile
router.get("/:id", getUserProfile);

export default router;
