import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate,Link } from "react-router-dom";
import { apiSignUp } from "../../services/auth"
import { FiArrowLeft } from "react-icons/fi";


const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // function to handle Sign Up

  const handleSignUp = async (event) => {
    event.preventDefault(); // prevents any default behavior by the form

    setLoading(true);

    const formData = new FormData(event.target); // grabs the whole form inputs(values)

    try {
      const response = await apiSignUp(formData); // service grabs the values and send it to the backend
      console.log("response", response.data);

      toast.success("Successful! Login to continue");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Sign Up unsuccessful");
      console.error("signUp error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 px-4 ">
      <Link to={"/dashboard"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="absolute flex top-25 right-20"
        >
          <button
            title="Back to all Products Page"
            className="text-[#4A235A] hover:text-[#513E5F] transition-colors duration-200 flex items-center gap-2 cursor-pointer "
          >
            <FiArrowLeft size={24} />
            <span className="hidden md:inline font-[play]">Back</span>
          </button>
        </motion.div>
      </Link>
      <div className="max-w-sm w-full space-y-6 bg-white shadow-xl rounded-xl p-6">
        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* User name Input */}
          <div className="relative">
            <input
              type="text"
              name="username"
              className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-[#67216d8c] focus:ring-1 focus:ring-[#67216d8c] disabled:opacity-50 disabled:pointer-events-none outline-none"
              placeholder="Enter UserName"
              required
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#67216D"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9.003 9.003 0 0112 15c2.062 0 3.947.7 5.395 1.873M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-[#67216d8c] focus:ring-1 focus:ring-[#67216d8c] disabled:opacity-50 disabled:pointer-events-none outline-none"
              placeholder="Enter email"
              required
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#67216D"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              name="password"
              className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-[#67216d8c] focus:ring-1 focus:ring-[#67216d8c] disabled:opacity-50 disabled:pointer-events-none outline-none"
              placeholder="Enter password"
              required
            />
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg
                class="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#67216D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                <circle cx="16.5" cy="7.5" r=".5"></circle>
              </svg>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-[#67216d8c] focus:ring-1 focus:ring-[#67216d8c] disabled:opacity-50 disabled:pointer-events-none outline-none"
              placeholder="Confirm password"
              required
            />
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
              <svg
                class="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#67216D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                <circle cx="16.5" cy="7.5" r=".5"></circle>
              </svg>
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-3 px-4 flex justify-center items-center text-sm font-medium rounded-lg bg-[#67216D] text-white hover:bg-[#561256] focus:outline-none focus:ring-2 focus:ring-[#67216D] transition-all cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Gmail Sign Up Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          className="w-full py-3 px-4 flex items-center justify-center gap-3 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition-all "
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Gmail
        </motion.button>
      </div>
    </div>
  );
};

export default Signup;
