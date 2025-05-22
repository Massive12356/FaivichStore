import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiUploadCloud, FiXCircle, FiArrowLeft } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useProductStore from "../../store/productStore";

const CreateAd = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const {fetchProducts, createProduct } = useProductStore();// from zustand

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setLoading(true);
    setImages([]);
    setFiles([]);

    const result = await createProduct(formData);
    if (result.success) {
      await fetchProducts(true);
      toast.success("Product Published Successfully", { duration: 3000 });
      navigate("/dashboard/vendorAds");
    } else {
      toast.error("Failed to create product. Please try again.");
    }

    setLoading(false);
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="p-5 md:p-10 bg-[#F9F7F7] min-h-screen font-[play]"
    >
      <Link to={"/faivichRoom/vendorAds"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" flex w-full justify-end mb-5"
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
            name="name"
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
            name="description"
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
            name="desDetail"
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
            name="ingredients"
            placeholder="List the key ingredients used in this product"
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Usage Instructions
          </label>
          <textarea
            name="usage"
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
            name="price"
            placeholder="45"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Category
          </label>
          <select
            name="categoryName"
            className="w-full border rounded-lg px-4 py-2 text-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          >
            <option value="">Select a category</option>
            <option value="Skincare Products">
              Cosmetics / Skincare Products
            </option>
            <option value="Healthcare Products">Healthcare Products</option>
            <option value="Cleaning Agents">Cleaning Agents</option>
          </select>
        </div>

        {/* New Quantity Field */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            placeholder="Enter the available stock quantity"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-2 font-[play]">
            Upload Product Images
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              name="pictures"
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
          <Link to={"/faivichRoom/vendorAds"}>
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
            className={`flex text-sm md:text-[16px] items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-7 py-2 rounded-lg font-[play] font-semibold cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Publishing......
              </>
            ) : (
              <>
                <AiOutlinePlus size={18} />
                Publish Product
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateAd;
