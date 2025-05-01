import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import mockProducts from "../data/mockProducts";

const products = mockProducts.slice(0, 20);
const scrollingContent = [...products, ...products, ...products]; // More duplication = better loop

const MovingTextBlocks = () => {
  return (
    <section className="overflow-hidden py-7 bg-gradient-to-r from-[#F9F4FB] to-[#F3EAF6]">
      <div className="relative w-full">
        <motion.div
          className="flex space-x-6 px-4 md:px-8"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.2}
          whileTap={{ cursor: "grabbing" }}
        >
          {scrollingContent.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => (
  <Link
    to={`/adverts/${product.id}`}
    className="block h-full min-w-[280px] md:min-w-[400px] max-w-[400px]"
  >
    <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden border border-[#eee]">
      <div className="w-[40%] aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-[60%] p-3 text-[#67216D]">
        <h3 className="text-sm md:text-base font-bold leading-tight">
          {product.title}
        </h3>
        <p className="text-xs md:text-sm italic font-semibold mt-1">
          GH₵ {product.price}
        </p>
        <p className="text-xs md:text-sm mt-2 line-clamp-3 leading-snug">
          {product.description}
        </p>
      </div>
    </div>
  </Link>
);

export default MovingTextBlocks;
