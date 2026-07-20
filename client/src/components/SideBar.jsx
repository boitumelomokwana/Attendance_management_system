import "../styles/SideBar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
    FaHome,
    FaUsers,
    FaUserGraduate,
    FaClipboardCheck,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaUser,
    FaHistory
} from "react-icons/fa";

function SideBar({ isOpen }) {

    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const role = user?.role || "Admin";

    function handleLogout(){

        logout();

        navigate("/login");

    }

    return(

        <aside className={`side-bar ${isOpen ? "" : "collapsed"}`}>

            <ul>
                <li>
                    <NavLink to="/">
                        <FaHome />
                        Dashboard
                    </NavLink>
                </li>

                {(role === "Admin" || role === "Lecturer") && (
                    <li>
                        <NavLink to="/students">
                            <FaUserGraduate />
                            Students
                        </NavLink>
                    </li>
                )}

                {role === "Admin" && (
                    <li>
                        <NavLink to="/users">
                            <FaUsers />
                            Users
                        </NavLink>
                    </li>
                )}

                {(role === "Admin" || role === "Lecturer") && (
                    <li>
                        <NavLink to="/attendance">
                            <FaClipboardCheck />
                            Attendance
                        </NavLink>
                    </li>
                )}

                {(role === "Admin" || role === "Lecturer") && (
                    <li>
                        <NavLink to="/reports">
                            <FaChartBar />
                            Reports
                        </NavLink>
                    </li>
                )}

                {role === "Student" && (
                    <li>
                        <NavLink to="/my-attendance">
                            <FaHistory />
                            My Attendance
                        </NavLink>
                    </li>
                )}

                <li>
                    <NavLink to="/profile">
                        <FaUser />
                        Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings">
                        <FaCog />
                        Settings
                    </NavLink>
                </li>

                <li>
                    <button onClick={handleLogout} className="logout-btn">
                        <FaSignOutAlt />
                        Logout
                    </button>
                </li>
            </ul>

        </aside>

    )

}


export default SideBar;