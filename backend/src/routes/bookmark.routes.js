import { Router } from "express";
import { toggleBookmark, getBookmarks, checkBookmark } from "../controllers/bookmark.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getBookmarks);
router.post("/:id", authMiddleware, toggleBookmark);
router.get("/:id/check", authMiddleware, checkBookmark);

export default router;
