import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// routes
app.get("/", (req, res) => {
  res.send("Nexum backend running 🚀");
});
app.use("/health", healthRoutes);


app.use("/api/auth", authRoutes);

// error handler (always last)
app.use(errorHandler);

export default app;
