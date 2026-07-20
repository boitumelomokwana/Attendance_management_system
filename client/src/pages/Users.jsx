import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const demoUsers = [
      { _id: "admin-demo", firstName: "Admin", lastName: "User", email: "admin@attendance.com", role: "Admin" },
      { _id: "lecturer-demo", firstName: "Jane", lastName: "Lecturer", email: "lecturer@attendance.com", role: "Lecturer" },
      { _id: "student-demo", firstName: "John", lastName: "Student", email: "student@attendance.com", role: "Student" }
    ];
    setUsers([...demoUsers, ...storedUsers]);
  }, []);

  function toggleRole(targetUser) {
    if (user?.role !== "Admin") return;

    const updatedUsers = users.map((item) => item.email === targetUser.email ? { ...item, role: item.role === "Admin" ? "Lecturer" : "Admin" } : item);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers.filter((item) => item.email !== "admin@attendance.com" && item.email !== "lecturer@attendance.com" && item.email !== "student@attendance.com")));
  }

  return (
    <div>
      <h1>Users</h1>
      <p>Manage system users and roles.</p>
      <p style={{ marginTop: "0.5rem" }}>Signed in as {user?.firstName || "Admin"} ({user?.role || "Admin"}).</p>
      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Role</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.email}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{item.firstName} {item.lastName}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{item.role}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{item.email}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                {user?.role === "Admin" && item.role !== "Admin" && (
                  <button onClick={() => toggleRole(item)} style={{ padding: "0.4rem 0.7rem", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
                    Make {item.role === "Lecturer" ? "Admin" : "Lecturer"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;