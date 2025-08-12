import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      
      cartItems: [], 
      addToCart: (product, quantity = 4) => {
        const { cartItems } = get(); 
        quantity = Math.floor(quantity); 

    
        const existingItem = cartItems.find((item) => item.id === product._id);


        if (existingItem) {
        

          const newQuantity = existingItem.quantity + quantity;

      
          if (newQuantity > existingItem.availableQuantity) {
            const updatedItems = cartItems.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    error: ``,
                    errorTimeout: setTimeout(() => {
                    
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
              message: "",
            };
          }

          
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
  
        else {
     
          if (quantity > product.quantity) {
            return {
              success: false,
              message: "Cannot exceed available stock.",
            };
          }
          set({
            cartItems: [
              ...cartItems,
              {
                ...product,
                quantity,
                availableQuantity: product.quantity, 
                error: null,
                errorTimeout: null,
              },
            ],
          });
          return { success: true, message: "Item added to cart." };
        }
      },


      removeFromCart: (id) => {
        const { cartItems } = get();
        const item = cartItems.find((item) => item.id === id);


        if (item?.errorTimeout) {
          clearTimeout(item.errorTimeout);
        }
        set({
          cartItems: cartItems.filter((item) => item.id !== id),
        });
      },


      updateCartItemQuantity: (id, newQuantity) => {
        const { cartItems } = get();
        const item = cartItems.find((item) => item.id === id);
        if (!item) return { success: false, message: "Item not found." };

        newQuantity = Math.floor(newQuantity);

        if (item.errorTimeout) clearTimeout(item.errorTimeout);

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

        
        const updatedItems = cartItems.map((i) =>
          i.id === id
            ? { ...i, quantity: newQuantity, error: null, errorTimeout: null }
            : i
        );
        set({ cartItems: updatedItems });
        return { success: true };
      },

   
      clearCart: () => {
        const { cartItems } = get();
        
        cartItems.forEach((item) => {
          if (item.errorTimeout) {
            clearTimeout(item.errorTimeout);
          }
        });
        set({ cartItems: [] }); 
      },

   
      getTotalCost: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

 
      getTotalQuantity: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      isInCart: (id) => get().cartItems.some((item) => item.id === id),

    
      getCartItem: (id) => get().cartItems.find((item) => item.id === id),
    }),
  )
);

export default useCartStore;
