import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", (userId) => {
    if (userId) socket.join(`user:${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.set("io", io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
