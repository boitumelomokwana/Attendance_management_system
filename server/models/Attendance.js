const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Students",
        key: "id"
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("Present", "Absent", "Late", "Leave"),
      allowNull: false
    },
    markedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id"
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = Attendance;
