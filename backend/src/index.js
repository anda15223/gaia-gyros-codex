import express from "express";
import { getTodayShifts } from "./services/planday.js";
import { getTodayOrders } from "./services/pos.js";
import { getLiveOrders } from "./services/wolt.js";

const app = express();

// middleware
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// test api
app.get("/api/test", (req, res) => {
  res.json({ status: "ok" });
});

// planday shifts api
app.get("/api/planday/shifts", async (req, res) => {
  try {
    const shifts = await getTodayShifts();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Planday shifts",
      message: error.message
    });
  }
});

// online POS orders api
app.get("/api/pos/orders", async (req, res) => {
  try {
    const orders = await getTodayOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch POS orders",
      message: error.message
    });
  }
});

// wolt live orders api
app.get("/api/wolt/orders", async (req, res) => {
  try {
    const orders = await getLiveOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Wolt orders",
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

