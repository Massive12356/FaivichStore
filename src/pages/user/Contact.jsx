import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import FaqSection from "../../components/FaqSection";

// Parent slide-in
const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 0.8,
      staggerChildren: 0.25,
    },
  },
};

// Child animation
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = () => {
  return (
    <motion.section
      className="bg-[#F9F7F7] min-h-screen px-4 md:px-12 lg:px-20 py-10 font-[play] pt-40"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Heading & Intro */}
      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col items-center text-[#67216D]"
      >
        <h2 className="text-4xl md:text-6xl font-bold  mb-4">Contact Us</h2>
        <p className="text-sm md:text-lg max-w-4xl mx-auto mb-10 leading-relaxed text-center text-gray-700">
          Reach out to us with your inquiries, feedback, or requests. We're here
          to assist you. Contact us via phone, email, or our contact form. Our
          dedicated support team is available around the clock to answer your
          questions and provide assistance. We're just a message or call away.
        </p>
      </motion.div>

      {/* Info Boxes Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          variants={itemVariants}
          className="bg-white md:p-15 p-5 rounded-lg shadow-md text-center"
        >
          <FaEnvelope className=" size-10 md:size-20 text-[#67216D] mx-auto mb-3" />
          <h4 className="text-xl font-semibold text-[#67216D] mb-1">Support</h4>
          <p className="text-sm md:text-[15px] text-gray-700">
            faivichenterprise@gmail.com
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white md:p-15 p-5 rounded-lg shadow-md text-center"
        >
          <FaMapMarkerAlt className="size-10 md:size-20 text-[#67216D] mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-[#67216D] mb-1">Address</h4>
          <p className="text-sm md:text-[15px]  text-gray-700">
            PMB CT 101 Cantonments, Accra-Ghana
          </p>
          <p className="text-sm md:text-[15px]  text-gray-700">
            GICEL, SCC - Weija, Accra-Ghana.{" "}
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white md:p-15 p-5 rounded-lg shadow-md text-center"
        >
          <FaPhoneAlt className="size-10 md:size-20 text-[#67216D] mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-[#67216D] mb-1">
            Contact Us
          </h4>
          <p className="text-sm md:text-[15px] text-gray-700">
            ‪+233 (0) 208365929‬ / ‪+233 (0) 540746898‬
          </p>
        </motion.div>
      </div>

      {/* Map and Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Map */}
        <motion.div
          className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-md"
          variants={itemVariants}
        >
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4125.3036624381175!2d-0.3367364727952576!3d5.567885389057247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfa3e8e4e4938b%3A0x933cebcb4111a8cf!2sGicel%20Estates%20Inside%20SCC!5e0!3m2!1sen!2sgh!4v1745009275562!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="bg-white p-6 rounded-lg shadow-md space-y-5"
          variants={itemVariants}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-[#67216D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-[#67216D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-[#67216D] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6C2F]"
          ></textarea>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#67216D] text-white px-6 py-3 rounded-md hover:bg-[#7B2A79] transition-all duration-300 cursor-pointer"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
        {/* Frequently asked question component */}
        <FaqSection/>
    </motion.section>
  );
};

export default Contact;
