import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Users from "../pages/Users";
import Attendance from "../pages/Attendace";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import MyAttendance from "../pages/MyAttendance";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import MainLayout from "../layout/MainLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/users" element={<Users />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
