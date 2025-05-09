import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiMoreVertical,
  FiTrash2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../images/cosmetics2.jpg";

// 🛒 Zustand store for cart state management
import useCartStore from "../store/cartStore";

const NavBar = ({ setIsBlurred, setSearchQuery }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [query, setQuery]= useState("");

  // function to handling Searching
  const handleSearchChange = (e) =>{
    setQuery(e.target.value);
    setSearchQuery(e.target.value); // Pass search query up to parent component
  }

  // Zustand store values
  const cart = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartCount = cart.length;
  const totalCost = useCartStore((state) => state.getTotalCost());

  // Compute total quantity of items in cart
  const totalItems = useCartStore((state) => state.getTotalQuantity());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses =
    "text-[#14245F] hover:text-[#404E7B] transition-colors duration-300";
  const ActiveNavLink =
    "text-[white] bg-[#14245F] hover:text-gray-100 px-4 py-1 duration-300 rounded-lg";

  // function to toggle the blur mode when the user clicks on the menu icon
  const toggleMenuIcon = () => {
    setShowMobileMenu((prev) => {
      const newState = !prev;
      setIsBlurred(newState);

      return newState;
    });
  };

  // prevent scrolling when the menu is openned
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showMobileMenu]);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 font-[play] transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-white/60 shadow-md" : "bg-white"
      }`}
    >
      <div className="w-full md:h-15 flex justify-between items-center px-4 py-3 md:px-10 relative">
        {/* === Desktop Nav Links === */}
        <nav className="hidden md:flex gap-6 md:text-[18px] items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? ActiveNavLink : navLinkClasses
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? ActiveNavLink : navLinkClasses
            }
          >
            About
          </NavLink>
          <NavLink
            to="/adverts"
            className={({ isActive }) =>
              isActive ? ActiveNavLink : navLinkClasses
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? ActiveNavLink : navLinkClasses
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* === Brand Logo & Admin Link === */}
        <div className="flex flex-col items-start">
          <div className="text-lg md:text-[50px] font-bold logo text-[#561256]">
            Faivich
          </div>
          <NavLink
            to="/login"
            className="text-[11px] text-blue-950 hover:underline italic mt-1 block md:absolute md:top-1 md:right-0 md:p-4 md:mt-0"
          >
            Admin
          </NavLink>
        </div>

        {/* === Icons Section === */}
        <div className="flex items-center gap-4">
          {/* Search */}
            <form>
          <div className="relative flex items-center">

            <FiSearch
              onClick={() => setShowSearch((prev) => !prev)}
              className="cursor-pointer text-xl md:text-2xl text-[#14245F]"
              />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search Products..."
              className="hidden md:inline-block ml-2 px-3 py-1 border border-[#561256] rounded-md text-sm text-[#14245F] focus:outline-none"
              />
          </div>
              </form>

          {/* === Cart Icon + Badge === */}
          <div className="relative">
            <div
              onClick={() => setShowCartDropdown((prev) => !prev)}
              className="cursor-pointer relative"
            >
              <FiShoppingCart className="text-xl md:text-2xl text-[#14245F] mr-8" />
              <span className="absolute w-4 h-4 -top-3 right-7 bg-[#F50057] text-white text-xs text-center font-bold rounded-full border border-[#561256]">
                {cartCount}
              </span>
            </div>

            {/* === Cart Dropdown === */}
            <AnimatePresence>
              {showCartDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  className="
        fixed sm:absolute
        bottom-0 sm:top-12
        left-0 sm:left-auto right-0 sm:right-4
        w-full md:h-70 sm:w-[95vw] sm:max-w-[360px]
        bg-white  sm:border border-gray-200
        shadow-[0_10px_30px_rgba(0,0,0,0.1)] sm:shadow-lg
        rounded-lg sm:rounded-lg
        z-[999]
      "
                >
                  {/* Scrollable Cart Items */}
                  <div className="max-h-[50vh] sm:max-h-[300px] overflow-y-auto p-4 space-y-4 bg-white rounded-lg">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center py-10">
                        <FiShoppingCart className="text-[64px] text-gray-300 mb-4" />
                        <p className="text-base sm:text-lg font-semibold text-gray-600">
                          Your basket is empty
                        </p>
                        <NavLink
                          to="/adverts"
                          className="mt-4 inline-block bg-[#561256] hover:bg-[#6f2a6f] text-white px-4 py-2 rounded-md text-sm transition"
                          onClick={() => setShowCartDropdown(false)}
                        >
                          Start Shopping
                        </NavLink>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 border-b-[1px] pb-3 border-gray-200"
                        >
                          <img
                            src={item.imageUrl || img1}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex flex-col flex-1 text-sm sm:text-base">
                            <span className="font-semibold text-[#14245F] truncate">
                              {item.title}
                            </span>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() =>
                                  item.quantity > 1 &&
                                  useCartStore
                                    .getState()
                                    .updateCartItemQuantity(
                                      item._id,
                                      item.quantity - 1
                                    )
                                }
                                className="w-5 h-5 sm:w-6 sm:h-6 border border-[#561256] text-[#561256] text-center rounded text-sm font-bold cursor-pointer hover:bg-gray-50"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  useCartStore
                                    .getState()
                                    .updateCartItemQuantity(
                                      item._id,
                                      Math.max(1, parseInt(e.target.value) || 1)
                                    )
                                }
                                className="w-12 text-center border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() =>
                                  useCartStore
                                    .getState()
                                    .updateCartItemQuantity(
                                      item._id,
                                      item.quantity + 1
                                    )
                                }
                                className="w-5 h-5 sm:w-6 sm:h-6 border border-[#561256] text-[#561256] text-center rounded text-sm font-bold cursor-pointer hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>

                            {/* Price item */}
                            <span className="text-gray-600 mt-1 text-xs sm:text-sm">
                              GHC{item.price}
                            </span>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-600 hover:text-red-800 text-xs flex items-center cursor-pointer"
                          >
                            <FiTrash2 className="mr-1" /> Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer Section */}
                  {cart.length > 0 && (
                    <div className="border-t p-3 space-y-2 bg-white mt-5">
                      <div className="text-sm text-gray-700 font-medium flex items-center justify-between">
                        <p>
                          Total Quantity:{" "}
                          <span className="font-bold text-[#14245F]">
                            {totalItems}
                          </span>
                        </p>
                        <p>
                          Total Price:{" "}
                          <span className="font-bold text-[#14245F]">
                            GHC {totalCost.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <NavLink
                          to="/checkout"
                          onClick={() => setShowCartDropdown(false)}
                          className="bg-[#561256] hover:bg-[#6f2a6f] text-white py-2 px-4 rounded-md transition duration-200 text-sm w-full text-center"
                        >
                          Proceed to Checkout
                        </NavLink>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <FiMoreVertical
              className="text-xl text-[#14245F] cursor-pointer"
              onClick={toggleMenuIcon}
            />
          </div>
        </div>

        {/* === Mobile Nav === */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full w-[60%] h-[300px] right-4 mt-2 bg-white shadow-md rounded-lg flex flex-col items-center justify-around px-4 py-2 z-40 md:hidden"
            >
              <NavLink
                to="/"
                className={navLinkClasses}
                onClick={() => {
                  setShowMobileMenu(false);
                  setIsBlurred(false);
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={navLinkClasses}
                onClick={() => {
                  setShowMobileMenu(false);
                  setIsBlurred(false);
                }}
              >
                About
              </NavLink>
              <NavLink
                to="/adverts"
                className={navLinkClasses}
                onClick={() => {
                  setShowMobileMenu(false);
                  setIsBlurred(false);
                }}
              >
                Shop
              </NavLink>
              <NavLink
                to="/contact"
                className={navLinkClasses}
                onClick={() => {
                  setShowMobileMenu(false);
                  setIsBlurred(false);
                }}
              >
                Contact
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile search input field */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "48px", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 md:hidden bg-transparent p-2"
          >
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full h-full px-4 py-3 border border-[#561256] rounded-md text-[#14245F] focus:outline-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
