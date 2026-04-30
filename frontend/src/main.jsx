import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "glass-panel text-slate-100",
          style: {
            background: "rgba(15, 23, 19, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#f8fafc",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
