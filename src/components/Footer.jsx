import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import  toast  from "react-hot-toast";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-[#4A235A] text-white pt-10 pb-4 px-6 md:px-10 font-[play]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start">
        {/* 🟣 Brand & Subscribe */}
        <div className="space-y-4">
          <img src={logo2} alt="image logo" className="md:w-40 w-30" />
          <p className="text-sm">
            Subscribe to get the latest offers, updates, and product drops.
          </p>
          <form
            className=" w-full flex items-center gap-2"
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
              className="bg-[#F50057] text-white px-4 py-2 rounded-md hover:bg-[#513E5F] transition cursor-pointer"
            >
              Subscribe
            </motion.button>
          </form>
          <div className="flex gap-4 text-xl">
            <a
              href="https://www.instagram.com/faivichworld/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                title="Visit Instagram"
                className="hover:scale-110 transition hover:text-[#F50057]"
              />
            </a>
            <a
              href="https://www.facebook.com/people/faivichworld/100088610420065/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                title="Visit Facebook"
                className="hover:scale-110 transition hover:text-[#F50057]"
              />
            </a>
            <a
              href="https://gh.linkedin.com/company/faivich"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                title="Visit LinkedIn"
                className="hover:scale-110 transition hover:text-[#F50057]"
              />
            </a>
            <a
              href="https://twitter.com/faivichworld"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                title="Visit Twitter"
                className="hover:scale-110 transition hover:text-[#F50057]"
              />
            </a>
          </div>
        </div>

        {/* 🔗 Navigation */}
        <div className="space-y-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-400">Contact</h4>
          <ul className="space-y-2 text-sm">
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
      </div>
    </motion.footer>
  );
};

export default Footer;
