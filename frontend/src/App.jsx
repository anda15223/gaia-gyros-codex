import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  // MOCK DATA — temporary
  const data = {
    date: "2026-01-12",
    revenue: {
      pos: 3200,
      wolt: 1800,
      total: 5000,
    },
    orders: {
      pos: 74,
      wolt: 29,
    },
    labor: {
      staffScheduled: 6,
    },
  };

  const chartData = [
    { name: "POS", value: data.revenue.pos },
    { name: "Wolt", value: data.revenue.wolt },
  ];

  return (
    <div
      style={{
        padding: 32,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 4 }}>GAIA GYROS</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        Today overview — {data.date}
      </p>

      {/* KPI GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        <Kpi title="Total Revenue" value={`${data.revenue.total} DKK`} />
        <Kpi title="POS Revenue" value={`${data.revenue.pos} DKK`} />
        <Kpi title="Wolt Revenue" value={`${data.revenue.wolt} DKK`} />
        <Kpi title="POS Orders" value={data.orders.pos} />
        <Kpi title="Wolt Orders" value={data.orders.wolt} />
        <Kpi title="Staff Scheduled" value={data.labor.staffScheduled} />
      </div>

      {/* CHART */}
      <div style={{ marginTop: 40, height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

export default App;
