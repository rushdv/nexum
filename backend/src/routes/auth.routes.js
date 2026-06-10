import { Router } from "express";
import { register, login, getMe, googleAuth, googleCallback, refreshToken, logout } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

export default router;
