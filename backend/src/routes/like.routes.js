import { Router } from "express";
import {
  toggleLike,
  getLikeCount,
  getPostLikes,
  checkUserLike
} from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Toggle like/unlike for a post (authenticated)
router.post("/:id", authMiddleware, toggleLike);

// Get like count for a post
router.get("/:id/count", getLikeCount);

// Get all likes for a post
router.get("/:id", getPostLikes);

// Check if current user liked a post (authenticated)
router.get("/:id/check", authMiddleware, checkUserLike);

export default router;
