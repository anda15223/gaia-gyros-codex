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
  const height = 140;

  return (
    <div style={{ height: "220px", width: "100%" }}>
      <svg
        width="320"
        height="220"
        style={{ display: "block", margin: "0 auto" }}
      >
        {/* POS */}
        <rect
          x="60"
          y={height - (pos / max) * height}
          width="80"
          height={(pos / max) * height}
          fill={colors.pos}
          rx="6"
        />
        <text x="100" y="180" textAnchor="middle">
          POS
        </text>
        <text
          x="100"
          y={height - (pos / max) * height - 6}
          textAnchor="middle"
        >
          {formatDKK(pos)}
        </text>

        {/* Wolt */}
        <rect
          x="180"
          y={height - (wolt / max) * height}
          width="80"
          height={(wolt / max) * height}
          fill={colors.wolt}
          rx="6"
        />
        <text x="220" y="180" textAnchor="middle">
          Wolt
        </text>
        <text
          x="220"
          y={height - (wolt / max) * height - 6}
          textAnchor="middle"
        >
          {formatDKK(wolt)}
        </text>
      </svg>
    </div>
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

      <div style={{ ...cardStyle }}>
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
