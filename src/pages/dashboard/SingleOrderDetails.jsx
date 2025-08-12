import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useOrderStore } from "../../store/OrderStore";

const SingleOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ProductOrders} = useOrderStore();
  const orderIndex = ProductOrders.findIndex((o) => o.id === id);
  const [order, setOrder] = useState(ProductOrders[orderIndex]);
  const printRef = useRef();

  const handlePaymentChange = (e) => {
    const updated = { ...order, paymentStatus: e.target.value };
    setOrder(updated);
  };

  const handleStatusChange = (e) => {
    const updated = { ...order, orderStatus: e.target.value };
    setOrder(updated);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="p-4 md:p-6 bg-[#F9F7F7] min-h-screen font-[play]"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#67216D] hover:underline mb-4 cursor-pointer"
      >
        <FiArrowLeft className="mr-2" />
        Back to Orders
      </button>

      <div ref={printRef} className="print-section">
        <h1 className="text-2xl font-bold mb-6">Order Details - </h1>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Detail
              label="Customer Name"
              value={''}
            />
            <Detail label="Phone Number" value={order.phoneNumber} />
            <Detail label="Email" value={order.email} />
            <Detail label="City" value={order.city} />
            <Detail label="Country" value={order.country} />
            <Detail label="Address" value={order.fullAddress} />
            <Detail
              label="Order Date"
              value={new Date(order.createdAt).toLocaleString()}
            />
            <Detail label="Delivery Method" value={order.deliveryMethod} />
            <Detail
              label="Delivery Charge"
              value={`GH₵ ${order.deliveryCharge}`}
            />
            <Detail label="Estimated Tax" value={`GH₵ ${order.estimatedTax}`} />
            <Detail label="Discount" value={`GH₵ ${order.discount}`} />
            <Detail label="Subtotal" value={`GH₵ ${order.subTotal}`} />
            <Detail label="Total" value={`GH₵ ${order.totalAmount}`} />
            <Detail label="Payment Method" value={order.paymentMethod} />

            {/* Payment status */}
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

            {/* Order status */}
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
              </select>
            </div>
          </div>

          {/* Product Details Section */}
          {order.product && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Detail label="Product Name" value={order.product.name} />
                <Detail
                  label="Product Price"
                  value={`GH₵ ${order.product.price}`}
                />
                <Detail label="Quantity" value={order.quantity} />
                <Detail
                  label="Product Description"
                  value={order.product.description}
                />
               
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SingleOrderDetails;
