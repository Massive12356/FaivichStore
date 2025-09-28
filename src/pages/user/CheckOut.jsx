import React, { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { FaMotorcycle, FaShuttleVan, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { useOrderStore } from "../../store/OrderStore";
import PaystackPop from '@paystack/inline-js';

const CheckOut = () => {
  const cartItems = useCartStore((state) => state.cartItems);// get values from zustand store
  const getTotalCost = useCartStore((state) => state.getTotalCost); // get values from zustand store
  const clearCart = useCartStore((state) => state.clearCart); // clear cart
  const navigate = useNavigate();// for routing
  const [showModal, setShowModal] = useState(false);

  const { postOrder, isLoading, orderData, setOrderField, bulkSetOrderData } =
    useOrderStore();

  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  const confirmOrder = async () => {
    try {

      const products = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));


      bulkSetOrderData({
        products,
        subTotal,
        deliveryCharge: 10,
        estimatedTax,
        quantity: cartItems.reduce((acc, item) => acc + item.quantity, 2)
      });

      console.log('Final Payload::', useOrderStore.getState().orderData);

      const response = await postOrder();
      console.log(response)
      setShowModal(false);
      const popup = new PaystackPop();
      popup.resumeTransaction(response.access_code, {
        onSuccess: () => {
          toast.success("Order placed successfully!");
          clearCart();
          navigate("/adverts");
        }
      });
    } catch (error) {
      console.log("Error Message", error);
      toast.error("Failed to place order.");
      setShowModal(false);
    }
  };


  const orderCancelled = () => {
    setShowModal(false);
    toast.success('Order cancelled')
    clearCart();

  }


  const subTotal = getTotalCost();

  const estimatedTax = parseFloat((subTotal * 0.155).toFixed(2));

  return (
    <div className="min-h-screen pt-32 px-6 md:px-20 bg-gray-100/40">
      <h2 className="text-[25px] md:text-6xl  font-bold mb-8 text-[#561256] text-center">
        Checkout
      </h2>

      <div className="flex  lg:flex-row gap-10">

        <form className="w-full lg:w-2/3 space-y-8 bg-white p-4 rounded-lg">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Kwame"
                  value={orderData.firstName}
                  onChange={(e) => setOrderField("firstName", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Nkrumah"
                  value={orderData.lastName}
                  onChange={(e) => setOrderField("lastName", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="nkrumah@example.com"
                  value={orderData.email}
                  onChange={(e) => setOrderField("email", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+233 501234xxxx"
                  value={orderData.phoneNumber}
                  onChange={(e) => setOrderField("phoneNumber", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Address
                </label>
                <textarea
                  type="text"
                  value={orderData.fullAddress}
                  onChange={(e) => setOrderField("fullAddress", e.target.value)}
                  placeholder="123 Main St, Apartment 4B"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none h-28 resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  value={orderData.country}
                  onChange={(e) => setOrderField("country", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option defaultChecked>country of residence</option>
                  <option> Ghana</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Zip-Code
                </label>
                <input
                  type="text"
                  placeholder="00233"
                  value={orderData.zipCode}
                  onChange={(e) => setOrderField("zipCode", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  City
                </label>
                <select
                  value={orderData.city}
                  onChange={(e) => setOrderField("city", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option>Select a city</option>
                  <option>Accra</option>
                  <option>Kumasi</option>
                  <option>Tamale</option>
                  <option>Sunyani</option>
                  <option>Cape Coast</option>
                  <option>Koforidua</option>
                  <option>Bolgatanga</option>
                  <option>Wa</option>
                  <option>Ho</option>
                  <option>Sekondi-Takoradi</option>
                  <option>Damongo</option>
                  <option>Techiman</option>
                  <option>Goaso</option>
                  <option>Sefwi Wiawso</option>
                  <option>Nalerigu</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="w-full border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    value="Motorcycle"
                    checked={orderData.deliveryMethod === "Motorcycle"}
                    onChange={() =>
                      setOrderField("deliveryMethod", "Motorcycle")
                    }
                    name="shipping"
                    className="accent-[#67216D] w-5 h-5"
                  />
                  <FaMotorcycle className="text-2xl text-[#67216D]" />
                  <span className="text-gray-800 font-medium">
                    Delivery by Motorcycle
                  </span>
                </label>
              </div>

              <div className="w-full border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="Courier Van"
                    checked={orderData.deliveryMethod === "Courier Van"}
                    onChange={() =>
                      setOrderField("deliveryMethod", "Courier Van")
                    }
                    className="accent-[#67216D] w-5 h-5"
                  />
                  <FaShuttleVan className="text-2xl text-[#67216D]" />
                  <span className="text-gray-800 font-medium">
                    Delivery by Courier Van
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="accent-purple-700"
                />
                <FaCcVisa className="text-xl text-blue-600" />
                <FaCcMastercard className="text-xl text-red-600" />
                <span>Credit / Debit Card</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="CVC/CVV"
                  className="border border-gray-300 rounded px-4 py-2"
                />
              </div> */}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Mobile Money"
                  checked={orderData.paymentMethod === "Mobile Money"}
                  onChange={() =>
                    setOrderField("paymentMethod", "Mobile Money")
                  }
                  className="accent-purple-700"
                />
                <span>Mobile Money</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={orderData.paymentMethod === "Cash on Delivery"}
                  onChange={() =>
                    setOrderField("paymentMethod", "Cash on Delivery")
                  }
                  className="accent-purple-700"
                />
                <span>Cash on Delivery</span>
              </label>

              <div className="flex items-center gap-2 bg-[#f5005612] text-[#F50057] text-sm p-6 rounded">
                <FaLock />
                <span>
                  We adhere entirely to the data security standards of the
                  payment industry.
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* ==========================
            📦 RIGHT SIDE: ORDER SUMMARY
        =========================== */}
        <div className="w-full lg:w-1/3 h-auto bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="divide-y mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="py-3 flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>GHC{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm text-gray-700 mb-6">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>GHC{subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (15.5%):</span>
              <span>GHC{estimatedTax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <button
              onClick={() => navigate("/adverts")}
              className="w-full md:w-auto px-6 border border-[#67216D] text-[#67216D] py-3 rounded-md hover:bg-purple-50 transition-all cursor-pointer"
            >
              Back to Shop
            </button>
            <button
              onClick={handlePlaceOrder}
              className="w-full md:w-auto bg-[#67216D] text-white px-5 py-3 rounded-md hover:bg-[#7B2A79] transition-all duration-300 cursor-pointer"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
      {/* confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30  z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Your Order
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to place this order? Once confirmed, it
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={orderCancelled}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className={`px-4 py-2 rounded bg-[#67216D] text-white hover:bg-[#7B2A79] transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                disabled={isLoading}
              >
                {isLoading ? " Processing" : "Yes, Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;