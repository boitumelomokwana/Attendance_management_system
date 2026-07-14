import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import AppRoutes from "../routes/AppRoutes";
import "./MainLayout.css";

import { useState } from "react";

function MainLayout() {

    const [isSidebarOpen,setIsSidebarOpen] = useState(true);

    const toggleSidebar =()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }

  return (
    <>
      <header className="nav-bar">
        <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </header>

      <div className="content-wrapper">
        <SideBar isOpen={isSidebarOpen} />

        <main className="main-content">
          <AppRoutes />
        </main>
      </div>

      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default MainLayout;