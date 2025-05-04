import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward } from "react-icons/fa";

const ExperienceBadge = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is small
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640); // Tailwind's sm breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamically adjust size based on screen
  const badgeWidth = isScrolled ? (isMobile ? 160 : 220) : isMobile ? 40 : 50;
  const paddingX = isScrolled ? (isMobile ? 10 : 16) : 10;
  const paddingY = isMobile ? 6 : 10;
  const iconSize = isMobile ? "text-lg" : "text-xl";
  const fontSize = isMobile ? "text-xs" : "text-sm";

  return (
    <motion.div
      className="fixed top-28 right-4 z-50 bg-gradient-to-r from-[#f50057] to-[#f500568d] text-white shadow-lg flex items-center overflow-hidden cursor-default"
      initial={false}
      animate={{
        width: badgeWidth,
        borderRadius: isScrolled ? "40px" : "50%",
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <FaAward className={`${iconSize} mr-2`} />

      <AnimatePresence>
        {isScrolled && (
          <motion.span
            key="experience-text"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className={`whitespace-nowrap font-semibold ${fontSize}`}
          >
            10+ Years Experience
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExperienceBadge;
