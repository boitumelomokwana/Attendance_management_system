import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getAttendance, updateAttendance } from "../services/attendanceService";

function Attendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttendance()
      .then(setRecords)
      .catch(() => {
        const saved = localStorage.getItem("attendanceRecords");
        setRecords(
          saved
            ? JSON.parse(saved)
            : [
                { id: 1, student: { firstName: "John", lastName: "Smith" }, status: "Present", date: new Date().toISOString().split("T")[0] },
                { id: 2, student: { firstName: "Mary", lastName: "Brown" }, status: "Absent", date: new Date().toISOString().split("T")[0] },
                { id: 3, student: { firstName: "David", lastName: "Jones" }, status: "Late", date: new Date().toISOString().split("T")[0] }
              ]
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(id, newStatus) {
    const updated = records.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRecords(updated);
    localStorage.setItem("attendanceRecords", JSON.stringify(updated));

    try {
      await updateAttendance(id, { status: newStatus });
      toast.success("Attendance updated");
    } catch {
      toast.info("Updated locally (backend unavailable)");
    }
  }

  return (
    <div>
      <h1>Attendance</h1>
      <p>
        {user?.firstName || "Lecturer"} can mark and update student attendance.
      </p>

      {loading ? (
        <p>Loading attendance records...</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "1rem",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                Student
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                Date
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                Status
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  {record.student
                    ? `${record.student.firstName || ""} ${record.student.lastName || ""}`
                    : record.name || `Student #${record.studentId}`}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  {record.date || "—"}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  <span style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "999px",
                    background: record.status === "Absent" ? "#fee2e2" : record.status === "Late" ? "#fef3c7" : record.status === "Leave" ? "#e0e7ff" : "#dcfce7",
                    color: record.status === "Absent" ? "#b91c1c" : record.status === "Late" ? "#92400e" : record.status === "Leave" ? "#3730a3" : "#166534"
                  }}>
                    {record.status}
                  </span>
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  <select
                    value={record.status}
                    onChange={(e) => handleStatusChange(record.id, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Leave">Leave</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attendance;
