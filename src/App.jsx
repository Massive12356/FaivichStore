import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import MaintenancePage from "./components/MaintenancePage";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Layouts and static components (keep eager import)
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Zustand Stores
import useProductStore from "./store/productStore";
import { useOrderStore } from "./store/OrderStore";
import Loader from "./components/Loader";

// Lazy-loaded page components
const Landing = lazy(() => import("./pages/user/Landing"));
const SingleAd = lazy(() => import("./pages/dashboard/SingleAd"));
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const Adverts = lazy(() => import("./pages/user/Adverts"));
const VendorAds = lazy(() => import("./pages/dashboard/VendorAds"));
const CreateAd = lazy(() => import("./pages/dashboard/CreateAd"));
const UpdateAd = lazy(() => import("./pages/dashboard/UpdateAd"));
const Orders = lazy(() => import("./pages/dashboard/Orders"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const SingleOrderDetails = lazy(() =>
  import("./pages/dashboard/SingleOrderDetails")
);
const Contact = lazy(() => import("./pages/user/Contact"));
const About = lazy(() => import("./pages/user/About"));
const SingleAdvert = lazy(() => import("./pages/user/SingleAdvert"));
const FaqSection = lazy(() => import("./components/FaqSection"));
const CheckOut = lazy(() => import("./pages/user/CheckOut"));
const UpdateProfile = lazy(() => import("./pages/dashboard/UpdateProfile"));

function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "false";

  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      {/* Toaster Configuration */}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#4caf50",
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
              background: "#f44336",
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

      {/* Routing with Lazy Loading */}
      <BrowserRouter>
        <ScrollToTop />
        <Suspense
          fallback={<Loader/>}
        >
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="adverts" element={<Adverts />} />
              <Route path="adverts/:id" element={<SingleAdvert />} />
              <Route path="faqs" element={<FaqSection />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
            </Route>

            {/* Dashboard Routes */}
            <Route path="/faivichRoom" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
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
        </Suspense>
      </BrowserRouter>
      <SpeedInsights />
    </>
  );
}

export default App;
