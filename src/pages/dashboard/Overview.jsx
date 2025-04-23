import React, { useEffect, useState } from "react";
import { FiBox, FiShoppingCart, FiUsers, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const Overview = () => {
  const [username, setUsername] = useState("Vendor");
  const [stockCount, setStockCount] = useState(0);

  useEffect(() => {
    setUsername("Edward Mintah");
    setStockCount(152);
  }, []);

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
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px]"
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
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px]"
        >
          <div className="bg-[#FFE2D5] text-[#F50057] p-4 rounded-full text-3xl">
            <FiShoppingCart />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-[play]">Total Orders</p>
            <h3 className="text-xl font-bold text-[#283144] font-[play]">85</h3>
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
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px]"
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
          className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between gap-5 min-h-[160px]"
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
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
