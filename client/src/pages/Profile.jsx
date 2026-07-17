import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Manage your personal information here.</p>
      <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role || "Student"}</p>
      </div>
    </div>
  );
}

export default Profile;
