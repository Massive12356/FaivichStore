import { Outlet } from "react-router-dom"; // Used to render nested routes within this layout
import DashNavBar from "../components/DashNavBar";
import SideBar from "../components/SideBar";
import { useState,useEffect } from "react";
import useUserStore from "../store/userStore";
import { apiGetUserDetails } from "../services/getUserDetails";

// DashboardLayout wraps all dashboard-related pages with a consistent Navbar and optional Sidebar
const DashboardLayout = ({onLogout}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { setUserDetails } = useUserStore(); // from zustand

  const fetchDetails = async () => {
    try {
      const response = await apiGetUserDetails();
      setUserDetails(response.data); // save globally from zustand
      setUserDetail(response.data); // save locally from zustand
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar component on the left side of the dashboard */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Right side of the layout: Navbar + main content */}
      <div className="flex flex-col flex-1">
        {/* Navbar stays at the top of every dashboard page */}
        <DashNavBar onLogout={onLogout} setSidebarOpen={setIsSidebarOpen} />

        {/* Main content area where nested routes will be rendered */}
        <main className="p-4 overflow-y-auto">
          <Outlet /> {/* This renders the current nested route component */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
