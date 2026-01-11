import express from "express";

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
