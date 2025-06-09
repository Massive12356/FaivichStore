import React, { useState, useEffect } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useProductStore from "../../store/productStore";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import useSearchStore from "../../store/searchStore";
import { FaRegSadTear } from "react-icons/fa";

const VendorAds = () => {
  const [view, setView] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const { fetchProducts, products, isLoading, deleteProduct } =
    useProductStore();
  const { query, setQuery } = useSearchStore();

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

  const confirmDelete = async (id) => {
    const result = await deleteProduct(id);
    if (result.success) {
      await fetchProducts(true);
      toast.success("Product deleted successfully");
    } else {
      toast.error(result.message || "Failed to delete product");
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "All" ||
      product.category?.[0]?.name?.toLowerCase().trim() ===
        filterCategory.toLowerCase().trim();

    const matchesQuery =
      query.trim() === "" ||
      product.name?.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  const searchAgain = () => {
    setQuery("");
    navigate("/faivichRoom/vendorAds");
  };

  return (
    <div className="px-4 py-6 bg-[#F9F7F7]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] mb-4 font-[play]">
        Your Published Products
      </h1>
      <p className="text-[15px] md:text-[20px] text-gray-700 mb-4 font-[play]">
        You can VIEW, EDIT and DELETE your published Products here
      </p>

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Filters */}
        <div className="flex gap-4 flex-wrap items-center">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border w-40 text-[12px] md:text-[16px] md:w-60 border-[#67216D] text-[#67216D] rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6C2F] font-[play] cursor-pointer"
          >
            <option value="All">All Products</option>
            <option value="Cleaning Agents">Cleaning Products</option>
            <option value="Healthcare Products">Healthcare Products</option>
            <option value="Skincare Products">
              Cosmetics / Skincare Products
            </option>
          </select>
        </div>

        {/* Product count */}
        <div
          className="hidden md:flex items-center justify-center md:w-10 w-7 h-7 md:h-10 rounded-full border-2 border-[#67216D] text-[#67216D]"
          title="Total number of Published Products"
        >
          <p className="font-bold">{filteredProducts.length}</p>
        </div>

        {/* View Toggle */}
        <motion.button
          title="Change the view of products details"
          whileTap={{ scale: 0.95 }}
          onClick={handleViewToggle}
          className="bg-[#4A235A] hover:bg-[#513E5F] text-sm text-white md:text-[16px] px-4 py-2 rounded-lg cursor-pointer font-[play]"
        >
          {view === "grid" ? "List" : "Grid"} View
        </motion.button>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 font-[play]">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center">
              <Spinner message="Loading your products..." />
            </div>
          ) : filteredProducts.length === 0 ? (
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
                  selected category. Try refining your search or explore our
                  other collections.
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
            filteredProducts.map((product) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                whileHover={{ scale: 0.97 }}
                key={product.id}
                className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center "
              >
                <img
                  src={`https://res.cloudinary.com/dp0kuhms5/image/upload/f_auto,q_auto/v1747053460/${product.pictures[0]}`}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <div className="flex-grow text-center">
                  <h3 className="text-lg font-bold text-[#283144]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="ml-8 flex flex-wrap items-center justify-around w-40 mt-2">
                    <p className="text-sm text-[#FF6C2F]">
                      GH{"\u20B5"} {product.price}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        product.quantity > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link to={`/faivichRoom/vendorAds/${product.id}`}>
                    <motion.button
                      title="view Published Product"
                      whileTap={{ scale: 0.95 }}
                      className="text-green-500 hover:text-[#67216D] cursor-pointer"
                    >
                      <FiEye size={20} />
                    </motion.button>
                  </Link>
                  <Link to={`/faivichRoom/updateAd/${product.id}`}>
                    <motion.button
                      title="Edit Published Product"
                      whileTap={{ scale: 0.95 }}
                      className="text-[#FF6C2F] hover:text-[#67216D] cursor-pointer"
                    >
                      <FiEdit size={20} />
                    </motion.button>
                  </Link>
                  <motion.button
                    title="Delete Published Product"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(product)}
                    className="text-red-500 hover:text-[#67216D] cursor-pointer"
                  >
                    <FiTrash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : filteredProducts.length === 0 ? (
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
        // List/Table View
        <motion.div className="mt-6 font-[play] min-h-[200px] relative">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Spinner message="Loading your products..." />
            </div>
          ) : (
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
                            src={`https://res.cloudinary.com/dp0kuhms5/image/upload/f_auto,q_auto/v1747053460/${product.pictures[0]}`}
                            loading="lazy"
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
                        <Link to={`/dashboard/vendorAds/${product.id}`}>
                          <motion.button
                            title="View Published Product"
                            whileTap={{ scale: 0.95 }}
                            className="text-green-500 cursor-pointer hover:text-[#67216D]"
                          >
                            <FiEye size={20} />
                          </motion.button>
                        </Link>
                        <Link to={`/faivichRoom/UpdateAd/${product.id}`}>
                          <motion.button
                            title="Edit Published product"
                            whileTap={{ scale: 0.95 }}
                            className="text-[#FF6C2F] cursor-pointer hover:text-[#67216D]"
                          >
                            <FiEdit size={20} />
                          </motion.button>
                        </Link>
                        <motion.button
                          title="Delete Published Product"
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
          )}
        </motion.div>
      )}

      {showModal && selectedProduct && (
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
                {selectedProduct.name}
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
                onClick={() => confirmDelete(selectedProduct.id)}
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
