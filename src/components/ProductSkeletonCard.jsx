import React from "react";
import { motion } from "framer-motion";

const ProductSkeletonCard = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative bg-white rounded-lg overflow-hidden shadow-lg animate-pulse"
    >
      {/* Badge Placeholder */}
      <div className="absolute top-3 left-3 z-10 w-24 h-5 rounded-full bg-gray-200" />

      {/* Image Placeholder */}
      <div className="w-full h-56 bg-gray-200 rounded-t-lg" />

      {/* Title and Price Placeholder */}
      <div className="p-4 text-center text-[#14245F] font-[play] space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    </motion.div>
  );
};

export default ProductSkeletonCard;
