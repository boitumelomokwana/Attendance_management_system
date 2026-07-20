const 
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB, sequelize } = require("./config/db");

connectDB();


sequelize.sync({ alter: true }).catch((err) => {
  console.error("Sequelize sync error:", err.message);
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
