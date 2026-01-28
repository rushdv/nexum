import { Router } from "express";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.delete("/:id", authMiddleware, deletePost);

export default router;
