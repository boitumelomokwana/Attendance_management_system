const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB, sequelize } = require("./config/db");

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/students", require("./routes/Student"));

app.use("/api/attendance", require("./routes/attendanceRoutes"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect once, then ensure tables exist. `alter: true` was previously run on
// every boot, which can take a long time and may modify an existing database.
// The server deliberately starts first so its health endpoint remains responsive.
connectDB().then((connected) => {
  if (!connected) return;

  sequelize.sync().catch((err) => {
    console.error("Sequelize sync error:", err.message);
  });
});
