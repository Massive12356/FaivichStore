import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiGetUserDetails } from "../../services/getUserDetails";

const UpdateProfile = () => {
  const [preview, setPreview] = useState(null);
  const [userDetails, setUserDetail] =useState()

  const {setUserDetails} = useUserStore();// from zustand


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update user profile goes here
    console.log("Profile Updated");
  };

  const fetchDetails = async() =>{
    try {
      const response = await apiGetUserDetails();
      setUserDetails(response.data);// save globally from zustand
      setUserDetail(response.data);// save locally from zustand
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(()=>{
    fetchDetails();
  },[])

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className="p-5 md:p-10 bg-[#F9F7F7] min-h-screen font-[play]"
    >
      <Link to={"/faivichRoom"}>
        <motion.div whileTap={{ scale: 0.9 }} className="flex justify-end mb-5">
          <button
            title="Back to Dashboard"
            className="text-[#4A235A] hover:text-[#513E5F] flex items-center gap-2"
          >
            <FiArrowLeft size={24} />
            <span className="hidden md:inline font-[play]">Back</span>
          </button>
        </motion.div>
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <MdPostAdd size={30} className="text-[#FF6C2F]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#67216D] font-[play]">
          Update Profile
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-6"
      >
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={
                userDetails?.pictures?.[0]
                  ? `https://res.cloudinary.com/dp0kuhms5/image/upload/v1747073664/${userDetails.pictures[0]}`
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border shadow"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-[#4A235A] hover:bg-[#513E5F] p-2 rounded-full cursor-pointer"
              title="Change Profile Picture"
            >
              <FiCamera size={18} className="text-white" />
              <input
                type="file"
                name="pictures"
                id="profile-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            UserName
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            defaultValue={userDetails?.username}
          />
        </div>

        <div>
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter new password"
            className="w-full border rounded-lg px-4 py-2 placeholder-[#777186] font-[play] focus:outline-none focus:ring-1 ring-gray-300"
            defaultValue={userDetails?.email}
          />
        </div>
        <div className="flex gap-2">
          <label className="block text-[#777186] font-semibold mb-1 font-[play]">
            Role:
          </label>
          <p className="font-bold">{userDetails?.role}</p>
        </div>

        <div className="flex justify-end gap-4">
          <Link to={"/faivichRoom"}>
            <motion.button
              title="Cancel"
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-red-300 text-[#9d0505] px-6 py-2 rounded-lg font-[play] font-semibold"
            >
              Cancel
            </motion.button>
          </Link>
          <motion.button
            title="Update Profile"
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#4A235A] hover:bg-[#513E5F] text-white px-6 py-2 rounded-lg font-[play] font-semibold"
          >
            Update Profile
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateProfile;
