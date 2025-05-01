import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { Link,useLocation } from "react-router-dom";
import mockProducts from "../../data/mockProducts";
import Features from "../../components/Features";

const categories = [
  "All",
  "Healthcare",
  "Cleaning Agents/Detergents", //  
  "Skincare/Cosmetics",
];

const PRODUCTS_PER_PAGE = 30;

const Adverts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState(null); // Track clicked card
  const location = useLocation();

  // Read initial category from query param if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");

    if (categoryFromURL && categories.includes(categoryFromURL)) {
      setSelectedCategory(categoryFromURL);
      setCurrentPage(1);
      setSelectedCardId(null);
    }
  }, [location.search]);

  const filteredProducts =
    selectedCategory === "All"
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

  const getSubText = () => {
    switch (selectedCategory) {
      case "Healthcare":
        return "Discover health essentials curated to enhance your well-being.";
      case "Skincare/Cosmetics":
        return "Unleash your natural beauty with our luxury cosmetics line.";
      case "Cleaning Agents/Detergents":
        return "Make your space sparkle with our effective cleaning solutions.";
      default:
        return "Find the best products tailored just for you.";
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const scrollToTopOfProductGrid = () => {
    const gridTop = document.querySelector(".grid")?.offsetTop || 0;
    window.scrollTo({ top: gridTop - 100, behavior: "smooth" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTopOfProductGrid();
  };

  const handleArrowNavigation = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToTopOfProductGrid();
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToTopOfProductGrid();
    }
  };

  const handleCardClick = (id) => {
    setSelectedCardId((prev) => (prev === id ? null : id)); // Toggle on/off
  };

  return (
    <div
      className="min-h-screen px-6 py-12 pt-40"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #C1D0DE, #F0E9B9, #FBCBC9, #FF9E8D)",
      }}
    >
      {/* SECTION HEADER */}
      <div className="text-center text-[#561256] font-[play] mb-10">
        <h1 className="text-[25px] md:text-6xl font-bold mb-4">
          {selectedCategory === "All"
            ? "Explore Our Product "
            : selectedCategory}
        </h1>
        <p className="text-[18px] md:text-lg max-w-xl mx-auto">
          {getSubText()}
        </p>
      </div>

      {/* CATEGORY FILTER BUTTONS */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
              setSelectedCardId(null);
            }}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#561256] text-white"
                : "bg-white text-[#561256] shadow-md"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {paginatedProducts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: item.id * 0.05 }}
            onClick={() => handleCardClick(item.id)}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Description Badge */}
            <div className="absolute top-3 left-3 z-10 text-xs px-3 py-1 rounded-full shadow text-[#14245F] bg-white font-semibold">
              {item.description}
            </div>

            {/* Product Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover bg-white p-4 rounded-lg"
            />

            {/* Overlay */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold p-4 
                transition-all duration-300
                ${selectedCardId === item.id ? "opacity-100" : "opacity-0"} 
                sm:opacity-0 sm:group-hover:opacity-100
              `}
            >
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

            {/* Product Title and Price */}
            <div className="p-4 text-center text-[#14245F] font-[play]">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-lg font-semibold">
                  GH{"\u20B5"} {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10">
          <button
            className="mx-2 px-4 py-2 text-sm rounded-full font-semibold bg-white text-[#14245F] border"
            onClick={() => handleArrowNavigation("prev")}
          >
            &lt; Prev
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-4 py-2 text-sm rounded-full font-semibold ${
                  currentPage === index + 1
                    ? "bg-[#14245F] text-white"
                    : "bg-white text-[#14245F] border"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="mx-2 px-4 py-2 text-sm rounded-full font-semibold bg-white text-[#14245F] border"
            onClick={() => handleArrowNavigation("next")}
          >
            Next &gt;
          </button>
        </div>
      )}

      {/* FEATURES */}
      <Features />
    </div>
  );
};

export default Adverts;
