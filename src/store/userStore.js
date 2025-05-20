import { create } from "zustand";


// creating the user    profile store

const useUserStore = create((set) => ({
  userDetails: null,
  setUserDetails: (details) => set({userDetails: details}),

}));

export default useUserStore;