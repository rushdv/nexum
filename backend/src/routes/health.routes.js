import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // simple DB ping
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      server: "running",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      server: "running",
      database: "disconnected",
    });
  }
});

export default router;
