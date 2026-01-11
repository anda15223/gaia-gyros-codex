import { useEffect, useState } from "react";

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
  const max = Math.max(pos, wolt, 1);
  const height = 160;

  return (
    <svg width="100%" height={height + 40}>
      {/* POS bar */}
      <rect
        x="40"
        y={height - (pos / max) * height}
        width="80"
        height={(pos / max) * height}
        fill={colors.pos}
        rx="6"
      />
      <text x="80" y={height + 20} textAnchor="middle">
        POS
      </text>
      <text x="80" y={height - (pos / max) * height - 8} textAnchor="middle">
        {formatDKK(pos)}
      </text>

      {/* Wolt bar */}
      <rect
        x="160"
        y={height - (wolt / max) * height}
        width="80"
        height={(wolt / max) * height}
        fill={colors.wolt}
        rx="6"
      />
      <text x="200" y={height + 20} textAnchor="middle">
        Wolt
      </text>
      <text x="200" y={height - (wolt / max) * height - 8} textAnchor="middle">
        {formatDKK(wolt)}
      </text>
    </svg>
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

      {/* KPI CARDS */}
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

      {/* CHART */}
      <div style={{ ...cardStyle, marginBottom: "40px" }}>
        <h2>Revenue Comparison</h2>
        <RevenueChart
          pos={data.revenue.pos}
          wolt={data.revenue.wolt}
        />
      </div>

      {/* ORDERS */}
      <div style={{ ...cardStyle, marginBottom: "40px" }}>
        <h2>Orders</h2>
        <ul>
          <li>POS Orders: {data.orders.pos}</li>
          <li>Wolt Orders: {data.orders.wolt}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
