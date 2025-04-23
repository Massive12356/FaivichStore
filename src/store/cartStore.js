// src/store/cartStore.js

import { create } from "zustand";

// ✅ Create a Zustand store for managing the shopping cart state
const useCartStore = create((set, get) => ({
  // ================================
  // 🛒 Initial State
  // ================================
  cartItems: [], // Holds all items added to the cart

  // ================================
  // ➕ Add Item to Cart
  // ================================
  addToCart: (product, quantity = 1) => {
    // ✅ Check if the product already exists in the cart
    const existingItem = get().cartItems.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      // ✅ If item already exists, increment its quantity
      set({
        cartItems: get().cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity, // Add specified quantity to existing one
              }
            : item
        ),
      });
    } else {
      // ✅ If item does not exist, add it to the cart with the specified quantity
      set({
        cartItems: [
          ...get().cartItems,
          {
            ...product,
            quantity, // Use passed quantity (default is 1)
          },
        ],
      });
    }
  },

  // ================================
  // ❌ Remove Item from Cart
  // ================================
  removeFromCart: (id) => {
    // ✅ Filter out the item with the matching ID
    set({
      cartItems: get().cartItems.filter((item) => item._id !== id),
    });
  },

  // ================================
  // 🧹 Clear Entire Cart
  // ================================
  clearCart: () => {
    // ✅ Reset the cart to an empty array
    set({ cartItems: [] });
  },

  /**
   * 🔁 Update quantity of a specific cart item
   * params id - product ID
   * param newQuantity - new quantity to set
   */
  updateCartItemQuantity: (id, newQuantity) => {
    set({
      cartItems: get().cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      ),
    });
  },

  // ✅ Derived value: total cost of all items
  getTotalCost: () => {
    return get().cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },
    // derived quantity of the products 
  getTotalQuantity: () => {
    return get().cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },

  // clear cart after the purchasing an order
  clearCart: () =>set({cartItems: []}),
}));

// ✅ Export the store to use in components
export default useCartStore;
