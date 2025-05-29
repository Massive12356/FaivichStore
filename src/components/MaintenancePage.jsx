// src/MaintenancePage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

// Replace with environment variable if needed
const maintenanceStartTime = new Date("2025-05-29T12:00:00");

const MaintenancePage = () => {
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);

  // Count-up timer logic
  const calculateElapsedTime = () => {
    const now = new Date();
    const difference = now - maintenanceStartTime;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Looping fake progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 via-white to-purple-200 animate-gradient-x p-6">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Spinning icon */}
        <motion.div
          className="flex justify-center items-center mb-6 text-yellow-500"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <FaTools size={50} />
        </motion.div>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          We'll Be Back Soon
        </h1>
        <p className="text-gray-600 mb-3">
          Our site is currently undergoing scheduled maintenance.
        </p>
        <p className="text-gray-500 text-sm">
          Please check back later or follow us on social media for updates.
        </p>

        {/* Elapsed Time */}
        <div className="mt-6 text-gray-800 font-medium">
          <p className="text-lg">Maintenance ongoing for:</p>
          <div className="text-xl font-bold mt-1">
            {elapsedTime.days}d {elapsedTime.hours}h {elapsedTime.minutes}m{" "}
            {elapsedTime.seconds}s
          </div>
        </div>

        {/* Styled Progress Bar */}
        <div className="mt-8 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-yellow-400 h-3 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
