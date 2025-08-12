import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiXCircle, FiUploadCloud, FiArrowLeft } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProductStore from "../../store/productStore";
import toast from "react-hot-toast";

const urlToFile = async (url, idx) => {

  const blob = await response.blob();
  return new File([blob], `image-${idx}.${blob.type.split("/")[1]}`, {
    type: blob.type,
  });
};

const UpdateAd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchSingleAd, updateProduct, singleProduct, isLoading } =
    useProductStore();
  const cloudinaryBaseURL = import.meta.env.VITE_CLOUDINARY_URL;

  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [usage, setUsage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [images, setImages] = useState([]); // preview URLs
  const [files, setFiles] = useState([]); 
  useEffect(() => {
    if (id) fetchSingleAd(id);
  }, [id]);


  useEffect(() => {
    if (!singleProduct) return;

    setProductName(singleProduct.name || "");
    setShortDescription(singleProduct.description || "");
    setDescription(singleProduct.desDetail || "");
    setIngredients(singleProduct.ingredients || "");
    setUsage(singleProduct.usage || "");
    setPrice(singleProduct.price || "");
    setQuantity(singleProduct.quantity || 1);
    

    const previews = singleProduct.pictures.map(
      (path) => `${cloudinaryBaseURL}${path}`
    );
    setImages(previews);

    (async () => {
      const urlFiles = await Promise.all(
        previews.map((url, idx) => urlToFile(url, idx))
      );
      setFiles(urlFiles);
    })();
  }, [singleProduct]);


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

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", shortDescription);
    formData.append("desDetail", description);
    formData.append("ingredients", ingredients);
    formData.append("usage", usage);
    formData.append("price", price);
    formData.append("quantity", quantity);
    // formData.append("category", category);

    files.forEach((file) => {
      formData.append("pictures", file);
    });

    const result = await updateProduct(id, formData);
    if (result.success) {
      toast.success("Product updated successfully!");
      navigate("/faivichRoom/vendorAds");
    } else {
      toast.error(result.message || "Failed to update product.");
    }
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
      <Link to={"/faivichRoom/vendorAds"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="flex w-ful justify-end mb-5"
        >
          <button className="text-[#4A235A] hover:text-[#513E5F] transition-colors duration-200 flex items-center gap-2 cursor-pointer">
            <FiArrowLeft size={24} />
            <span className="hidden md:inline font-[play]">Back</span>
          </button>
        </motion.div>
      </Link>

      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <MdPostAdd size={30} className="text-[#FF6C2F]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] font-[play]">
          Update Product
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        {/* Fields */}
        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Short Description
          </label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-28 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Usage Instructions
          </label>
          <textarea
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none"
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select a category</option>
            <option value="Skincare Products">Skincare Products</option>
            <option value="Healthcare Products">Healthcare Products</option>
            <option value="Cleaning Agents">Cleaning Agents</option>
          </select>
        </div> */}

        {/* Images */}
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
              htmlFor="image-upload"
              className="cursor-pointer flex items-center gap-2 bg-[#4A235A] hover:bg-[#513E5F] text-white px-4 py-2 rounded-lg"
            >
              <FiUploadCloud size={18} />
              Upload Images
            </label>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {images.map((img, index) => (
              <div key={index} className="relative border rounded-lg w-20 h-20">
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

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/faivichRoom/vendorAds">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-red-300 text-[#9d0505] px-7 py-2 rounded-lg font-[play]"
            >
              Cancel
            </motion.button>
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="bg-[#4A235A] text-white px-7 py-2 rounded-lg font-[play]"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateAd;
