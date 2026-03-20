import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/tokenSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
  },
});
