import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      {/* Logo */}
      <motion.img
        src="/logo1.webp" // or use import if in assets
        alt="Faivich Logo"
        className="w-24 h-24 mb-6"
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />

      {/* Progress Bar Container */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        {/* Animated Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%"] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
