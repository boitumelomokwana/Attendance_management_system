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
    FaSignOutAlt
} from "react-icons/fa";

function SideBar({ isOpen }) {

    const navigate = useNavigate();
    const { logout } = useAuth();

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

                <li>
                    <NavLink to="/users">
                        <FaUsers />
                        Users
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/students">
                        <FaUserGraduate />
                        Students
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/attendance">
                        <FaClipboardCheck />
                        Attendance
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports">
                        <FaChartBar />
                        Reports
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings">
                        <FaCog />
                        Settings
                    </NavLink>
                </li>

                <li onClick={handleLogout}>

                        <FaSignOutAlt />
                        Logout

                </li>

            </ul>

        </aside>

    )

}


export default SideBar;