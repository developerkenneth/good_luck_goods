import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage (or start empty)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === product.id && item.selectedColor === product.selectedColor
      );

      if (existing) {
        // If same product & color already in cart, increase quantity
        return prevCart.map((item) =>
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      // Otherwise add new product with selected color
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // ✅ Remove a product from cart
  const removeFromCart = (id, color) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedColor === color))
    );
  };

  // ✅ Update product quantity (using existing 'quantity' property)
  const updateQuantity = (id, color, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === color
          ? { ...item, quantity: Math.max(1, quantity) } // update existing field
          : item
      )
    );
  };

  // ✅ Update selected color for a product
  const updateColor = (id, oldColor, newColor) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedColor === oldColor
          ? { ...item, selectedColor: newColor }
          : item
      )
    );
  };

  // ✅ Clear all cart items
  const clearCart = () => setCart([]);

  // ✅ Count total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // ✅ Calculate total price
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateColor,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
