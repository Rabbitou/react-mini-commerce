import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart";

interface ICartState {
  cartItems: CartItem[];
  cartQuantity: number;
}

const getLocal = localStorage.getItem("cartItems");

const initialState: ICartState = {
  cartItems: getLocal ? JSON.parse(getLocal) : [],
  cartQuantity: getLocal
    ? JSON.parse(getLocal).reduce(
        (quantity: number, item: CartItem) => item.quantity + quantity,
        0
      )
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const isItemInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (isItemInCart) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.cartItems.push({ id: action.payload, quantity: 1 });
      }
      state.cartQuantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity: (state, action: PayloadAction<number>) => {
      const isItemInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (isItemInCart) {
        if (isItemInCart.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload
          );
        } else {
          state.cartItems = state.cartItems.map((cartItem) =>
            cartItem.id === action.payload
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
        state.cartQuantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const isItemInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (isItemInCart) {
        state.cartQuantity -= isItemInCart.quantity;
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== isItemInCart.id
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartQuantity = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, decreaseCartQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
