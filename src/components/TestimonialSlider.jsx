import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import testimonials from "../data/testimonials";

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => next(), 6000);
    return () => clearInterval(interval);
  }, []);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <section className="py-24 px-4 md:px-20 relative overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#561256] mb-4">
          What Our Customers Are Saying
        </h2>
        <p className="text-md md:text-lg text-gray-700 max-w-2xl mx-auto">
          Real experiences from our happy customers across all product
          categories — skincare, healthcare, and cleaning essentials.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) next();
              else if (swipe > swipeConfidenceThreshold) prev();
            }}
            className="bg-white p-10 rounded-xl shadow-xl flex flex-col items-center text-center relative"
          >
            {/* Quote icon */}
            <FaQuoteLeft className="absolute top-6 left-6 text-[#F50056] text-3xl opacity-30" />

            {/* Profile image */}
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#561256]"
            />

            {/* Feedback with two quote icons */}
            <div className="relative max-w-xl mx-auto text-[#561256]">
              <FaQuoteLeft className="inline-block text-2xl text-[#F50056] mr-2 align-top" />
              <p className="inline text-lg md:text-xl font-medium italic text-gray-700">
                {testimonials[index].feedback}
              </p>
              <FaQuoteRight className="inline-block text-2xl text-[#F50056] ml-2 align-bottom" />
            </div>

            {/* Name & Location */}
            <h4 className="text-[#561256] font-semibold text-lg">
              {testimonials[index].name}
            </h4>
            <span className="text-sm text-gray-500">
              {testimonials[index].location}
            </span>

            <div className="flex justify-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-lg ${
                    i < testimonials[index].rating
                      ? "text-[#F50056]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows Outside Card */}
        <div className="absolute top-1/2 left-4 md:left-0 -translate-y-1/2 -ml-8 md:-ml-12 z-10">
          <FaChevronLeft
            size={28}
            onClick={prev}
            className="text-[#561256] cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
        <div className="absolute top-1/2 right-4 md:right-0 -translate-y-1/2 -mr-8 md:-mr-12 z-10">
          <FaChevronRight
            size={28}
            onClick={next}
            className="text-[#561256] cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === i ? "bg-[#561256]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
