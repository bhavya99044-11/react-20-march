import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { AUTH_SESSION_KEY } from "../utils/constants";

const initialState = {
  items: [],
  loading: false,
  syncStatus: "idle",
};


const mergeCartItem = (state, payload) => {
  const {
    id,
    name,
    price,
    image,
    quantity = 1,
    selectedColor = null,
    selectedSize = null,
  } = payload;

  const existingItem = state.items.find(
    (item) =>
      Number(item.id) === Number(id) &&
      item.selectedColor?.id === selectedColor?.id &&
      item.selectedSize?.id === selectedSize?.id,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    return;
  }

  state.items.push({
    id,
    name,
    price,
    image,
    quantity,
    selectedColor,
    selectedSize,
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      mergeCartItem(state, action.payload);
    },
    setCartItems: (state, action) => {
      state.items = action.payload ?? [];
    },
    clearCart: (state) => {
      state.items = [];
    },
  }
});

export const { addToCart, setCartItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
