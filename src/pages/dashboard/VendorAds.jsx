import React, { useState, useEffect } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router";
import cleaningProduct from "../../assets/cleaningProduct.jpg";
import healthcareProduct from "../../assets/HealthCareProduct.jpg";
import cosmeticProduct from "../../assets/cosmeticProduct.jpg";
import mockProducts from "../../data/mockProducts";

const VendorAds = () => {
  const [view, setView] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const savedView = localStorage.getItem("view");
    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    if (view) {
      localStorage.setItem("view", view);
    }
  }, [view]);

  const handleViewToggle = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDelete = () => {
    alert(`Product ${selectedProduct.name} deleted.`);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const filteredProducts =
    filterCategory === "All"
      ? mockProducts
      : mockProducts.filter((product) => product.category === filterCategory);

  return (
    <div className="px-4 py-6 bg-[#F9F7F7]">
      <h1 className="text-3xl font-bold text-[#67216D] mb-6 font-[play]">
        Your Ads
      </h1>

      <div className="sticky top-0 z-10 bg-white p-4 shadow-md flex justify-between items-center">
        <div className=" w-20 md:w-40 flex gap-4">
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
            className="border w-40 text-[12px] md:text-[16px] md:w-60 border-[#67216D] text-[#67216D] rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6C2F] font-[play] cursor-pointer"
          >
            <option value="All">All Products</option>
            <option value="Cleaning Agents/Detergents">
              Cleaning Products
            </option>
            <option value="Healthcare">Healthcare Products</option>
            <option value="Skincare/Cosmetics">Cosmetics Products</option>
          </select>
        </div>
        <motion.button
          title="Change the view of products details"
          whileTap={{ scale: 0.95 }}
          onClick={handleViewToggle}
          className="bg-[#4A235A] hover:bg-[#513E5F] text-sm text-white md:text-[16px] px-4 py-2 rounded-lg cursor-pointer font-[play]"
        >
          {view === "grid" ? "List" : "Grid"} View
        </motion.button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 font-[play]">
          {filteredProducts.map((product) => (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              whileHover={{ scale: 0.9 }}
              key={product.id}
              className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center "
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain rounded-md mb-4"
              />
              <div className="flex-grow text-center">
                <h3 className="text-lg font-bold text-[#283144]">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-sm text-[#FF6C2F] mt-2">
                  GH{"\u20B5"} {product.price}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <Link to={"/dashboard/singleAd/:id"}>
                  <motion.button
                    title="view Product"
                    whileTap={{ scale: 0.95 }}
                    className="text-green-500 hover:text-[#67216D] cursor-pointer"
                  >
                    <FiEye size={20} />
                  </motion.button>
                </Link>
                <Link to={"/dashboard/updateAd/:id"}>
                  <motion.button
                    title="Edit Product"
                    whileTap={{ scale: 0.95 }}
                    className="text-[#FF6C2F] hover:text-[#67216D] cursor-pointer"
                  >
                    <FiEdit size={20} />
                  </motion.button>
                </Link>
                <motion.button
                  title="Delete Product"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(product)}
                  className="text-red-500 hover:text-[#67216D] cursor-pointer"
                >
                  <FiTrash2 size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // ✅ Updated scroll behavior: table scrolls only inside container on small screens
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
          className="mt-6 font-[play]"
        >
          {/* 🟡 Scroll wrapper only scrolls on small screens, not entire page */}
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-2xl">
              <thead className="bg-[#67216D] text-white">
                <tr>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-[#FFE2D5] transition-all duration-300"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="font-semibold">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {product.description}
                    </td>
                    <td className="p-4 text-sm text-[#FF6C2F]">
                      GH{"\u20B5"} {product.price}
                    </td>
                    <td className="p-4 flex gap-3 items-center justify-center mt-5">
                      <Link to={"/dashboard/singleAd/:id"}>
                        <motion.button
                          title="View Published  Product"
                          whileTap={{ scale: 0.95 }}
                          className="text-green-500 cursor-pointer hover:text-[#67216D]"
                        >
                          <FiEye size={20} />
                        </motion.button>
                      </Link>
                      <Link to={"/dashboard/UpdateAd/:id"}>
                        <motion.button
                          title="Edit Published product"
                          whileTap={{ scale: 0.95 }}
                          className="text-[#FF6C2F] cursor-pointer hover:text-[#67216D]"
                        >
                          <FiEdit size={20} />
                        </motion.button>
                      </Link>
                      <motion.button
                        title="Delete Published  Product"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(product)}
                        className="text-red-500 hover:text-[#67216D] cursor-pointer"
                      >
                        <FiTrash2 size={20} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50 p-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-[#283144] mb-4">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-500 mb-4 font-[play]">
              Are you sure you want to delete the product{" "}
              <span className="font-bold text-black">
                {selectedProduct?.title}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={cancelDelete}
                className="bg-gray-300 text-[#283144] px-4 py-2 rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VendorAds;
