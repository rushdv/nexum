import { Router } from "express";
import { createComment, getCommentsByPost } from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id", getCommentsByPost);
router.post("/:id", authMiddleware, createComment);

export default router;
