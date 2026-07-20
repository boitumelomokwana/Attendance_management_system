export const ROLES = {
  ADMIN: "Admin",
  LECTURER: "Lecturer",
  STUDENT: "Student"
};

export const ATTENDANCE_STATUS = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
  LEAVE: "Leave"
};

export const STATUS_COLORS = {
  Present: { bg: "#dcfce7", color: "#166534" },
  Absent: { bg: "#fee2e2", color: "#b91c1c" },
  Late: { bg: "#fef3c7", color: "#92400e" },
  Leave: { bg: "#e0e7ff", color: "#3730a3" }
};

export const API_BASE_URL = "http://localhost:5000/api";
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
