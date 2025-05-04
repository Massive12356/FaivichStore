import React, { useEffect, useState } from "react";
import {
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Overview = () => {
  const [username, setUsername] = useState("Vendor");
  const [stockCount, setStockCount] = useState(0);

  // State to track the visibility of tooltips for each card
  const [tooltipVisible, setTooltipVisible] = useState({
    totalItems: false,
    totalOrders: false,
    dailyPurchases: false,
    totalSuccessfulPurchase: false,
  });

  useEffect(() => {
    setUsername("Edward Mintah");
    setStockCount(152);
  }, []);

  // Function to toggle the tooltip visibility for each card
  const toggleTooltip = (card) => {
    setTooltipVisible((prevState) => ({
      ...prevState,
      [card]: !prevState[card], // Toggle the visibility of the specific card's tooltip
    }));
  };

  // Handler for mouse hover events on desktop
  const handleMouseEnter = (card) => {
    if (!isTouchDevice()) {
      setTooltipVisible((prevState) => ({
        ...prevState,
        [card]: true, // Show tooltip on hover
      }));
    }
  };

  // Handler for mouse leave events on desktop
  const handleMouseLeave = (card) => {
    if (!isTouchDevice()) {
      setTooltipVisible((prevState) => ({
        ...prevState,
        [card]: false, // Hide tooltip on hover out
      }));
    }
  };

  // Utility function to detect if the device is a touch device (mobile)
  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  return (
    <div className="px-4 py-6 bg-[#F9F7F7] min-h-screen">
      {/* Greeting Section */}
      <motion.div
        className="bg-[#FFE2D5] p-6 rounded-2xl mb-6"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold font-[play] text-[#F50057]">
          Hello, {username}
        </h2>
        <p className="text-sm text-[#F50057] font-[play] mt-1">
          Here's a quick glance at your dashboard performance today.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Items in Stock */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            delay: 0.5,
          }}
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px] relative"
        >
          <div className="bg-[#FFE2D5] text-[#F50057] p-4 rounded-full text-3xl">
            <FiBox />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-[play]">Total Products</p>
            <h3 className="text-xl font-bold text-[#283144] font-[play]">
              {stockCount}
            </h3>
          </div>

          {/* Info Icon and Tooltip */}
          <div
            className="absolute top-3 right-3 group"
            onMouseEnter={() => handleMouseEnter("totalItems")}
            onMouseLeave={() => handleMouseLeave("totalItems")}
          >
            <FiInfo
              className="text-gray-400 hover:text-[#F50057] cursor-pointer"
              onClick={() => toggleTooltip("totalItems")} // Toggle visibility for this card
            />
            {/* Tooltip for Total Items in Stock */}
            <div
              className={`absolute ${
                tooltipVisible.totalItems ? "block" : "hidden"
              } w-44 text-[13px] text-white bg-[#67216D] p-2 rounded shadow-lg z-10 -top-2 right-10`}
            >
              This shows the total number of products currently in your store.
            </div>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            delay: 0.8,
          }}
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px] relative"
        >
          <div className="bg-[#FFE2D5] text-[#F50057] p-4 rounded-full text-3xl">
            <FiShoppingCart />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-[play]">Total Orders</p>
            <h3 className="text-xl font-bold text-[#283144] font-[play]">85</h3>
          </div>

          {/* Info Icon and Tooltip */}
          <div
            className="absolute top-3 right-3 group"
            onMouseEnter={() => handleMouseEnter("totalOrders")}
            onMouseLeave={() => handleMouseLeave("totalOrders")}
          >
            <FiInfo
              className="text-gray-400 hover:text-[#F50057] cursor-pointer"
              onClick={() => toggleTooltip("totalOrders")} // Toggle visibility for this card
            />
            {/* Tooltip for Total Orders */}
            <div
              className={`absolute ${
                tooltipVisible.totalOrders ? "block" : "hidden"
              } w-44 text-[13px] text-white bg-[#67216D] p-2 rounded shadow-lg z-10 -top-2 right-10`}
            >
              This shows the total number of orders placed today.
            </div>
          </div>
        </motion.div>

        {/* Daily Purchases */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            delay: 1.1,
          }}
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px] relative"
        >
          <div className="bg-[#FFE2D5] text-[#F50057] p-4 rounded-full text-3xl">
            <FiUsers />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-[play]">
              Daily Successful Purchase
            </p>
            <h3 className="text-xl font-bold text-[#283144] font-[play]">42</h3>
          </div>

          {/* Info Icon and Tooltip */}
          <div
            className="absolute top-3 right-3 group"
            onMouseEnter={() => handleMouseEnter("dailyPurchases")}
            onMouseLeave={() => handleMouseLeave("dailyPurchases")}
          >
            <FiInfo
              className="text-gray-400 hover:text-[#F50057] cursor-pointer"
              onClick={() => toggleTooltip("dailyPurchases")} // Toggle visibility for this card
            />
            {/* Tooltip for Daily Purchases */}
            <div
              className={`absolute ${
                tooltipVisible.dailyPurchases ? "block" : "hidden"
              } w-44 text-[13px] text-white bg-[#67216D] p-2 rounded shadow-lg z-10 -top-2 right-10`}
            >
              This shows the number of successful purchases made today.
            </div>
          </div>
        </motion.div>

        {/* Total Successful Purchase */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            delay: 1.4,
          }}
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px] relative"
        >
          <div className="bg-[#FFE2D5] text-[#F50057] p-4 rounded-full text-3xl">
            <FiCheckCircle />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-[play]">
              Total Successful Purchase
            </p>
            <h3 className="text-xl font-bold text-[#283144] font-[play]">42</h3>
          </div>

          {/* Info Icon and Tooltip */}
          <div
            className="absolute top-3 right-3 group"
            onMouseEnter={() => handleMouseEnter("totalSuccessfulPurchase")}
            onMouseLeave={() => handleMouseLeave("totalSuccessfulPurchase")}
          >
            <FiInfo
              className="text-gray-400 hover:text-[#F50057] cursor-pointer"
              onClick={() => toggleTooltip("totalSuccessfulPurchase")} // Toggle visibility for this card
            />
            {/* Tooltip for Total Successful Purchase */}
            <div
              className={`absolute ${
                tooltipVisible.totalSuccessfulPurchase ? "block" : "hidden"
              } w-44 text-[13px] text-white bg-[#67216D] p-2 rounded shadow-lg z-10 -top-2 right-10`}
            >
              This shows the total successful purchases made in your store.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
