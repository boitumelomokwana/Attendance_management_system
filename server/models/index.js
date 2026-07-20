const User = require("./User");
const Student = require("./Student");
const Attendance = require("./Attendance");

// Associations
User.hasMany(Attendance, { foreignKey: "markedById", as: "markedAttendances" });
Attendance.belongsTo(User, { foreignKey: "markedById", as: "markedBy" });

Student.hasMany(Attendance, { foreignKey: "studentId", as: "attendances" });
Attendance.belongsTo(Student, { foreignKey: "studentId", as: "student" });

module.exports = { User, Student, Attendance, sequelize: require("../config/db").sequelize };
