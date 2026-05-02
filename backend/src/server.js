import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import "./config/env.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import passport from "./config/passport.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

app.set("trust proxy", 1);

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(passport.initialize());
app.use(rateLimiter);



app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res
      .status(503)
      .send("Frontend build not found. Run `npm run build` before starting the server.");
  });
}

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    const startedPort = server.address && server.address().port;
    console.log("Server started on PORT:", startedPort || PORT);
  });

  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Attempting a fallback port...`);
      const fallback = app.listen(0, () => {
        console.log("Server started on fallback PORT:", fallback.address().port);
      });
      fallback.on("error", (fallbackErr) => {
        console.error("Fallback server failed to start:", fallbackErr);
        process.exit(1);
      });
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });
});
