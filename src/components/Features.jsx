import React from 'react'
import {FaTruck, FaUndo, FaMapMarkedAlt } from "react-icons/fa";

const Features = () => {
  return (
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-[#14245F] font-[play]">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md">
        <FaUndo className="mx-auto text-3xl mb-2" />
        <h3 className="font-bold">Free Returns</h3>
        <p className="text-sm">Free return delivery</p>
      </div>
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md">
        <FaTruck className="mx-auto text-3xl mb-2" />
        <h3 className="font-bold">Fast Delivery</h3>
        <p className="text-sm">On every order</p>
      </div>
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md">
        <FaMapMarkedAlt className="mx-auto text-3xl mb-2" />
        <h3 className="font-bold">Order Tracking</h3>
        <p className="text-sm">Delivery Estimates</p>
      </div>
    </div>
  );
}

export default Features