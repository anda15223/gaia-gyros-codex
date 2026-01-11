import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

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

  const chartData = [
    { name: "POS", revenue: data.revenue.pos },
    { name: "Wolt", revenue: data.revenue.wolt }
  ];

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
      <div style={{ ...cardStyle, height: "320px" }}>
        <h2>Revenue Comparison</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatDKK} />
            <Tooltip formatter={formatDKK} />
            <Bar dataKey="revenue" fill={colors.primary} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
