import React, { useState } from "react";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../../assets/cleaningProduct.jpg";
import img2 from "../../assets/cosmeticProduct.jpg";
import img3 from "../../assets/HealthCareProduct.jpg";
import img4 from "../../assets/cosmeticProduct.jpg";

// Mock product data
const product = {
  name: "Cleaning Product 1",
  shortDescription: "Effective cleaning solution for homes and offices.",
  description:
    "A powerful cleaning solution designed for both home and office use. It cleans surfaces efficiently, leaving them spotless. ".repeat(
      2
    ),
  ingredients:
    "Water, Sodium Hypochlorite, Surfactants, Fragrance, Preservatives",
  usage:
    "Apply directly to the surface and wipe clean with a damp cloth. For tougher stains, let sit for a few minutes before wiping.",
  price: "$20",
  category: "Cleaning",
  images: [img1, img2, img3, img4],
};

const SingleAd = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle previous thumbnail
  const handlePrev = () => {
    const newIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  // Handle next thumbnail
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="p-4 md:p-10 bg-[#F9F7F7] min-h-screen font-[play]">
      {/* Back Button */}
      <Link to={"/dashboard/vendorAds"}>
        <div className="mb-6 flex items-center gap-3">
          <motion.button
            title="back to all products"
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-[#4A235A] hover:text-[#513E5F] text-lg font-semibold cursor-pointer"
          >
            <FiArrowLeft size={24} />
            <span className="ml-2">Back</span>
          </motion.button>
        </div>
      </Link>

      {/* Layout: Two Columns */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Fixed Image Viewer */}
        <div className="md:w-1/2 md:sticky top-10 self-start">
          {/* Main Image */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <img
              src={selectedImage}
              alt="Main product"
              className="w-full h-[350px] object-contain rounded-lg bg-white"
            />
          </div>

          {/* Thumbnails with arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => {
                    setSelectedImage(img);
                    setCurrentIndex(index);
                  }}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer bg-white border ${
                    selectedImage === img
                      ? "border-[#2E7D32]"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right: Product Details (Scrollable with the page) */}
        <div className="md:w-1/2 space-y-4 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#67216D] mb-4">
            Product Information
          </h2>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Product Name
            </h3>
            <p className="text-md text-[#555]">{product.name}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Why You'll Love This Product
            </h3>
            <p className="text-md text-[#555]">{product.shortDescription}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              What Makes This Product Special?
            </h3>
            <p className="text-md text-[#555] whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Ingredients */}
          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Key Ingredients
            </h3>
            <p className="text-md text-[#555] whitespace-pre-line leading-relaxed">
              {product.ingredients}
            </p>
          </div>

          {/* How to Use */}
          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Simple Steps to Get the Best Results
            </h3>
            <p className="text-md text-[#555] whitespace-pre-line leading-relaxed">
              {product.usage}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">Price</h3>
            <p className="text-md text-[#555]">{product.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">Category</h3>
            <p className="text-md text-[#555]">{product.category}</p>
          </div>

          <div className="w-full h-5 flex justify-end-safe text-sm text-[#4A235A] hover:text-[#513E5F] hover:underline">
            <Link to={"/dashboard/updateAd/:id"} title="Edit Published Product">
              {" "}
              Edit Product{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAd;
