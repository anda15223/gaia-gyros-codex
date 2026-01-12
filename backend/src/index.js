import express from "express";
import cors from "cors";
import "dotenv/config";

import { fetchPlandayShifts } from "./services/planday.js";
import { fetchPOSOrders } from "./services/pos.js";
import { fetchWoltOrders } from "./services/wolt.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

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
  console.log(`Backend running on port ${PORT}`);
});
