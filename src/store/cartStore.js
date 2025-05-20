import { create } from "zustand";
import { persist } from "zustand/middleware";

// ✅ Create a Zustand store for cart management
const useCartStore = create(
  persist(
    (set, get) => ({
      // ================================
      // 🛒 CART STATE
      // ================================
      cartItems: [], // Stores all items added to the cart

      // ================================
      // ➕ ADD TO CART
      // ================================
      addToCart: (product, quantity = 1) => {
        const { cartItems } = get(); // Get current cart items
        quantity = Math.floor(quantity); // Ensure quantity is an integer

        // Check if item already exists in cart
        const existingItem = cartItems.find((item) => item.id === product.id);

        // If item exists, update its quantity
        if (existingItem) {
          // Clear any existing error timeout to avoid memory leaks
          if (existingItem.errorTimeout) {
            clearTimeout(existingItem.errorTimeout);
          }

          const newQuantity = existingItem.quantity + quantity;

          // Check if new quantity exceeds available stock
          if (newQuantity > existingItem.availableQuantity) {
            const updatedItems = cartItems.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    error: `Only ${existingItem.availableQuantity} available.`,
                    errorTimeout: setTimeout(() => {
                      // Auto-clear error after 3 seconds
                      const { cartItems } = get();
                      set({
                        cartItems: cartItems.map((cartItem) =>
                          cartItem.id === product.id
                            ? { ...cartItem, error: null, errorTimeout: null }
                            : cartItem
                        ),
                      });
                    }, 3000),
                  }
                : item
            );
            set({ cartItems: updatedItems });
            return {
              success: false,
              message: "Cannot exceed available stock.",
            };
          }

          // If valid, update quantity and clear errors
          const updatedItems = cartItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: newQuantity,
                  error: null,
                  errorTimeout: null,
                }
              : item
          );
          set({ cartItems: updatedItems });
          return { success: true, message: "Quantity updated." };
        }
        // If item is new, add it to cart
        else {
          // Check if requested quantity exceeds stock
          if (quantity > product.quantity) {
            return {
              success: false,
              message: "Cannot exceed available stock.",
            };
          }

          // Add new item with initial quantity and available stock
          set({
            cartItems: [
              ...cartItems,
              {
                ...product,
                quantity,
                availableQuantity: product.quantity, // Store max available stock
                error: null,
                errorTimeout: null,
              },
            ],
          });
          return { success: true, message: "Item added to cart." };
        }
      },

      // ================================
      // ❌ REMOVE FROM CART
      // ================================
      removeFromCart: (id) => {
        const { cartItems } = get();
        const item = cartItems.find((item) => item.id === id);

        // Clear timeout if exists to prevent memory leaks
        if (item?.errorTimeout) {
          clearTimeout(item.errorTimeout);
        }

        // Remove item from cart
        set({
          cartItems: cartItems.filter((item) => item.id !== id),
        });
      },

      // ================================
      // 🔄 UPDATE QUANTITY IN CART
      // ================================
      updateCartItemQuantity: (id, newQuantity) => {
        const { cartItems } = get();
        const item = cartItems.find((item) => item.id === id);
        if (!item) return { success: false, message: "Item not found." };

        newQuantity = Math.floor(newQuantity);

        // Clear previous timeout if exists
        if (item.errorTimeout) clearTimeout(item.errorTimeout);

        // Validate against available quantity
        if (newQuantity > item.availableQuantity) {
          const updatedItems = cartItems.map((i) =>
            i.id === id
              ? {
                  ...i,
                  error: `Maximum ${i.availableQuantity} allowed (already in cart)`,
                  errorTimeout: setTimeout(() => {
                    const { cartItems } = get();
                    set({
                      cartItems: cartItems.map((item) =>
                        item.id === id
                          ? { ...item, error: null, errorTimeout: null }
                          : item
                      ),
                    });
                  }, 3000),
                }
              : i
          );
          set({ cartItems: updatedItems });
          return { success: false, message: "Max quantity reached" };
        }

        // ... rest of your validation logic ...

        // If valid, update quantity and clear error
        const updatedItems = cartItems.map((i) =>
          i.id === id
            ? { ...i, quantity: newQuantity, error: null, errorTimeout: null }
            : i
        );
        set({ cartItems: updatedItems });
        return { success: true };
      },

      // ================================
      // 🧹 CLEAR ENTIRE CART
      // ================================
      clearCart: () => {
        const { cartItems } = get();
        // Clear all error timeouts to prevent memory leaks
        cartItems.forEach((item) => {
          if (item.errorTimeout) {
            clearTimeout(item.errorTimeout);
          }
        });
        set({ cartItems: [] }); // Reset cart to empty
      },

      // ================================
      // 💰 CALCULATE TOTAL COST
      // ================================
      getTotalCost: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      // ================================
      // 🔢 CALCULATE TOTAL ITEMS IN CART
      // ================================
      getTotalQuantity: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      // ================================
      // 🔍 CHECK IF ITEM EXISTS IN CART
      // ================================
      isInCart: (id) => get().cartItems.some((item) => item.id === id),

      // ================================
      // 📦 GET A SPECIFIC CART ITEM
      // ================================
      getCartItem: (id) => get().cartItems.find((item) => item.id === id),
    }),
    {
      name: "cart-storage", // 🗄️ localStorage key
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
