import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/search", searchPosts);
router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
