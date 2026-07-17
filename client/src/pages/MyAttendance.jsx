import { useAuth } from "../context/AuthContext";

function MyAttendance() {
  const { user } = useAuth();

  const attendance = [
    { date: "2026-07-01", status: "Present", percentage: "100%" },
    { date: "2026-07-02", status: "Absent", percentage: "50%" },
    { date: "2026-07-03", status: "Late", percentage: "75%" }
  ];

  return (
    <div>
      <h1>My Attendance</h1>
      <p>Hello {user?.firstName || "Student"}, here is your attendance history.</p>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Date</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Status</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((item) => (
            <tr key={item.date}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{item.date}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{item.status}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAttendance;
