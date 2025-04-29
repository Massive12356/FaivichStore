import React, { useState,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockOrders from "../../data/mockOrders"; // Mock data used before backend integration
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

const SingleOrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const navigate = useNavigate(); // For back navigation

  // Find the index of the order in mock data
  const orderIndex = mockOrders.findIndex((o) => o.id === id);

  // Store the order in local state for editing
  const [order, setOrder] = useState(mockOrders[orderIndex]);

  const printRef = useRef(); // 👈 Create ref for the print section

  // Show error if order is not found
  if (!order) {
    return <div className="p-6 text-red-600">Order not found.</div>;
  }

  // Handle dropdown change for Payment Status
  const handlePaymentChange = (e) => {
    const updated = { ...order, paymentStatus: e.target.value };
    setOrder(updated);
  };

  // Handle dropdown change for Order Status
  const handleStatusChange = (e) => {
    const updated = { ...order, orderStatus: e.target.value };
    setOrder(updated);
  };

  // Save changes by simulating DB update (replace with API call later)
  const handleSaveChanges = () => {
    mockOrders[orderIndex] = order; // Simulate update in mock DB
    alert("Order updated successfully (simulated)."); // Temporary feedback
  };

  // Handle printing/downloading the order details
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="p-4 md:p-6 bg-[#F9F7F7] min-h-screen font-[play]"
    >
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#67216D] hover:underline mb-4 cursor-pointer"
      >
        <FiArrowLeft className="mr-2" />
        Back to Orders
      </button>

      {/* START of Printable Section */}
      <div ref={printRef} className="print-section">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Order Details - {order.id}</h1>
        {/* Order Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
          {/* Grid layout for order details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reusable detail block */}
            <Detail label="Customer" value={order.customer} />
            <Detail label="Created At" value={order.createdAt} />
            <Detail label="Payment Method" value={order.paymentMethod} />
            <Detail label="Total" value={`GH${"\u20B5"} ${order.total}`} />

            {/* Payment status dropdown */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <select
                value={order.paymentStatus}
                onChange={handlePaymentChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {/* Delivery number */}

            {/* Order status dropdown */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Status</p>
              <select
                value={order.orderStatus}
                onChange={handleStatusChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* List of order items */}
          <div>
            <p className="text-sm text-gray-500 mt-6 mb-2">Order Items</p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {order.products?.length > 0 ? (
                order.products.map((item, index) => (
                  <li key={index}>
                    {item.name} — Quantity: {item.quantity} — GH{"\u20B5"} {item.price}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 italic">No items listed.</p>
              )}
            </ul>
          </div>
        </div>{" "}
        {/* END of Printable Section */}
        {/* Action buttons: Save + Print/Download */}
        <div className="flex flex-col justify-end-safe md:flex-row gap-4 pt-6">
          <motion.button
            title="Save Changes to Update the records in the order table"
            whileTap={{ scale: 0.9 }}
            onClick={handleSaveChanges}
            className=" btn px-4 py-2 border border-[#4A235A] rounded hover:bg-[#4A235A] hover:text-white cursor-pointer"
          >
            Save Changes
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrint}
            className="btn  px-4 py-2 border border-[#4A235A] rounded hover:bg-[#4A235A] hover:text-white cursor-pointer"
          >
            Print / Download
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable UI block for label-value pairs
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default SingleOrderDetails;
