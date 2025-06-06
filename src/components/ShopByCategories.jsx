import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFolderOpen } from "react-icons/fa";
import med from "../images/med1.webp";
import cos from "../images/cos.webp";
import clen from "../images/clen.webp";

const categories = [
  {
    category: "Skincare Products",
    tagline: "Enhance your natural glow with luxurious care.",
    image: cos,
  },
  {
    category: "Healthcare Products",
    tagline: "Support your wellness journey with trusted essentials.",
    image: med,
  },
  {
    category: "Cleaning Agents",
    tagline: "Powerful solutions to keep your home fresh and spotless.",
    image: clen,
  },
];

export default function ShopByCategories() {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const cardRefs = useRef([]);
  const timeoutRef = useRef(null);

  // Close overlay on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeCardIndex !== null &&
        cardRefs.current[activeCardIndex] &&
        !cardRefs.current[activeCardIndex].contains(event.target)
      ) {
        setActiveCardIndex(null);
        clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeCardIndex]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleCardClick = (index) => {
    const isMobile = window.innerWidth < 768;

    // Toggle logic
    if (index === activeCardIndex) {
      setActiveCardIndex(null);
      clearTimeout(timeoutRef.current);
    } else {
      setActiveCardIndex(index);
      clearTimeout(timeoutRef.current);

      // Auto-hide after 5s on mobile
      if (isMobile) {
        timeoutRef.current = setTimeout(() => {
          setActiveCardIndex(null);
        }, 5000);
      }
    }
  };

  return (
    <motion.section
      className="py-24 px-4 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-6xl font-extrabold mb-5"
          style={{ color: "#561256" }}
        >
          Shop by Categories
        </h2>
        <p className="text-md md:text-lg text-gray-700 max-w-2xl mx-auto">
          Explore our wide range of high-quality products across healthcare,
          skincare & cosmetics, and home cleaning essentials. Find exactly what
          your body, beauty, and home need — all in one place.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((item, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="relative bg-white rounded-lg overflow-hidden shadow-md group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 0.97 }}
            onClick={() => handleCardClick(index)}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={`${item.category} category`}
              className="w-full h-64 object-cover p-1 rounded-lg"
              loading="lazy"
            />

            {/* Text */}
            <div className="p-5 text-center text-[#14245F] font-[play]">
              <h2 className="text-xl font-bold">{item.category}</h2>
              {item.tagline && (
                <p className="text-sm text-gray-600 mt-1">{item.tagline}</p>
              )}
            </div>

            {/* Hover/Active Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold p-4 transition-all duration-300
              ${
                activeCardIndex === index ? "opacity-100" : "opacity-0"
              } sm:group-hover:opacity-100`}
            >
              <Link
                to={`/adverts?category=${encodeURIComponent(item.category)}`}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center py-3 px-5 bg-[#f50056cf] hover:bg-[#e1004db5] transition duration-300 rounded-lg cursor-pointer"
                >
                  <FaFolderOpen className="mr-3" />
                  Browse Category
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
