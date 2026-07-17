import { useAuth } from "../context/AuthContext";

function Reports() {
  const { user } = useAuth();

  const reportCards = [
    { title: "Present", value: "320" },
    { title: "Absent", value: "30" },
    { title: "Late", value: "18" },
    { title: "Role", value: user?.role || "Admin" }
  ];

  return (
    <div>
      <h1>Reports</h1>
      <p>Generate and view attendance reports for your classes or institution.</p>
      <div style={{ marginTop: "1rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {reportCards.map((card) => (
          <div key={card.title} style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
            <h3>{card.title}</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "0.5rem" }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <h3>Weekly Summary</h3>
        <p>Attendance remained strong this week with a 91% average across all classes.</p>
      </div>
    </div>
  );
}

export default Reports;