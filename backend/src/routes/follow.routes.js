import { Router } from "express";
import { toggleFollow, getFollowStatus, getFollowers, getFollowing } from "../controllers/follow.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:id", authMiddleware, toggleFollow);
router.get("/:id/status", authMiddleware, getFollowStatus);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

export default router;
