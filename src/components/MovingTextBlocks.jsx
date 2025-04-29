// MovingTextBlocks.jsx
import React from "react";
import { motion } from "framer-motion";

const texts = [
  "Pure Ingredients, Pure Results.",
  "Skin, Home, and Health — All Cared For.",
  "Naturally Powerful, Scientifically Tested.",
  "Your Wellness, Our Promise.",
  "All Products Are FDA Approved",
];

const MovingTextBlocks = () => {
  return (
    <section className="overflow-hidden py-12 bg-gradient-to-b from-[#F9F4FB] to-[#FFFFFF]">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Control speed here
            ease: "linear",
          }}
          className="flex space-x-16 text-2xl md:text-4xl font-semibold text-[#67216D]"
        >
          {[...texts, ...texts].map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MovingTextBlocks;
