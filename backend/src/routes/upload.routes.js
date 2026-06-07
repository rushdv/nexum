import { Router } from "express";
import { upload, uploadImage } from "../controllers/upload.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, upload.single("image"), uploadImage);

export default router;
