import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import likeRoutes from "./routes/like.routes.js";
import healthRoutes from "./routes/health.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import errorHandler from "./middlewares/error.middleware.js";
import notificationRoutes from "./routes/notification.routes.js";
import followRoutes from "./routes/follow.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

// rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many attempts, please try again later" },
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));


// routes
app.get("/", (req, res) => {
  res.send("Nexum backend running 🚀");
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/health", healthRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/upload", uploadRoutes);

// error handler (always last)
app.use(errorHandler);

export default app;
