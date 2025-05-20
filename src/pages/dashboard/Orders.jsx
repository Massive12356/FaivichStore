import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useOrderStore } from "../../store/OrderStore";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const itemsPerPage = 10;

  const { ProductOrders = [], isLoading, fetchOrders,deleteOrder } = useOrderStore();

  useEffect(() => {
    const mappedOrders = Array.isArray(ProductOrders)
      ? ProductOrders.map((order) => ({
          id: order?.id || "N/A",
          createdAt: order?.createdAt || new Date().toISOString(),
          customer: `${order?.firstName || "Unknown"} ${
            order?.lastName || ""
          }`.trim(),
          total: isNaN(Number(order?.totalAmount))
            ? 0
            : Number(order?.totalAmount),
          quantity: order?.quantity || 0,
          paymentMethod: order?.paymentMethod || "N/A",
          orderStatus: order?.status || "Pending",
          paymentStatus: order?.paymentStatus || "Paid",
        }))
      : [];

    setOrders(mappedOrders);
  }, [ProductOrders]);

  useEffect(() => {
    let results = [...orders];

    if (searchTerm) {
      results = results.filter(
        (order) =>
          order?.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order?.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    results.sort((a, b) => {
      const fieldA = sortField === "total" ? a.total : a[sortField];
      const fieldB = sortField === "total" ? b.total : b[sortField];
      return sortOrder === "asc"
        ? fieldA > fieldB
          ? 1
          : -1
        : fieldA < fieldB
        ? 1
        : -1;
    });

    setFilteredOrders(results);
    setCurrentPage(1);
  }, [searchTerm, sortField, sortOrder, orders]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  

  const handleDelete = async () => {
    if (!selectedOrderId) return;
    try {
       await deleteOrder(selectedOrderId);
        await fetchOrders(true); // re-fetch
        toast.success("Order deleted successfully");
        setOrders((prev) => prev.filter((o) => o.id !== selectedOrderId));  
      
    } catch (error) {
      toast.error("Failed to delete order");
    } finally {
      setShowModal(false);
      setSelectedOrderId(null);
    }
  };

  const confirmDelete = (id) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  const tableHeaders = [
    "#",
    "Order ID",
    "Order Date",
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
      <h1 className="text-2xl md:text-3xl font-bold text-[#67216D]">Orders</h1>
      <p className="text-[15px] md:text-[20px] text-gray-700 mb-5">
        You can View Your Order Details here
      </p>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between bg-white p-4 items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Customer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-[#67216D] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
        />
        <div
          className="hidden md:flex items-center justify-center md:w-10 w-7 h-7 md:h-10 rounded-full border-2 border-[#67216D] text-[#67216D]"
          title="Total number of Orders"
        >
          <p className="font-bold">{ProductOrders?.length || 0}</p>
        </div>
        <select
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
          className="px-4 py-2 border border-[#67216D] rounded-lg text-[#67216D] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="total">Sort by Total</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
      </div>

      {/* Orders Table */}
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
              {isLoading ? (
                <tr>
                  <td colSpan={tableHeaders.length}>
                    <div className="flex justify-center items-center p-8">
                      <Spinner message="Loading Orders..." />
                    </div>
                  </td>
                </tr>
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-[#FFE2D5] transition-all duration-300 text-center"
                  >
                    <td className="font-bold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4 text-[#FF6C2F]">
                      GH₵ {order.total.toFixed(2)}
                    </td>
                    <td className="p-4">{order.quantity}</td>
                    <td className="p-4">{order.paymentMethod}</td>
                    <td className="p-4">{order.paymentStatus}</td>
                    <td className="p-4">{order.orderStatus}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link to={`/dashboard/orders/${order.id}`}>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="text-green-500 hover:text-[#67216D]"
                            title="View Order"
                          >
                            <FiEye size={20} />
                          </motion.button>
                        </Link>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => confirmDelete(order.id)}
                          className="text-red-500 hover:text-[#67216D]"
                          title="Delete Order"
                        >
                          <FiTrash2 size={20} />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="p-6 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#67216D] text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-[#283144] font-semibold">
          Page {currentPage} of {totalPages || 1}
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

      {/* Delete Confirmation Modal */}
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
              Delete Order?
            </h3>
            <p className="text-sm text-gray-500 mb-4 font-[play]">
              Are you sure you want to delete the order{" "}
              <span className="font-bold text-black">{selectedOrderId}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded-md text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Orders;
