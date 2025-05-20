import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import useProductStore from "../../store/productStore";
import Spinner from "../../components/Spinner";

const SingleAd = () => {
  const { id } = useParams();
  const { singleProduct, fetchSingleAd, loading, error } = useProductStore();

  const [selectedImage, setSelectedImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch product on mount
  useEffect(() => {
    fetchSingleAd(id);
  }, [id, fetchSingleAd]);

  // Set initial image when product loads
  useEffect(() => {
    if (singleProduct?.pictures && singleProduct.pictures.length > 0) {
      setSelectedImage(singleProduct.pictures[0]);
      setCurrentIndex(0);
    }

    console.log("Single Product:", singleProduct);
  }, [singleProduct]);

  const handlePrev = () => {
    if (!singleProduct?.pictures) return;
    const newIndex =
      (currentIndex - 1 + singleProduct.pictures.length) %
      singleProduct.pictures.length;
    setSelectedImage(singleProduct.pictures[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (!singleProduct?.pictures) return;
    const newIndex = (currentIndex + 1) % singleProduct.pictures.length;
    setSelectedImage(singleProduct.pictures[newIndex]);
    setCurrentIndex(newIndex);
  };

  // console.log("Category:", singleProduct.category);
  // console.log("First category name:", singleProduct.category?.[0]?.name);

  if (loading) return <Spinner message="Loading Product Details " />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!singleProduct) return <div className="p-4">No product found</div>;

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
        {/* Left: Image Viewer */}
        <div className="md:w-1/2 md:sticky top-10 self-start">
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <img
              src={`https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${selectedImage}`}
              alt="Main product"
              className="w-full h-[350px] object-cover rounded-lg bg-white"
              loading="lazy"
            />
          </div>

          {/* Thumbnails */}
          {singleProduct.pictures?.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <FiChevronLeft size={20} />
              </button>

              <div className="flex gap-2 overflow-x-auto">
                {singleProduct.pictures.map((img, index) => (
                  <img
                    key={index}
                    loading="lazy"
                    src={`https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${img}`}
                    onClick={() => {
                      setSelectedImage(img);
                      setCurrentIndex(index);
                    }}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded cursor-pointer bg-white border ${
                      selectedImage === img
                        ? `https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${selectedImage}`
                        : `https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${singleProduct.pictures[0]}`
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
          )}
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 space-y-4 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#67216D] mb-4">
            Product Information
          </h2>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Product Name
            </h3>
            <p className="text-md text-[#555]">{singleProduct.name}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Why You'll Love This Product
            </h3>
            <p className="text-md text-[#555]">{singleProduct.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              What Makes This Product Special?
            </h3>
            <p className="text-md text-[#555] whitespace-pre-line leading-relaxed">
              {singleProduct.desDetail}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Key Ingredients
            </h3>
            <p className="text-md text-[#555] whitespace-pre-line leading-relaxed">
              {singleProduct.ingredients}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">
              Simple Steps to Get the Best Results
            </h3>
            <p className="text-md text-[#555] whitespace-pre-line leading-relaxed">
              {singleProduct.usage}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">Price</h3>
            <p className="text-md text-[#555]">
              {" "}
              GH{"\u20B5"} {singleProduct.price}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#777186]">Category</h3>
            <p className="text-md text-[#555]">
              {singleProduct.category?.[0]?.name || "No Category"}
            </p>
          </div>

          <div className="w-full h-5 flex justify-end text-sm text-[#4A235A] hover:text-[#513E5F] hover:underline">
            <Link
              to={`/dashboard/updateAd/${singleProduct.id}`}
              title="Edit Published Product"
            >
              Edit Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAd;
