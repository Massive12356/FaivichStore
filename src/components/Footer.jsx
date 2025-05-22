import React,{ useState, useEffect } from "react";
import { Link,NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-[#4A235A] text-white pt-10 pb-4 px-6 md:px-10 font-[play]"
    >
      <div className="w-full flex flex-col md:flex-row flex-wrap items-start justify-between gap-6">
        {/* 🟣 Brand & Subscribe */}
        <div className="w-full md:w-1/4 space-y-4 text-center md:text-left">
          {/* <img
            src={logo2}
            alt="image logo"
            className="mx-auto md:mx-0 md:w-40 w-30"
          /> */}

          <h1 className="text-3xl md:text-5xl font-bold text-[#fdc500]">
            Faivich
          </h1>
          <p className="text-sm">
            Subscribe to get the latest offers, updates, and product drops.
          </p>
          <form
            className="w-full flex flex-col sm:flex-row items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you for subscribing!");
              e.target.reset();
            }}
          >
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-md bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-[#F50057]"
              required
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="bg-[#F50057] text-white px-4 py-2 rounded-md hover:bg-[#513E5F] transition cursor-pointer w-full sm:w-auto"
            >
              Subscribe
            </motion.button>
          </form>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a
              href="https://www.instagram.com/faivichworld/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:scale-110 transition hover:text-[#F50057]" />
            </a>
            <a
              href="https://www.facebook.com/people/faivichworld/100088610420065/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:scale-110 transition hover:text-[#F50057]" />
            </a>
            <a
              href="https://gh.linkedin.com/company/faivich"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:scale-110 transition hover:text-[#F50057]" />
            </a>
            <a
              href="https://twitter.com/faivichworld"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:scale-110 transition hover:text-[#F50057]" />
            </a>
          </div>
        </div>

        {/* 🔗 Quick Links */}
        <div className="w-full md:w-1/5 space-y-4 text-center md:text-left mt-6 md:mt-0">
          <h4 className="text-lg font-semibold text-gray-400">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#F50057]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#F50057]">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F50057]">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-[#F50057]">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* 🧾 Legal */}
        <div className="w-full md:w-1/5 space-y-4 text-center md:text-left mt-6 md:mt-0">
          <h4 className="text-lg font-semibold text-gray-400">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-[#F50057]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/return-policy" className="hover:text-[#F50057]">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-[#F50057]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-[#F50057]">
                Shipping & Delivery Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div className="w-full md:w-1/4 space-y-4 text-center md:text-left mt-6 md:mt-0">
          <h4 className="text-lg font-semibold text-gray-400">Contact</h4>
          <ul className="text-sm space-y-2 whitespace-nowrap">
            <li>📍 PMB CT 101 Cantonments, Accra-Ghana</li>
            <li>📌 GICEL, SCC - Weija, Accra-Ghana</li>
            <li>📞 +233 (0) 208365929 / +233 (0) 540746898</li>
            <li>📧 faivichenterprise@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* 🔗 Bottom Notice */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center border-t border-gray-600 pt-4 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Faivich. All rights reserved.</p>
        <NavLink
          to="/login"
          className="text-[11px] text-[#F50057] font-bold hover:underline  mt-1 block md:ml-10"
        >
          Admin
        </NavLink>
      </div>

      {isVisible && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#F50057] text-white p-3 rounded-full shadow-lg hover:bg-[#513E5F] transition duration-300"
          aria-label="Back to Top"
        >
          {" "}
          <FaArrowUp size={18} />
        </motion.button>
      )}
    </motion.footer>
  );
};

export default Footer;
