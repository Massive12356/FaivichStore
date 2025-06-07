// Import the `create` function from Zustand to create a custom store
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Import the API service that handles posting the order to the backend
import { apiDeleteOrder, apiGetOrders, apiPostOrder } from "../services/orders";



// Create the Zustand store for order management
export const useOrderStore = create(
  persist((set, get) => ({
    ProductOrders: [],
    isLoading: false,
    error: null,
    // Initial state for the orderData object
    orderData: {
      products: [], // Product ID (or can be an array if handling multiple items)
      user: "", // User ID placing the order
      quantity: 0, // Quantity of the product ordered

      // Customer details
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",

      // Address and location
      fullAddress: "",
      country: "",
      zipCode: "",
      city: "",

      // Order method preferences
      deliveryMethod: "", // e.g., 'Motorcycle'
      paymentMethod: "", // e.g., 'Cash on Delivery'

      // Pricing breakdown
      subTotal: 0, // Total before discounts and taxes
      discount: 0, // Discount amount
      deliveryCharge: 0, // Delivery fee
      estimatedTax: 0, // Estimated tax
      totalAmount: 0, // Final total = subTotal - discount + deliveryCharge + tax
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
     * @returns {Promise<object>} - The response from the backend
     */
    postOrder: async () => {
      const payload = get().orderData; // Get current order data from state
      set({ isLoading: true, error: null });
      try {
        const res = await apiPostOrder(payload); // Send POST request
        return res.data; // Return API response
      } catch (err) {
        throw err; // Forward error to be handled in the component
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
        throw err; // Forward error to be handled in the component
      } finally {
        set({ isLoading: false });
      }
    },

    // ✅ Delete order and update local state
    deleteOrder: async (id) => {
      try {
        await apiDeleteOrder(id);

        // Remove the deleted order from ProductOrders state
        set((state) => ({
          ProductOrders: state.ProductOrders.filter((order) => order.id !== id),
        }));

        console.log(`Order ${id} deleted successfully.`);
      } catch (err) {
        console.error(`Failed to delete order ${id}:`, err);
        throw err;
      }
    },

    /**
     * Reset the entire `orderData` object back to its initial values
     * Useful after successful submission or when user cancels
     */
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
