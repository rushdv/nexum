import { Router } from "express";
import { register, login, getMe, googleAuth } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

// Google OAuth Routes
router.get("/google", googleAuth);
router.get("/google/callback", (req, res) => {
    // This will be handled by passport or custom logic
    res.send("Google Callback reached! (Backend logic coming soon)");
});

export default router;
