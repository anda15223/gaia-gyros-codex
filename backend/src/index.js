import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/dashboard/today", (req, res) => {
  res.json({
    date: new Date().toISOString().slice(0, 10),
    revenue: {
      pos: 12000,
      wolt: 4500,
      total: 16500,
    },
    orders: {
      pos: 86,
      wolt: 23,
    },
    labor: {
      staffScheduled: 7,
    },
    woltLiveOrders: [],
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
