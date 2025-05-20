import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
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
  { name: "OverView", path: "/dashboard", icon: <FiHome /> },
  { name: "Add New Product ", path: "/dashboard/createAd", icon: <FiPlus /> },
  { name: "Published Products", path: "/dashboard/vendorAds", icon: <FiBox /> },
  { name: "Orders", path: "/dashboard/orders", icon: <FiFileText /> },
];

const SideBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleLogout1 = () => {
    setShowModal(true);
  };

  const handleLogout2 = () => {
    setShowModal(false);
    navigate('/');
  };
  const cancelDelete = ()=>{
    navigate('/dashboard')
    setShowModal(false);
  }

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
            <img src={logo} alt="logo" className="rounded-lg" />
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

          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer p-2 rounded-md hover:bg-[#561256] transition-all mt-8"
            onClick={() => {
              handleLogout1();
              setIsOpen(false);
            }}
          >
            <FiLogOut className="text-xl" />
            <span className="text-lg">Logout</span>
          </motion.div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-[#283144] mb-4">
              Are you sure you want to Log Out?
            </h3>
            <div className="flex justify-end gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={cancelDelete}
                className="bg-gray-300 text-[#283144] px-4 py-2 rounded-lg"
              >
                Cancel
              </motion.button>
              
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout2}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Yes, Log Out
                </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SideBar;
