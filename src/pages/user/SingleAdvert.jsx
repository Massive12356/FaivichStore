import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import Features from "../../components/Features";
import useCartStore from "../../store/cartStore";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/productStore";
import Spinner from "../../components/Spinner";

const SingleAdvert = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { singleProduct, fetchSingleAd, loading } = useProductStore();
  const [stockError, setStockError] = useState('');

  // const addToCart = () => {
  //   if (quantity > singleProduct.quantity) {
  //     setStockError("Not enough stock available.");
  //     setTimeout(() => setStockError(""), 3000);
  //     return;
  //   }

  //   useCartStore.getState().addToCart(singleProduct, quantity);
  //   setStockError(""); // Clear any previous error
  //   toast.success(`${singleProduct.name} added to cart!`);
  // };

  const addToCart = () => {
    const { cartItems, addToCart } = useCartStore.getState();

    // 1. Check if product already exists in cart
    const existingCartItem = cartItems.find(
      (item) => item.id === singleProduct.id
    );

    // 2. Calculate total potential quantity
    const potentialQuantity = existingCartItem
      ? existingCartItem.quantity + quantity
      : quantity;

    // 3. Validate against available stock
    if (potentialQuantity > singleProduct.quantity) {
      const available =
        singleProduct.quantity - (existingCartItem?.quantity || 0);
      const errorMessage =
        available > 0
          ? `Only ${available} more available in stock`
          : "No more items available";

      toast.error(errorMessage, {
        duration: 3000,
        position: "bottom-center",
        style: { background: "#F50057", color: "#fff" },
      });
      return;
    }

    // 4. Proceed with adding to cart if validation passes
    addToCart(singleProduct, quantity);
    setStockError("");
    toast.success(`${singleProduct.name} added to cart!`);
  };
  

  const handleQty = (type) => {
    const availableStock = singleProduct.quantity;

    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
      setStockError(""); // Clear error when adjusting
    }

    if (type === "inc") {
      if (quantity < availableStock) {
        setQuantity(quantity + 1);
        setStockError(""); // Clear error when valid
      } else {
        setStockError("Cannot exceed available stock.");
        setTimeout(() => setStockError(""), 3000);
      }
    }
  };
  
  

  // useEffect(() => {
  //   fetchSingleAd(id);
  //   setSelectedImage(undefined); // Reset selected image when product changes
  //   setQuantity(1); // Optionally reset quantity too
  // }, [id, fetchSingleAd]);

  // useEffect(() => {
  //   if (singleProduct?.pictures?.length && !selectedImage) {
  //     setSelectedImage(singleProduct.pictures[0]);
  //   }
  // }, [singleProduct, selectedImage]);

  useEffect(() => {
    fetchSingleAd(id);
    setQuantity(1);
  }, [id, fetchSingleAd]);

  useEffect(() => {
    if (singleProduct?.pictures?.length) {
      setSelectedImage(singleProduct.pictures[0]);
    }
  }, [singleProduct]);
  

  if (!singleProduct || loading) {
    return (
      <Spinner message="Loading Product Details"/>
    );
  }

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
            {singleProduct.pictures?.map((img, index) => (
              <img
                key={index}
                src={`https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${img}`}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
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
            {singleProduct.pictures?.length ? (
              <img
                src={
                  selectedImage
                    ? `https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${selectedImage}`
                    : `https://res.cloudinary.com/dp0kuhms5/image/upload/v1747053460/${singleProduct.pictures[0]}`
                }
                alt="Selected Product"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-400 italic text-center">
                No product image available
              </div>
            )}
          </div>
        </div>

        {/* 📋 Right Section: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col pr-2">
          <h1 className="text-3xl font-bold text-[#67216D] mb-2">
            {singleProduct.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {singleProduct.description}
          </p>
          <p className="text-2xl text-[#FF6C2F] font-semibold mb-4">
            GHC {singleProduct.price?.toFixed(2)}
          </p>
          <p className="text-[15px] text-[#FF6C2F] font-semibold mb-4">
            <span className="text-[#67216D]">Quantity Available:</span>{" "}
            {singleProduct.quantity}
          </p>

          {/* 🔢 Quantity Selector + Add to Cart */}
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
          {stockError && (
            <p className="text-sm text-red-600 font-bold mt-1 mb-3">{stockError}</p>
          )}
          {/* 📃 Product Full Description */}
          <div className="text-gray-700 leading-relaxed mb-6">
            <h3 className="text-lg font-semibold mb-2">
              What Makes This Product Special?
            </h3>
            <p>{singleProduct.desDetail}</p>
          </div>

          {/* 🧴 Ingredients Section */}
          <div className="text-gray-700 leading-relaxed mb-6">
            <h3 className="text-lg font-semibold mb-2">Key Ingredients</h3>
            <p>{singleProduct.ingredients}</p>
          </div>

          {/* 📝 Usage Instructions Section */}
          <div className="text-gray-700 leading-relaxed">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <p>{singleProduct.usage}</p>
          </div>
        </div>
      </div>

      {/* 🌟 Extra Section: Features */}
      <div className="mt-12">
        <Features />
      </div>
    </motion.div>
  );
};

export default SingleAdvert;
