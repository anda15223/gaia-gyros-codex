import express from "express";
import cors from "cors";
import { getTodayShifts } from "./services/planday.js";
import { getTodayOrders } from "./services/pos.js";
import { getLiveOrders } from "./services/wolt.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// helpers
async function safeCall(fn, fallback) {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

// health
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// test
app.get("/api/test", (req, res) => {
  res.json({ status: "ok" });
});

// unified dashboard
app.get("/api/dashboard/today", async (req, res) => {
  const [shifts, posOrders, woltOrders] = await Promise.all([
    safeCall(() => getTodayShifts(), []),
    safeCall(() => getTodayOrders(), []),
    safeCall(() => getLiveOrders(), [])
  ]);

  const posRevenue = Array.isArray(posOrders)
    ? posOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    : 0;

  const woltRevenue = Array.isArray(woltOrders)
    ? woltOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    : 0;

  res.json({
    date: new Date().toISOString().slice(0, 10),
    revenue: {
      pos: posRevenue,
      wolt: woltRevenue,
      total: posRevenue + woltRevenue
    },
    orders: {
      pos: Array.isArray(posOrders) ? posOrders.length : 0,
      wolt: Array.isArray(woltOrders) ? woltOrders.length : 0
    },
    labor: {
      staffScheduled: Array.isArray(shifts) ? shifts.length : 0
    },
    woltLiveOrders: Array.isArray(woltOrders) ? woltOrders : []
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
