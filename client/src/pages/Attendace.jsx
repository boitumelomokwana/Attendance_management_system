import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Attendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "John Smith", status: "Present" },
      { id: 2, name: "Mary Brown", status: "Absent" },
      { id: 3, name: "David Jones", status: "Late" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(records));
  }, [records]);

  function handleStatusChange(id, status) {
    setRecords((current) => current.map((student) => student.id === id ? { ...student, status } : student));
  }

  return (
    <div>
      <h1>Attendance</h1>
      <p>Lecturer {user?.firstName || "Jane"} can mark and update student attendance.</p>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Student</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Status</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((student) => (
            <tr key={student.id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{student.name}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{student.status}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                <select value={student.status} onChange={(e) => handleStatusChange(student.id, e.target.value)}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;