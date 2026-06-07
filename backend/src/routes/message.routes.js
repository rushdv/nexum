import { Router } from "express";
import { getConversations, getOrCreateConversation, getMessages, sendMessage } from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getConversations);
router.get("/:id", authMiddleware, getMessages);
router.post("/:id", authMiddleware, sendMessage);
router.post("/user/:id", authMiddleware, getOrCreateConversation);

export default router;
