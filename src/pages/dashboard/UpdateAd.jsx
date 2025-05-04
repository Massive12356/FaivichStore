import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiUploadCloud,
  FiXCircle,
  FiArrowLeft,
  FiEdit,
} from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import {Link, useNavigate } from "react-router-dom";

const UpdateAd = () => {
  // State hooks for form fields
  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [usageInstructions, setUsageInstructions] = useState("");

  // State for image previews and actual files
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  // Handles image file selection and preview generation
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previewURLs]);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Removes an image preview and corresponding file
  const removeImage = (index) => {
    const newImages = [...images];
    const newFiles = [...files];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setImages(newImages);
    setFiles(newFiles);
  };

  // Handles form submission and resets all fields
  const handleSubmit = (e) => {
    e.preventDefault();

    // Example log – replace this with API call
    console.log({
      productName,
      shortDescription,
      description,
      price,
      category,
      files,
    });

    // Reset all form fields and image previews
    setProductName("");
    setShortDescription("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImages([]);
    setFiles([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="p-5 md:p-10 bg-[#F9F7F7] min-h-screen font-[play]"
    >
      {/* Back Button */}
      <Link to={"/dashboard/vendorAds"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" flex w-ful justify-end mb-5"
        >
          <button
            title="back to Published Products Page"
            className="text-[#4A235A] hover:text-[#513E5F] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <FiArrowLeft size={24} />
            <span className="hidden md:inline font-[play]">Back</span>
          </button>
        </motion.div>
      </Link>

      {/* Form Heading */}
      <div className="flex items-center gap-3 mb-8">
        <MdPostAdd size={30} className="text-[#FF6C2F]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] font-[play]">
          Update Product
        </h1>
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        {/* Product Name */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Short Description
          </label>
          <input
            type="text"
            placeholder="A short summary"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Description
          </label>
          <textarea
            placeholder="Detailed description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-28 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Ingredients
          </label>
          <textarea
            placeholder="List the key ingredients used in this product"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Usage Instructions
          </label>
          <textarea
            placeholder="Explain how the product should be used"
            value={usageInstructions}
            onChange={(e) => setUsageInstructions(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Price
          </label>
          <input
            type="text"
            placeholder="e.g. GHC45"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          >
            <option value="">Select a category</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-[#777186] font-semibold mb-2 font-[play]">
            Upload Product Images
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              title="Upload an Image or Multiple Images"
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg font-[play]"
            >
              <FiUploadCloud size={18} />
              Upload Images
            </label>
          </div>

          {/* Image Previews */}
          <div className="flex flex-wrap gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden w-20 h-20"
              >
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1"
                >
                  <FiXCircle className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {/* Cancel Button */}
          <Link to={"/dashboard/vendorAds"}>
            <motion.button
              title="Cancel & back to Published Products Page"
              whileTap={{ scale: 0.95 }}
              type="button"
              className="flex items-center gap-2 bg-red-300 text-[#9d0505] px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer"
            >
              <FiX size={18} />
              Cancel
            </motion.button>
          </Link>

          {/* Submit Button */}
          <motion.button
            title="Update Published Product Details"
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer"
          >
            <FiEdit size={20} />
            Update Product
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateAd;
