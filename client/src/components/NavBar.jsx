import "../styles/NavBar.css";
import { FaBell, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";


function NavBar({ toggleSidebar, isSidebarOpen }) {

  const { user } = useAuth();

  return (
    <nav className="navbar">

      <div className="left">
        {isSidebarOpen ? (
          <FaTimes className="menu-icon" onClick={toggleSidebar} />
        ) : (
          <FaBars className="menu-icon" onClick={toggleSidebar} />
        )}
        <h2>Attendance Management System</h2>
      </div>

      <div className="right">

        <input
          type="text"
          placeholder="Search..."
          className="search"
        />

        <FaBell className="icon" />

        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span>{user?.firstName}</span>
        </div>

      </div>

    </nav>
  );
}



export default NavBar;