import Card from "../components/cards";
import Table from "../components/table";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

function Dashboard() {
    const { user } = useAuth();
    const role = user?.role || "Admin";

    const headers = [
        "Student No",
        "Name",
        "Status"
    ];

    const data = [
        ["22114587","John Smith","Present"],
        ["22114588","Sarah Jones","Absent"],
        ["22114589","Mike Brown","Present"],
        ["22114590","Emily White","Late"]
    ];

    const stats = [
        { title: "Students", value: "350" },
        { title: "Present", value: "320" },
        { title: "Absent", value: "30" },
        { title: "Attendance", value: "91%" }
    ];

    return (

        <>

            <h1 className="title">Dashboard</h1>
            <p style={{ marginBottom: "1rem" }}>Welcome back, {user?.firstName || "Admin"}. You are signed in as {role}.</p>

            <div className="cards">
                {stats.map((item) => (
                    <Card key={item.title} title={item.title} value={item.value} />
                ))}
            </div>

            <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px" }}>
                <h3>{role === "Student" ? "Your quick view" : "System overview"}</h3>
                <p>{role === "Student"
                    ? "You can review your attendance history and profile from the sidebar."
                    : "Admins and lecturers can manage students, attendance, users, and reports from the sidebar."}</p>
            </div>

            <div className="dashboard-grid">

                <div className="chart">

                    <h2>Attendance Overview</h2>

                    <div className="chart-box">
                        <div style={{ width: "100%", display: "flex", alignItems: "end", gap: "0.75rem", height: "220px" }}>
                            {[75, 88, 92, 81, 95].map((value, index) => (
                                <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                                    <div style={{ width: "100%", height: `${value}px`, background: index % 2 === 0 ? "#2563eb" : "#10b981", borderRadius: "8px 8px 0 0" }} />
                                    <span style={{ fontSize: "0.8rem" }}>{["Mon", "Tue", "Wed", "Thu", "Fri"][index]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="recent">

                    <h2>Recent Attendance</h2>

                    <Table
                        headers={headers}
                        data={data}
                    />

                </div>

            </div>

        </>

    );

}

export default Dashboard;
