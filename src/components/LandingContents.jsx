import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaTruck,
  FaCertificate,
  FaHeadset,
  FaTags,
  FaArrowRight,
} from "react-icons/fa";
import mockProducts from "../data/mockProducts";
import TestimonialSlider from "./TestimonialSlider";
import person from "../images/person.jpg";
import person1 from '../images/person1.jpg'
import ShopByCategories from "./ShopByCategories";

const LandingContents = () => {
  const products = mockProducts.slice(0, 3); // Only 3 products

  return (
    <motion.div
      className="w-full"
      style={{ background: "linear-gradient(135deg, #C6D2DA, #F0E8B9)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Promotional Feature Section */}
      <motion.section
        className="w-full bg-transparent py-20 px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl text-[#561256] md:text-5xl text-center font-extrabold mb-6">
              Premium Products for Your Body, Health & Home
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 max-w-xl mb-10">
              Our team of experts has carefully curated a premium range of
              products, from nourishing healthcare essentials to luxurious
              skincare and cosmetics, as well as powerful cleaning agents and
              detergents for your home.
              <br className="hidden md:block" />
              <br />
              Experience top-tier quality across all categories — all at
              affordable prices — and enjoy the confidence of looking great,
              feeling healthy, and living in a sparkling clean environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#561256]">
              <div className="flex items-start gap-4">
                <FaTruck className="text-2xl mt-1" />
                <p className="font-bold text-base">24/7 Delivery</p>
              </div>
              <div className="flex items-start gap-4">
                <FaCertificate className="text-2xl mt-1" />
                <p className="font-bold text-base">Original Product</p>
              </div>
              <div className="flex items-start gap-4">
                <FaHeadset className="text-2xl mt-1" />
                <p className="font-bold text-base">Instant Support</p>
              </div>
              <div className="flex items-start gap-4">
                <FaTags className="text-2xl mt-1" />
                <p className="font-bold text-base">Affordable</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src={person}
              alt="Beauty skincare showcase"
              className="w-full h-[600px] rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Shop by Categories Section */}
      <ShopByCategories />

      {/* Testimonial Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <TestimonialSlider />
      </motion.section>

      {/* Our Products Section */}
      <motion.section
        className="py-24 px-4 md:px-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#561256] mb-3">
            Our Products
          </h2>
          <p className="text-md md:text-lg text-gray-700 max-w-2xl mx-auto">
            Discover some of our best-selling skincare, healthcare, and cleaning
            essentials—carefully selected to support your beauty, wellness, and
            lifestyle goals.
          </p>
        </div>

        <div className="flex justify-end items-center mb-6 group">
          <motion.div whileHover="hover">
            <Link
              to="/adverts"
              className="flex items-center text-[#f50056cf] font-semibold transition duration-300"
            >
              See all products
              <motion.span
                className="ml-2 inline-block font-bold"
                variants={{
                  hover: { rotate: -25 },
                  initial: { rotate: 0 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockProducts.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            >
              <div className="absolute top-3 left-3 z-10 text-xs px-3 py-1 rounded-full shadow text-[#14245F] bg-white font-semibold">
                {item.description || "Product"}
              </div>

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover bg-white p-1 rounded-lg"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold p-4 transition-all duration-300 opacity-0 sm:group-hover:opacity-100">
                <Link to={`/adverts/${item.id}`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-between py-3 px-5 bg-[#f50056cf] cursor-pointer rounded-lg"
                  >
                    <FaShoppingBag className="mr-3" />
                    Shop Now
                  </motion.button>
                </Link>
              </div>

              <div className="p-4 text-center text-[#14245F] font-[play]">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {item.price && (
                    <span className="text-lg font-semibold">
                      GH₵ {Number(item.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/*Cosmetics  Promotional Feature Section */}
      <motion.section
        className="w-full bg-transparent py-20 px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src={person1}
              alt="Beauty skincare showcase"
              className="w-full h-[600px] rounded-2xl shadow-xl object-cover"
            />
          </motion.div>

          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl text-[#561256] md:text-5xl text-center font-extrabold mb-6">
              Luxurious Cosmetics for Radiant Skin & Timeless Beauty
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 max-w-xl mb-10">
              Discover our expertly curated selection of premium cosmetic
              products designed to enhance your natural beauty. From nourishing
              skincare to glow-boosting oils and flawless makeup essentials, we
              bring you only the finest in self-care.
              <br className="hidden md:block" />
              <br />
              Feel confident, look radiant, and indulge in beauty rituals that
              elevate your everyday routine — all at prices that celebrate you.
            </p>

            <div className="w-full flex items-center justify-center">
              <Link to={"/adverts"}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-md bg-[#67216D] text-white text-base md:text-lg font-semibold shadow-md hover:bg-[#501452] hover:scale-105 transition-all cursor-pointer"
                >
                  Explore Our Shop
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default LandingContents;
