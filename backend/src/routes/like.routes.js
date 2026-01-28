import { Router } from "express";
import {
  likePost,
  unlikePost,
  getLikeCount,
  getPostLikes,
  checkUserLike
} from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Like a post (authenticated)
router.post("/:postId", authMiddleware, likePost);

// Unlike a post (authenticated)
router.delete("/:postId", authMiddleware, unlikePost);

// Get like count for a post
router.get("/:postId/count", getLikeCount);

// Get all likes for a post
router.get("/:postId", getPostLikes);

// Check if current user liked a post (authenticated)
router.get("/:postId/check", authMiddleware, checkUserLike);

export default router;
