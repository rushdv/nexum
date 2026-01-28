import { Router } from "express";
import NotificationModel from "../models/notification.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// get my notifications
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const notifications = await NotificationModel.findByUser(req.user.id);
    res.json(notifications);
  } catch (err) {
    next(err);
  }
});

// mark all as read
router.patch("/read", authMiddleware, async (req, res, next) => {
  try {
    await NotificationModel.markAsRead(req.user.id);
    res.json({ message: "Notifications marked as read" });
  } catch (err) {
    next(err);
  }
});

export default router;
