import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiUploadCloud, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const CreateAd = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previewURLs]);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newFiles = [...files];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setImages(newImages);
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
      <Link to={"/dashboard/vendorAds"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" flex w-ful justify-end mb-5"
        >
          <button
            title="Back to all Products Page"
            className="text-[#4A235A] hover:text-[#513E5F] transition-colors duration-200 flex items-center gap-2 cursor-pointer "
          >
            <FiArrowLeft size={24} />
            <span className="hidden md:inline font-[play]">Back</span>
          </button>
        </motion.div>
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <MdPostAdd size={30} className="text-[#FF6C2F]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] font-[play]">
          Add a New Product
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Short Description
          </label>
          <input
            type="text"
            placeholder="A short summary"
            
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Description
          </label>
          <textarea
            placeholder="Detailed description of the product and its purpose"
            
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
            
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Usage Instructions
          </label>
          <textarea
            placeholder="Explain how the product should be used"
            
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Price
          </label>
          <input
            type="text"
            placeholder="e.g. GH₵ 45"
            
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Category
          </label>
          <select
            className="w-full border rounded-lg px-4 py-2 text-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          >
            <option value="">Select a category</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>

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
              title="Add an Image or Images to the product"
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg font-[play]"
            >
              <FiUploadCloud size={18} />
              Upload Images
            </label>
          </div>

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

        <div className="flex justify-end gap-4 mt-6">
          <Link to={"/dashboard/vendorAds"}>
            <motion.button
              title="Cancel & Back to All Products"
              whileTap={{ scale: 0.95 }}
              type="button"
              className="flex items-center gap-2 bg-red-300 text-[#9d0505] px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer"
            >
              <FiX size={18} />
              Cancel
            </motion.button>
          </Link>

          <motion.button
            title="Publish A New Product"
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex text-sm md:text-[16px] items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer"
          >
            <AiOutlinePlus size={18} />
            Publish Product
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateAd;
