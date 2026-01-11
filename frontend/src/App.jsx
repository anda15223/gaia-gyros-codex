import { useEffect, useRef, useState } from "react";

const colors = {
  bg: "#f5f7fa",
  card: "#ffffff",
  primary: "#1f7a8c",
  pos: "#3a86ff",
  wolt: "#ff006e",
  muted: "#6b7280"
};

const cardStyle = {
  background: colors.card,
  borderRadius: "14px",
  padding: "24px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

function formatDKK(value) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function RevenueChart({ pos, wolt }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const max = Math.max(pos, wolt, 1);
    const baseY = 160;
    const scale = 120 / max;

    // POS bar
    ctx.fillStyle = colors.pos;
    ctx.fillRect(80, baseY - pos * scale, 60, pos * scale);

    // Wolt bar
    ctx.fillStyle = colors.wolt;
    ctx.fillRect(180, baseY - wolt * scale, 60, wolt * scale);

    // Labels
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";

    ctx.fillText("POS", 110, 185);
    ctx.fillText("Wolt", 210, 185);

    ctx.fillText(formatDKK(pos), 110, baseY - pos * scale - 8);
    ctx.fillText(formatDKK(wolt), 210, baseY - wolt * scale - 8);
  }, [pos, wolt]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={200}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard/today")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div style={{ padding: 40 }}>Error: {error}</div>;
  if (!data) return <div style={{ padding: 40 }}>Loading dashboard…</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        padding: "40px",
        fontFamily: "system-ui, Arial, sans-serif"
      }}
    >
      <h1>GAIA GYROS</h1>
      <p style={{ color: colors.muted, marginBottom: "32px" }}>
        Today overview — {data.date}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        <div style={cardStyle}>
          <p style={{ color: colors.muted }}>Total Revenue</p>
          <h2 style={{ color: colors.primary }}>
            {formatDKK(data.revenue.total)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: colors.muted }}>Staff Scheduled</p>
          <h3>{data.labor.staffScheduled}</h3>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>Revenue Comparison</h2>
        <RevenueChart
          pos={data.revenue.pos}
          wolt={data.revenue.wolt}
        />
      </div>
    </div>
  );
}

export default App;
