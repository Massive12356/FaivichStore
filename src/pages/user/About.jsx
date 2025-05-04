import React from "react";
import { motion } from "framer-motion";
import health1 from "../../images/essentialOil1.jpg";
import health2 from "../../images/essentialOils2.jpg";
import cleaning7 from "../../images/cleaning7.jpg";
import cosmetic1 from "../../images/cosmetic1.jpg";
import cosmetic2 from "../../images/cosmetics2.jpg";
import {
  FaPumpSoap,
  FaHeart,
  FaBriefcaseMedical,
  FaLeaf,
  FaSmile,
  FaWind,
  FaSeedling,
  FaBalanceScale,
  FaAward,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ExperienceBadge from "../../components/ExperienceBadge";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4E9] pt-40">
      {/* Animated Heading and Description */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-[#561256] font-[play] mb-10 px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
        <p className="text-lg max-w-4xl mx-auto text-gray-700">
          Faivich Enterprise is a manufacturing and distribution company
          specializing in producing high-quality cleaning agents/detergents,
          skincare/cosmetics, and healthcare products. Faivich is dedicated to
          promoting health and safety, and as a social enterprise, Faivich
          integrates sustainability, innovation, and social inclusion into its
          operations — creating affordable, effective, and non-toxic products
          for homes, businesses, and industries.
        </p>
      </motion.div>

      {/* Image container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full flex flex-col md:flex-row items-center justify-around gap-6 px-6 mb-10"
      >
        {/* First Image Block */}
        <div className="w-full md:w-[45%] h-[500px] relative group overflow-hidden rounded-lg">
          <img
            src={health1}
            alt="health1"
            className="absolute inset-0 w-full h-full object-cover brightness-[.7] transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0"
          />
          <img
            src={health2}
            alt="health2"
            className="absolute inset-0 w-full h-full object-cover brightness-[.7] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"
          />
        </div>

        {/* Second Image Block */}
        <div className="w-full md:w-[45%] h-[500px] relative group overflow-hidden rounded-lg">
          <img
            src={cosmetic1}
            alt="cosmetic1"
            className="absolute inset-0 w-full h-full object-cover brightness-[.7] transition-all duration-700 ease-in-out opacity-100 group-hover:opacity-0"
          />
          <img
            src={cosmetic2}
            alt="cosmetic2"
            className="absolute inset-0 w-full h-full object-cover brightness-[.7] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"
          />
        </div>
      </motion.div>

      {/* Spacer to fill available space before gradient */}
      <div className="flex-grow" />

      {/* Gradient Footer Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full px-6 py-12"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #C1D0DE, #F0E9B9, #FBCBC9, #FF9F8E)",
        }}
      >
        {/* Subtitle */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#561256] text-center mb-10 font-[play]">
          What We Offer
        </h2>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-[#561256] mb-16">
          {/* Cleaning Agents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <FaPumpSoap className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Cleaning Agents & Detergents
            </h3>
            <p className="text-gray-700">
              Eco-conscious and powerful formulations for a healthier home.
            </p>
          </motion.div>

          {/* Skincare */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <FaHeart className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Skincare & Cosmetics</h3>
            <p className="text-gray-700">
              Skin-loving, dermatologist-tested products that radiate beauty.
            </p>
          </motion.div>

          {/* Healthcare */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <FaBriefcaseMedical className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Healthcare Essentials
            </h3>
            <p className="text-gray-700">
              Everyday medical needs and wellness tools at your fingertips.
            </p>
          </motion.div>
        </div>

        {/* Final Section: Image + Text */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Parallax Image */}
          <div className="w-full md:w-[45%] h-[600px] overflow-hidden relative rounded-lg">
            <div className="sticky top-20 h-full w-full ">
              <motion.img
                src={cleaning7}
                alt="Why Choose Us"
                className="w-full h-full object-cover brightness-[.7]"
                style={{ scale: 1 }}
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Why Choose Faivich */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-[45%] text-[#561256] font-[play]"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose Faivich
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
              <li>Trusted Products</li>
              <li>Cruelty-Free & Eco-Friendly</li>
              <li>Affordable Premium Quality</li>
              <li>Local and Fast Delivery</li>
              <li>All Our Products are FDA Approved</li>
            </ul>
            <div className="mb-4">
              <h4 className="text-xl font-semibold">Our Mission</h4>
              <p className="text-gray-700">
                "To provide affordable, high-quality, and eco-friendly cleaning
                and skincare products, empowering customers through sustainable
                consumption while adhering to best-known manufacturing practices
                and contributing to environmental protection."
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Our Vision</h4>
              <p className="text-gray-700">
                "To become the leading brand synonymous with eco-friendly
                cleaning and skincare solutions of high-quality in West Africa,
                ensuring a positive environmental impact through responsible
                production."
              </p>
            </div>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full px-6 py-12"
        >
          <div className="max-w-5xl mx-auto text-[#561256] font-[play] text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-12">
              No chemical detergents & synthetic lathering agents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center justify-center gap-3 text-lg">
                <FaSmile className="text-2xl text-[#561256]" />
                Soft skin feel
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <FaHeart className="text-2xl text-[#561256]" />
                Love your skin
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <FaWind className="text-2xl text-[#561256]" />
                Best fragrance
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <FaLeaf className="text-2xl text-[#561256]" />
                Freshness explored
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <FaSeedling className="text-2xl text-[#561256]" />
                Go organic
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <FaBalanceScale className="text-2xl text-[#561256]" />
                PH balanced
              </div>
            </div>

            <Link
              to="/adverts"
              className="inline-block bg-[#561256] hover:bg-[#6d1975] text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Buy Products
            </Link>
          </div>
        </motion.section>
      </motion.section>

      {/* Fixed Flyer Badge */}
      <ExperienceBadge />
    </div>
  );
};

export default About;
