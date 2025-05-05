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
  shortDesc:
    "Gentle and effective serum for all skin types, providing deep hydration and a healthy glow.",
  longDesc:
    "Our Hydrating Skincare Serum is a luxurious, deeply moisturizing formula designed to replenish and revitalize dry, dull skin. This serum is packed with powerful botanical extracts, peptides, and antioxidants to deeply hydrate and protect the skin. The lightweight texture absorbs quickly without leaving any greasy residue, leaving your skin feeling refreshed and nourished. Ideal for daily use, it works to restore the skin's natural moisture balance, giving you a radiant, smooth complexion. Whether you're dealing with dehydration or looking to give your skin a boost, this serum is the perfect addition to your skincare routine.",
  price: 129.99,
  ingredients:
    "Water, Glycerin, Hyaluronic Acid, Aloe Vera, Vitamin E, Rose Extract, Green Tea Extract, Peptides, Witch Hazel, Jojoba Oil, Shea Butter",
  usage:
    "Apply a few drops to clean, dry skin after cleansing and toning. Gently massage the serum into your face and neck using upward circular motions. Use morning and evening for best results. Follow with your favorite moisturizer to lock in hydration.",
  images: [
    "/images/cosmetics2.jpg",
    "/images/cosmetics7.jpg",
    "/images/cosmetics10.jpg",
  ],
};


const SingleAdvert = () => {
  const [selectedImage, setSelectedImage] = useState(sampleProduct.images[0]);
  const [quantity, setQuantity] = useState(1);

  // 🛒 Add product to cart using Zustand store
  const addToCart = () => {
    useCartStore.getState().addToCart(sampleProduct, quantity);
    toast.success(`${sampleProduct.title} added to cart!`);
  };

  // 🔁 Function to increase or decrease quantity
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
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🔳 Left Section: Thumbnails + Main Image */}
        <div className="flex flex-col-reverse lg:flex-row w-full lg:w-1/2 gap-4">
          <div className="flex lg:flex-col gap-4 max-h-[500px] overflow-x-auto lg:overflow-y-auto scrollbar-hide">
            {sampleProduct.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-[#67216D]"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

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
          <div className="text-gray-700 leading-relaxed mb-6">
            <h3 className="text-lg font-semibold mb-2">
              What Makes This Product Special?
            </h3>
            <p>{sampleProduct.longDesc}</p>
          </div>

          {/* ============================== */}
          {/* 🧴 Ingredients Section */}
          {/* ============================== */}
          <div className="text-gray-700 leading-relaxed mb-6">
            <h3 className="text-lg font-semibold mb-2">Key Ingredients</h3>
            <p>{sampleProduct.ingredients}</p>
          </div>

          {/* ============================== */}
          {/* 📝 Usage Instructions Section */}
          {/* ============================== */}
          <div className="text-gray-700 leading-relaxed">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <p>{sampleProduct.usage}</p>
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
