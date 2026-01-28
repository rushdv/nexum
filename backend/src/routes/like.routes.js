import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:id/like", authMiddleware, toggleLike);

export default router;
