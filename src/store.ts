import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import cartSliceReducer from "./store/cart.tsx";
import { storeApi } from "./action/index.ts";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
