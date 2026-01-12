import express from "express";
import cors from "cors";
<<<<<<< HEAD
import "dotenv/config";

import { fetchPlandayShifts } from "./services/planday.js";
import { fetchPOSOrders } from "./services/pos.js";
import { fetchWoltOrders } from "./services/wolt.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

=======

const app = express();
const PORT = process.env.PORT || 4000;

/**
 * =========================
 * MIDDLEWARE
 * =========================
 */

// Allow frontend on Vite dev server
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
>>>>>>> fb1c5c2 (Fix backend listen address for local dev)
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

<<<<<<< HEAD
async function safeCall(fn) {
  try {
    return await fn();
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

app.get("/api/dashboard/today", async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);

  const [posOrders, woltOrders, shifts] = await Promise.all([
    safeCall(fetchPOSOrders),
    safeCall(fetchWoltOrders),
    safeCall(fetchPlandayShifts),
  ]);

  const posRevenue = posOrders.reduce((s, o) => s + (o.total || 0), 0);
  const woltRevenue = woltOrders.reduce((s, o) => s + (o.total || 0), 0);

  res.json({
    date,
    revenue: {
      pos: posRevenue,
      wolt: woltRevenue,
      total: posRevenue + woltRevenue,
    },
    orders: {
      pos: posOrders.length,
      wolt: woltOrders.length,
    },
    labor: {
      staffScheduled: shifts.length,
    },
    woltLiveOrders: woltOrders,
  });
});

app.listen(PORT, "0.0.0.0", () => {
=======
/**
 * =========================
 * DASHBOARD AGGREGATION
 * =========================
 */
app.get("/api/dashboard/today", async (req, res) => {
  try {
    // Placeholder values until tokens are added
    const posRevenue = 0;
    const woltRevenue = 0;
    const posOrders = 0;
    const woltOrders = 0;
    const staffScheduled = 0;

    res.json({
      date: new Date().toISOString().slice(0, 10),
      revenue: {
        pos: posRevenue,
        wolt: woltRevenue,
        total: posRevenue + woltRevenue,
      },
      orders: {
        pos: posOrders,
        wolt: woltOrders,
      },
      labor: {
        staffScheduled,
      },
      woltLiveOrders: [],
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * =========================
 * PLACEHOLDER ENDPOINTS
 * =========================
 */
app.get("/api/planday/shifts", (req, res) => {
  res.json([]);
});

app.get("/api/pos/orders", (req, res) => {
  res.json([]);
});

app.get("/api/wolt/orders", (req, res) => {
  res.json([]);
});

/**
 * =========================
 * SERVER START
 * =========================
 */
app.listen(PORT, () => {
>>>>>>> fb1c5c2 (Fix backend listen address for local dev)
  console.log(`Backend running on port ${PORT}`);
});
