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
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading…</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ color: "red" }}>
        🔥 THIS TEXT PROVES THE UI IS LIVE 🔥
      </h1>

      <p>Total revenue: {data.revenue.total} DKK</p>
    </div>
  );
}

export default App;
