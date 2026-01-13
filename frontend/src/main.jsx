import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      padding: 40,
      fontSize: 32,
      fontWeight: 800,
      background: "red",
      color: "white",
      minHeight: "100vh",
    }}
  >
    🔥 THIS IS A FORCED ROOT RENDER TEST 🔥
  </div>
);
