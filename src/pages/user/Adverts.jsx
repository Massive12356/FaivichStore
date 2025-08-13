import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag, FaRegSadTear } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Features from "../../components/Features";
import useProductStore from "../../store/productStore";
import ProductSkeletonGrid from "../../components/ProductSkeletonGrid";

const PRODUCTS_PER_PAGE = 30;

const Adverts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const navigate = useNavigate();
  const { products, isLoading } = useProductStore();

  const categories = useMemo(() => {
    const allCategories = products.flatMap((product) =>
      product.category.map((cat) => cat.name)
    );
    const uniqueCategories = [...new Set(allCategories)];
    return ["All", ...uniqueCategories];
  }, [products]);

  const getSubText = () => {
    switch (selectedCategory) {
      case "Healthcare Products":
        return "Discover health essentials curated to enhance your well-being.";
      case "Skincare Products":
        return "Unleash your natural beauty with our luxury cosmetics line.";
      case "Cleaning Agents":
        return "Make your space sparkle with our effective cleaning solutions.";
      default:
        return "Find the best products tailored just for you.";
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) =>
      product.category.some((cat) => cat.name === selectedCategory)
    );
  }, [products, selectedCategory]);

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
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  const searchAgain = () => {
    navigate("/adverts");
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
            ? "Explore Our Product"
            : selectedCategory}
        </h1>
        <p className="text-[18px] md:text-lg max-w-xl mx-auto text-gray-700">
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
        {isLoading ? (
          <ProductSkeletonGrid count={9} />
        ) : paginatedProducts.length === 0 ? (
          <div className="w-full flex justify-center items-center min-h-[300px] text-center text-[#561256] font-[play] col-span-full">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              <div className="mb-4">
                <FaRegSadTear className="mx-auto text-4xl text-[#561256]" />
                <h2 className="text-2xl md:text-4xl font-semibold text-[#561256] mt-4 mb-2">
                  No results found
                </h2>
              </div>
              <p className="text-md text-gray-700 mb-6">
                Sorry, we couldn’t find any products that match your search or
                selected category. Try refining your search or explore our other
                collections.
              </p>
              <Link
                onClick={searchAgain}
                className="inline-block py-2 px-6 text-white bg-[#561256] rounded-lg shadow-md hover:bg-[#4a103d] transition-all duration-300"
              >
                Search Again
              </Link>
            </div>
          </div>
        ) : (
          paginatedProducts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: item.id * 0.05 }}
              onClick={() => handleCardClick(item.id)}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            >
              <div className="absolute top-3 left-3 z-10 text-xs px-3 py-1 rounded-full shadow text-[#14245F] bg-white font-semibold">
                {item.description}
              </div>
              <img
                src={`https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${item.pictures[0]}`}
                alt={item.title}
                className="w-full h-56 object-cover bg-white p-1 rounded-lg"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold p-4 transition-all duration-300 ${
                  selectedCardId === item.id ? "opacity-100" : "opacity-0"
                } sm:opacity-0 sm:group-hover:opacity-100`}
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
              <div className="p-4 text-center text-[#14245F] font-[play]">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-lg font-semibold">
                    GH{"\u20B5"} {item.price.toFixed(2)}
                  </span>
                  <div className="ml-8">
                    <p
                      className={`text-sm font-medium ${
                        item.quantity > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10">
          <button
            className="mx-2 px-4 py-2 bg-[#561256] text-white rounded-full"
            onClick={() => handleArrowNavigation("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-4 py-2 rounded-full ${
                currentPage === i + 1
                  ? "bg-[#f50056cf] text-white"
                  : "bg-white text-[#561256]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="mx-2 px-4 py-2 bg-[#561256] text-white rounded-full"
            onClick={() => handleArrowNavigation("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <Features />
    </div>
  );
};

export default Adverts;
