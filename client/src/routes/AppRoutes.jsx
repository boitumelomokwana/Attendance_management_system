
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Users from "../pages/Users";
import Attendance from "../pages/Attendace";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Students />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                       <Users/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                       <Attendance/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                       <Reports />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                       <Settings />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;