import { useEffect, useState } from "react";

const colors = {
  bg: "#f5f7fa",
  card: "#ffffff",
  primary: "#1f7a8c",
  secondary: "#3a86ff",
  muted: "#6b7280"
};

const cardStyle = {
  background: colors.card,
  borderRadius: "14px",
  padding: "24px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  minWidth: "220px"
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

  if (error) {
    return <div style={{ padding: 40 }}>Error: {error}</div>;
  }

  if (!data) {
    return <div style={{ padding: 40 }}>Loading dashboard…</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        padding: "40px",
        fontFamily: "system-ui, Arial, sans-serif"
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>GAIA GYROS</h1>
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
          <p style={{ color: colors.muted }}>POS Revenue</p>
          <h3>{formatDKK(data.revenue.pos)}</h3>
        </div>

        <div style={cardStyle}>
          <p style={{ color: colors.muted }}>Wolt Revenue</p>
          <h3>{formatDKK(data.revenue.wolt)}</h3>
        </div>

        <div style={cardStyle}>
          <p style={{ color: colors.muted }}>Staff Scheduled</p>
          <h3>{data.labor.staffScheduled}</h3>
        </div>
      </div>

      {/* ORDERS */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Orders</h2>
        <ul>
          <li>POS Orders: {data.orders.pos}</li>
          <li>Wolt Orders: {data.orders.wolt}</li>
        </ul>
      </div>

      {/* WOLT LIVE */}
      <div>
        <h2>Live Wolt Orders</h2>
        {data.woltLiveOrders.length === 0 ? (
          <p style={{ color: colors.muted }}>No live orders</p>
        ) : (
          <ul>
            {data.woltLiveOrders.map((order, idx) => (
              <li key={idx}>{JSON.stringify(order)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
