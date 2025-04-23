import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBox,
  FiPlus,
  FiFileText,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import logo from '../assets/logo.png'

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
  { name: "Published Products", path: "/dashboard/vendorAds", icon: <FiBox /> },
  { name: "Add New Product ", path: "/dashboard/createAd", icon: <FiPlus /> },
  { name: "Orders", path: "/dashboard/orders", icon: <FiFileText /> },
];

const SideBar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-15" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-full bg-[#67216D] text-white p-4 transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex flex-col w-64`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-20 md:w-35 ">
            <img src={logo}  alt="logo" className="rounded-lg" />
          </div>
          {/* <h1 className="text-xl font-bold font-[play]">Dashboard</h1> */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white text-2xl"
          >
            <FiX />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-4 mt-10">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                whileTap={{ scale: 0.95 }}
                className={`relative group flex items-center gap-4 cursor-pointer p-2 rounded-md transition-all duration-200 font-[play] ${
                  isActive
                    ? "bg-white text-[#67216D] font-semibold"
                    : "hover:bg-[#561256]"
                }`}
              >
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  <span className="text-xl">{item.icon}</span>
                </Link>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg"
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}

          {/* Logout */}
          <Link to={'/'}>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer p-2 rounded-md hover:bg-[#561256] transition-all mt-8"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            >
            <FiLogOut className="text-xl" />
            <span className="text-lg">Logout</span>
          </motion.div>
            </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
