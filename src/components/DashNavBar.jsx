import React, { useState, useEffect } from "react";
import { FaCog, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiSearch } from "react-icons/fi"; // Importing search icon
import ProfPic from '../assets/mintah.jpeg'

const DashNavBar = ({ profileImage, setSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // time  function 
    const updateClock = () => {
      const now = new Date();
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedTime = now.toLocaleString("en-US", options);
      setCurrentTime(formattedTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);//function that updates the time
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[95%] md:w-[98%] bg-white text-white px-3 py-1 flex justify-between items-center shadow-md m-2 rounded-lg">
      {/* Hamburger menu for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-[#283144] text-2xl lg:hidden mr-4"
      >
        <FiMenu />
      </button>

      {/* Logo */}
      <div className="text-[12px] text-[#283144] md:text-2xl font-bold flex font-[play]">
        <span className="hidden md:block mr-2">Vendor</span>Dashboard
      </div>

      {/* Right-side content: profile → search → time */}
      <div className="flex items-center gap-4 ">
        {/* Profile Dropdown */}
        <div className="relative">
          <img
            src={ProfPic || "/default-avatar.png"}
            alt="Profile"
            className="w-7 md:w-10 h-7 md:h-10 rounded-full object-cover cursor-pointer border-2 border-white"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          />

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50"
              >
                <div className="flex flex-col py-2">
                  {/* <Link
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer font-[play]"
                    onClick={() => setIsProfileOpen(false)}
                    to="/settings"
                  >
                    <FaCog className="mr-2 " />
                    Settings
                  </Link> */}
                  <Link
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer font-[play]"
                    onClick={() => setIsProfileOpen(false)}
                    to="/update-profile"
                  >
                    <FaUserEdit className="mr-2 " />
                    Update Picture
                  </Link>

                  <Link to={'/'}>
                  <div
                    className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer font-[play]"
                    >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </div>
                    </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Bar with Search Icon */}
        <div className="hidden md:flex items-center bg-[#EAE8E8] px-3 py-1 rounded-md w-64">
          <FiSearch className="text-[#283144] text-lg mr-2" />{" "}
          {/* Search Icon */}
          <input
            type="text"
            placeholder="Search Products"
            className="bg-transparent text-[#283144] w-full font-[play] text-[15px] focus:outline-none placeholder-gray-600"
          />
        </div>

        {/* Time Display - Only on desktop */}
        <span className="hidden md:block text-[#283144] text-sm font-[play]">
          {currentTime}
        </span>
      </div>
    </div>
  );
};

export default DashNavBar;
