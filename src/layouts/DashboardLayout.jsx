import { Outlet } from "react-router-dom"; // Used to render nested routes within this layout
import DashNavBar from "../components/DashNavBar";
import SideBar from "../components/SideBar";
import { useState } from "react";

// DashboardLayout wraps all dashboard-related pages with a consistent Navbar and optional Sidebar
const DashboardLayout = ({onLogout}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Sidebar component on the left side of the dashboard */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Right side of the layout: Navbar + main content */}
      <div className="flex flex-col flex-1">
        {/* Navbar stays at the top of every dashboard page */}
        <DashNavBar
          onLogout={onLogout}
          setSidebarOpen={setIsSidebarOpen}
          
        />

        {/* Main content area where nested routes will be rendered */}
        <main className="p-4 overflow-y-auto">
          <Outlet /> {/* This renders the current nested route component */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
