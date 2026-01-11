import express from "express";
import { getTodayShifts } from "./services/planday.js";

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
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch Planday shifts",
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
