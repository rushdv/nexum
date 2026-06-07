import { Router } from "express";
import { register, login, getMe, googleAuth } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

// Google OAuth placeholder
router.get("/google", googleAuth);

export default router;
