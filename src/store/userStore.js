import { create } from "zustand";
import ObjectID from "bson-objectid";

// creating the user profile store
const useUserStore = create((set) => {
  // Initialize userId from localStorage or generate a new one if not found
  let storedUserId = null;

  if (typeof window !== "undefined") {
    // Check if an anonymous user ID already exists in localStorage
    storedUserId = localStorage.getItem("anon_user_id");

    if (!storedUserId) {
      // Generate a new MongoDB-style ObjectId (24 hex chars)
      storedUserId = ObjectID().toHexString();

      // Store the generated ID in localStorage for persistence
      localStorage.setItem("anon_user_id", storedUserId);
    }
  }

  return {
    userDetails: null,
    setUserDetails: (details) => set({ userDetails: details }),

    // Add userId property to store the anonymous user ID
    userId: storedUserId,

    // Optional setter for userId (in case you want to update it manually)
    setUserId: (id) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("anon_user_id", id);
      }
      set({ userId: id });
    },
  };
});

export default useUserStore;
