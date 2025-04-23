import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import Features from "../../components/Features";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";

// 🧪 Mock product data — replace this with real data fetched from your backend
const sampleProduct = {
  _id: "123", // Required to uniquely identify products in cart
  title: "Hydrating Skincare Serum",
  shortDesc: "Gentle and effective serum for all skin types.",
  longDesc:
    "This deeply hydrating serum is formulated with botanical extracts and peptides...",
  price: 129.99,
  images: [
    "/src/images/cosmetics2.jpg",
    "/src/images/cosmetics7.jpg",
    "/src/images/cosmetic9.jpg",
    "/src/images/cosmetics10.jpg",
  ],
};

const SingleAdvert = () => {
  // 🖼️ Track which product image is currently selected
  const [selectedImage, setSelectedImage] = useState(sampleProduct.images[0]);

  // 🔢 Track the quantity of items the user wants to purchase
  const [quantity, setQuantity] = useState(1);

  // 🛒 Add product to cart using Zustand store
  const addToCart = () => {
    useCartStore.getState().addToCart(sampleProduct, quantity); // ✅ Correctly pass quantity as second parameter
    toast.success(`${sampleProduct.title} added to cart!`);
  };

  // 🔁 Function to increase or decrease quantity, preventing less than 1
  const handleQty = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  return (
    <motion.div
      className="p-6 font-[play] min-h-screen bg-[#F9F7F7] pt-40"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", delay: 0.1 }}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #C1D0DE, #F0E9B9, #FBCBC9)",
      }}
    >
      {/* ============================== */}
      {/* 🖼️ Product Image & Details */}
      {/* ============================== */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🔳 Left Section: Thumbnails + Main Image */}
        <div className="flex flex-col-reverse lg:flex-row w-full lg:w-1/2 gap-4">
          {/* 📸 Thumbnails */}
          <div className="flex lg:flex-col gap-4 max-h-[500px] overflow-x-auto lg:overflow-y-auto scrollbar-hide">
            {sampleProduct.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)} // 🖱️ Click to select
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-[#67216D]"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

          {/* 🖼️ Main Image Preview */}
          <div className="flex-1 rounded-lg shadow-lg p-4 flex items-center justify-center h-[500px]">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* 📋 Right Section: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col pr-2">
          <h1 className="text-3xl font-bold text-[#67216D] mb-2">
            {sampleProduct.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {sampleProduct.shortDesc}
          </p>
          <p className="text-2xl text-[#FF6C2F] font-semibold mb-4">
            GHC {sampleProduct.price.toFixed(2)}
          </p>

          {/* ============================== */}
          {/* 🔢 Quantity Selector + Add to Cart */}
          {/* ============================== */}
          <div className="flex items-center gap-4 mb-6">
            {/* ➖➕ Quantity Control */}
            <div className="flex items-center border border-[#67216D] rounded">
              <button
                onClick={() => handleQty("dec")}
                className="p-2 text-[#67216D]"
              >
                <FiMinus />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => handleQty("inc")}
                className="p-2 text-[#67216D]"
              >
                <FiPlus />
              </button>
            </div>

            {/* 🛒 Add to Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-[#67216D] text-white px-6 py-2 rounded-lg shadow hover:bg-[#813E8C] cursor-pointer"
              onClick={addToCart}
            >
              Add to Cart
            </motion.button>
          </div>

          {/* ============================== */}
          {/* 📃 Product Full Description */}
          {/* ============================== */}
          <div className="text-gray-700 leading-relaxed">
            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
            <p>{sampleProduct.longDesc.repeat(20)}</p>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* 🌟 Extra Section: Features, etc */}
      {/* ============================== */}
      <div className="mt-12">
        <Features />
      </div>
    </motion.div>
  );
};

export default SingleAdvert;
