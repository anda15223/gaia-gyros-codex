import { useEffect, useState } from "react";
import "./App.css";
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
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!data) {
    return <div className="loading">Loading…</div>;
  }

  const chartData = [
    { name: "POS", revenue: data.revenue.pos },
    { name: "Wolt", revenue: data.revenue.wolt },
  ];

  return (
    <div className="dashboard">
      <h1>Today’s Dashboard</h1>

      <div className="kpis">
        <div className="kpi">
          <h3>Total Revenue</h3>
          <p>{data.revenue.total} DKK</p>
        </div>

        <div className="kpi">
          <h3>POS Orders</h3>
          <p>{data.orders.pos}</p>
        </div>

        <div className="kpi">
          <h3>Wolt Orders</h3>
          <p>{data.orders.wolt}</p>
        </div>

        <div className="kpi">
          <h3>Staff Scheduled</h3>
          <p>{data.labor.staffScheduled}</p>
        </div>
      </div>

      <div className="panel">
        <h2>Revenue Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="panel">
        <h2>Live Wolt Orders</h2>
        {data.woltLiveOrders.length === 0 ? (
          <p>No live orders</p>
        ) : (
          <ul>
            {data.woltLiveOrders.map((order) => (
              <li key={order.id}>
                {order.customerName} — {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
