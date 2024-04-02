import { ReactNode, createContext, useEffect, useState } from "react";
import { CartItem } from "../types/cart";

interface ICartContext {
  cartItems: CartItem[];
  addToCart: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartQuantity: number;
}

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addToCart: () => {},
  decreaseCartQuantity: () => {},
  clearCart: () => {},
  cartQuantity: 0,
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") || "")
      : []
  );

  const cartQuantity = cartItems.reduce(
    (quantity: number, item: CartItem) => item.quantity + quantity,
    0
  );

  const addToCart = (id: number) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (isItemInCart) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { id, quantity: 1 }]);
    }
  };

  const decreaseCartQuantity = (id: number) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (isItemInCart) {
      if (isItemInCart.quantity === 1) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
      } else {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }
    }
  };

  const removeFromCart = (id: number) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === id);

    if (isItemInCart) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseCartQuantity,
        clearCart,
        cartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
