import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import mockOrders from "../../data/mockOrders"; // 🔄 Replace with API call when backend is ready

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🧠 Load mock data (replace with backend call)
  useEffect(() => {
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // 🔍 Search & sort handler
  useEffect(() => {
    let results = [...orders];

    // Search
    if (searchTerm) {
      results = results.filter(
        (order) =>
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    results.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setFilteredOrders(results);
    setCurrentPage(1); // Reset pagination when filter changes
  }, [searchTerm, sortField, sortOrder, orders]);

  // Pagination logic
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // 🗃 Table headers
  const tableHeaders = [
    "Order ID",
    "Created at",
    "Customer",
    "Total Amount",
    "Quantity",
    "Payment Method",
    "Payment Status",
    "Order Status",
    "Action",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="px-4 py-6 bg-[#F9F7F7] font-[play]"
    >
      <h1 className="text-3xl font-bold text-[#67216D] mb-6">Orders</h1>

      {/* 🔍 Search & Sorting Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-[#67216D] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
        />

        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
          className="px-4 py-2 border border-[#67216D] rounded-lg text-[#67216D] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
        >
          <option value="createdAt" title="Sorted by latest date">
            Sort by Date
          </option>
          <option value="total" title="Sorted by total price (high to low)">
            Sort by Total
          </option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
      </div>

      {/* 📄 Orders Table */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full overflow-x-auto"
      >
        <div className="min-w-[900px]">
          <table className="w-full table-auto bg-white shadow-md rounded-xl">
            <thead className="bg-[#67216D] text-white">
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header} className="p-4 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-[#FFE2D5] transition-all duration-300 text-center"
                >
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.createdAt}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-[#FF6C2F]">${order.total}</td>
                  <td className="p-4">
                    {order.products.reduce(
                      (total, product) => total + product.quantity,
                      0
                    )}
                  </td>
                  <td className="p-4">{order.paymentMethod}</td>
                  <td className="p-4">{order.paymentStatus}</td>
                  <td className="p-4">{order.orderStatus}</td>
                  <td className="p-4">
                    <Link to={`/dashboard/orders/${order.id}`}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-green-500 hover:text-[#67216D] cursor-pointer"
                        title="View Order"
                      >
                        <FiEye size={20} />
                      </motion.button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 🔁 Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#67216D] text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-[#283144] font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#67216D] text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Orders;
