import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import likeRoutes from "./routes/like.routes.js";
import healthRoutes from "./routes/health.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import errorHandler from "./middlewares/error.middleware.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// routes
app.get("/", (req, res) => {
  res.send("Nexum backend running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/health", healthRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// error handler (always last)
app.use(errorHandler);

export default app;
