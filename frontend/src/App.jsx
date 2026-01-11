import { useEffect, useState } from "react";

const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  minWidth: "220px"
};

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
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f4f6f8",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>GAIA GYROS — Today</h1>

      {/* KPI CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px"
        }}
      >
        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>
            {data.revenue.total}
          </p>
        </div>

        <div style={cardStyle}>
          <h3>POS Revenue</h3>
          <p style={{ fontSize: "24px" }}>{data.revenue.pos}</p>
        </div>

        <div style={cardStyle}>
          <h3>Wolt Revenue</h3>
          <p style={{ fontSize: "24px" }}>{data.revenue.wolt}</p>
        </div>

        <div style={cardStyle}>
          <h3>Staff Scheduled</h3>
          <p style={{ fontSize: "24px" }}>
            {data.labor.staffScheduled}
          </p>
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
          <p>No live orders</p>
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
