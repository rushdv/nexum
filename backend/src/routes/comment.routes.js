import { Router } from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// comments on a post
router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", getComments);

// delete own comment
router.delete("/delete/:id", authMiddleware, deleteComment);

export default router;
