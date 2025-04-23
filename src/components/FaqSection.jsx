import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What products do you offer?",
    answer:
      "We specialize in skincare, cosmetics, healthcare products, and cleaning agents. Our products are made with high-quality, eco-friendly ingredients.",
  },
  {
    question: "Where is your company located?",
    answer:
      "Our head office is located at PMB CT 101 Cantonments, Accra-Ghana. You can also find us at GICEL, SCC - Weija, Accra-Ghana.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place an order directly from our website. For bulk or custom orders, please contact our sales support team.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to select regions. Please contact our support for details about your specific location.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via phone at +233 (0) 208365929 or +233 (0) 540746898, or send us an email through our contact form.",
  },
];

// Motion variants
const faqItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white w-full py-16 px-4 sm:px-8 md:px-12 lg:px-20 font-[play] mt-10 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-[#67216D] text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h3>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={faqItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-b border-gray-200 pb-3"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
              >
                <span className="text-lg text-gray-800 font-medium">
                  {faq.question}
                </span>
                <span className="text-[#67216D] cursor-pointer">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="text-gray-700 pb-4 pr-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm md:text-base">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
