import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import lavender from "../images/lavender.jpg";
import cleaning from "../images/cleaning6.jpg";
import health6 from "../images/health6.jpg";

const slides = [
  {
    title: "Glow Naturally with Luxvich Skincare",
    description:
      "Nourish and protect your skin with our all-natural, dermatologically approved skincare range.",
    image: lavender,
  },
  {
    title: "Health First, Always.",
    description:
      "Our healthcare essentials ensure your wellness and safety — every day, every step.",
    image: health6,
  },
  {
    title: "Clean Home, Clear Mind.",
    description:
      "Experience the power of eco-friendly, fragrant cleaning solutions that care for your space.",
    image: cleaning,
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 1 }} // Start fully visible
          animate={{ opacity: 1 }} // Stay fully visible
          exit={{ opacity: 0 }} // Fade out quickly
          transition={{ duration: 0.0, ease: "linear" }} // Very short transition
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/75"></div>
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-screen px-6 md:px-16">
        <motion.h1
          key={slides[current].title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight max-w-4xl"
        >
          {slides[current].title}
        </motion.h1>

        <motion.p
          key={slides[current].description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-white text-md md:text-[20px] mb-8 max-w-2xl"
        >
          {slides[current].description}
        </motion.p>

        {/* Animated Button */}
        <motion.div
          key={`button-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <Link
            to="/adverts"
            className="px-6 py-3 rounded-md bg-[#67216D] text-white text-base md:text-lg font-semibold shadow-md hover:bg-[#501452] transition-all"
          >
            Explore Our Shop
          </Link>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute md:top-1/2 top-100 left-1 md:left-4 transform -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <FaArrowLeft className="text-[#67216D]" />
        </button>
      </div>

      <div className="absolute md:top-1/2 top-100 right-1 md:left-4  transform -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <FaArrowRight className="text-[#67216D]" />
        </button>
      </div>

      {/* Dots Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-[#67216D]" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
