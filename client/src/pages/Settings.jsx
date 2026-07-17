import { useAuth } from "../context/AuthContext";

function Settings() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Settings</h1>
      <p>Configure account and system preferences.</p>
      <div style={{ marginTop: "1rem", background: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <p><strong>Current user:</strong> {user?.firstName || "Admin"}</p>
        <p><strong>Role:</strong> {user?.role || "Admin"}</p>
        <button style={{ marginTop: "0.75rem", padding: "0.6rem 1rem", borderRadius: "6px", border: "none", background: "#2563eb", color: "#fff" }}>Save Settings</button>
      </div>
    </div>
  );
}

export default Settings;