import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard/today")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;

  const box = (bg) => ({
    background: bg,
    color: "white",
    padding: "24px",
    borderRadius: "12px",
    fontSize: "26px",
    fontWeight: "800",
  });

  return (
    <div style={{ padding: 40, background: "#eee", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32 }}>INLINE STYLE TEST</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        <div style={box("green")}>REVENUE {data.revenue.total}</div>
        <div style={box("blue")}>POS {data.orders.pos}</div>
        <div style={box("orange")}>WOLT {data.orders.wolt}</div>
        <div style={box("gray")}>STAFF {data.labor.staffScheduled}</div>
      </div>

      <div style={{ background: "white", marginTop: 40, padding: 20 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "POS", revenue: data.revenue.pos },
              { name: "Wolt", revenue: data.revenue.wolt },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="black" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
