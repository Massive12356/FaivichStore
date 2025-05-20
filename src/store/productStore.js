import { create } from "zustand";
import { apiGetAllProducts, apiFilterProducts,apiGetSingleProduct,apiUpdateProduct,apiDeleteProduct,apiAddProduct } from "../services/adverts";

// ✅ Zustand store to manage products globally
const useProductStore = create((set) => ({
  // ================================
  // 📦 Initial State
  // ================================
  products: [], // All fetched or filtered products
  isLoading: false, // Loading state while fetching
  error: null, // Error state for fetching issues

  // ================================
  // 📡 Fetch All Products from Backend (Optimized)
  // ================================
  fetchProducts: async (force = false) => {
    set((state) => {
      if (!force && state.products.length > 0) return state;
      return { isLoading: true, error: null };
    });

    try {
      const response = await apiGetAllProducts();
      set({
        products: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch products.",
        isLoading: false,
      });
    }
  },

  // ================================
  // 📡 Create Products
  // ================================
  createProduct: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiAddProduct(payload);
      const newProduct = response.data;

      set((state) => ({
        products: [newProduct, ...state.products],
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to create product.",
        isLoading: false,
      });
      return { success: false };
    }
  },

  // fetch single products
  fetchSingleAd: async (id) => {
    set({ loading: true, singleProduct: null });
    try {
      const response = await apiGetSingleProduct(id);
      const product = response.data["single product"]; // 👈 extract actual product object
      set({ singleProduct: product, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch single ad", loading: false });
    }
  },

  // ================================
  // ✏️ Update Product by ID
  // ================================
  updateProduct: async (id, payload) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiUpdateProduct(id, payload);
      const updatedProduct = response.data;

      set((state) => ({
        products: state.products.map((prod) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        ),
        singleProduct: updatedProduct,
        isLoading: false,
      }));
      return { success: true }; // return control to the component
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update product.",
        isLoading: false,
      });
      return { success: false, message: err.response?.data?.message };
    }
  },

  // ================================
  // ❌ Delete Product by ID
  // ================================
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await apiDeleteProduct(id); // 👈 call delete API

      set((state) => ({
        // remove deleted product from list
        products: state.products.filter((prod) => prod._id !== id),
        isLoading: false,
      }));

      return { success: true }; // optional return for component handling
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete product.",
        isLoading: false,
      });
      return { success: false, message: err.response?.data?.message };
    }
  },

  // ================================
  // 🎯 Fetch Filtered Products
  // ================================
  fetchFilteredProducts: async (filterParams = {}, sortParams = {}) => {
    console.log("Filtering with params:", { filterParams, sortParams }); // Log the parameters
    set({ isLoading: true, error: null });

    try {
      const response = await apiFilterProducts(filterParams, sortParams);

      set({
        products: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to filter products.",
        isLoading: false,
      });
    }
  },

  // ================================
  // 🔄 Reset Products State
  // ================================
  resetProducts: () => {
    set({ products: [], error: null, isLoading: false });
  },
}));

export default useProductStore;
