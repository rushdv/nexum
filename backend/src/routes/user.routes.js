import { Router } from "express";
import {
  getMyProfile,
  getUserProfile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// logged-in user
router.get("/me", authMiddleware, getMyProfile);

// public profile
router.get("/:id", getUserProfile);

export default router;
