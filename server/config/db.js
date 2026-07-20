const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "attendance_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      // Fail quickly when MySQL is offline so the API can use its fallback mode.
      connectTimeout: 5000,
      ...(process.env.DB_SSL === "true"
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {})
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 5000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
    return true;
  } catch (error) {
    console.warn("MySQL unavailable:", error.message);
    return false;
  }
};

module.exports = { sequelize, connectDB };
