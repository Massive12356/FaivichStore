import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/user/Landing";
import SingleAd from "./pages/dashboard/SingleAd";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Adverts from "./pages/user/Adverts";
import VendorAds from "./pages/dashboard/VendorAds";
import CreateAd from "./pages/dashboard/CreateAd";
import UpdateAd from "./pages/dashboard/UpdateAd";
import Orders from "./pages/dashboard/Orders";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SingleOrderDetails from "./pages/dashboard/SingleOrderDetails";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";
import SingleAdvert from "./pages/user/SingleAdvert";
import FaqSection from "./components/FaqSection";
import CheckOut from "./pages/user/CheckOut";
import ScrollToTop from "./components/ScrollToTop";
import UpdateProfile from "./pages/dashboard/UpdateProfile";

import useProductStore from "./store/productStore"; // zustand Product store
import { useOrderStore } from "./store/OrderStore";
import useUserStore from "./store/userStore";
import MaintenancePage from "./components/MaintenancePage";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "false";

  const fetchProducts = useProductStore((state) => state.fetchProducts); // get my products from my store here

  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    // Just a debug log to confirm userId is available
    console.log("Anonymous User ID:", userId);
  }, [userId]);

  // run it through useEffect
  useEffect(() => {
    fetchProducts(); // fetch products once when app mounts
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  if(isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      {/* notification management */}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#4caf50", // Green for success
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#4caf50",
            },
          },
          error: {
            style: {
              background: "#f44336", // Red for error
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#f44336",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />

      {/* routes management */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* navigation for users */}
          <Route path="/" element={<RootLayout />}>
            <Route index={true} element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="adverts" element={<Adverts />} />
            <Route path="adverts/:id" element={<SingleAdvert />} />
            <Route path="/faqs" element={<FaqSection />} />
            <Route path="/checkout" element={<CheckOut />} />

            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* navigation for vendor */}
          <Route path="/faivichRoom" element={<DashboardLayout />}>
            <Route index={true} element={<Overview />} />
            <Route path="vendorAds" element={<VendorAds />} />
            <Route path="vendorAds/:id" element={<SingleAd />} />
            <Route path="createAd" element={<CreateAd />} />
            <Route path="updateAd/:id" element={<UpdateAd />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<SingleOrderDetails />} />
            <Route path="updateProfile" element={<UpdateProfile />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <SpeedInsights/>
    </>
  );
}

export default App;
