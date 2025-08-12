
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { apiDeleteOrder, apiGetOrders, apiPostOrder } from "../services/orders";


export const useOrderStore = create(
  persist((set, get) => ({
    ProductOrders: [],
    isLoading: false,
    error: null,
    orderData: {
      products: [], 
      user: "", 
      quantity: 0, 

      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",

   
      fullAddress: "",
      country: "",
      zipCode: "",
      city: "",

      deliveryMethod: "", 
      paymentMethod: "", 

      subTotal: 0, 
      discount: 0, 
      deliveryCharge: 0, 
      estimatedTax: 0, 
      totalAmount: 0, 
    },

    isLoading: false,
    error: null,

    /**
     * Update a single field inside `orderData`
     * Useful when binding individual form inputs (e.g., firstName, email, etc.)
     *
     * @param {string} field - The field name to update
     * @param {*} value - The new value for the field
     */
    setOrderField: (field, value) =>
      set((state) => ({
        orderData: {
          ...state.orderData, // Spread previous orderData
          [field]: value, // Update only the targeted field
        },
      })),

    /**
     * Update multiple fields at once (e.g., from cart summary or product selection)
     * Useful for setting calculated totals or bulk data like address, user, cart items
     *
     * @param {object} data - A partial object with fields to update in orderData
     */
    bulkSetOrderData: (data) =>
      set((state) => ({
        orderData: {
          ...state.orderData, // Keep existing fields
          ...data, // Override only the provided keys
        },
      })),

    /**
     * Send the order to the backend using the `apiPostOrder` service
     * Reads the complete `orderData` from the store and submits it
     *
     * @returns {Promise<object>} 
     */
    postOrder: async () => {
      const payload = get().orderData; 
      set({ isLoading: true, error: null });
      try {
        const res = await apiPostOrder(payload);
        return res.data; 
      } catch (err) {
        throw err; 
      } finally {
        set({ isLoading: false });
      }
    },

    fetchOrders: async (force = false) => {
      set((state) => {
        if (!force && state.ProductOrders.length > 0) return state;
        return { isLoading: true, error: null };
      });

      try {
        const res = await apiGetOrders();
        set({ ProductOrders: res.data });
      } catch (err) {
        throw err; 
      } finally {
        set({ isLoading: false });
      }
    },

  
    deleteOrder: async (id) => {
      try {
        await apiDeleteOrder(id);
        set((state) => ({
          ProductOrders: state.ProductOrders.filter((order) => order.id !== id),
        }));

        console.log(`Order ${id} deleted successfully.`);
      } catch (err) {
        console.error(`Failed to delete order ${id}:`, err);
        throw err;
      }
    },

    clearOrderData: () => {
      set({
        orderData: {
          products: [],
          user: "",
          quantity: 1,
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          fullAddress: "",
          country: "",
          zipCode: "",
          city: "",
          deliveryMethod: "",
          paymentMethod: "",
          subTotal: 0,
          discount: 0,
          deliveryCharge: 0,
          estimatedTax: 0,
          totalAmount: 0,
        },
      });
    },
  }),
  {
    name: 'order-storage',
    partialize:((state)=>({ProductOrders:state.ProductOrders,}))
  }
)
);
