import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard/today")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div style={{ padding: 40 }}>Loading…</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>GAIA GYROS</h1>
      <p>Date: {data.date}</p>

      {/* THIS MUST BE VISIBLE */}
      <div
        style={{
          marginTop: 40,
          height: "200px",
          background: "red",
          color: "white",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        IF YOU SEE THIS RED BOX, RENDERING WORKS
      </div>
    </div>
  );
}

export default App;
