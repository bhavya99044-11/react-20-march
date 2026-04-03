import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  syncStatus: "idle",
};

const getSpinRewardKey = (spinReward) =>
  spinReward?.spinInstanceId ?? spinReward?.rewardId ?? null;

const mergeCartItem = (state, payload) => {
  const {
    id,
    name,
    price,
    originalPrice = price,
    image,
    quantity = 1,
    selectedColor = null,
    selectedSize = null,
    spinReward = null,
  } = payload;

  const existingItem = state.items.find(
    (item) =>
      Number(item.id) === Number(id) &&
      item.selectedColor?.id === selectedColor?.id &&
      item.selectedSize?.id === selectedSize?.id &&
      getSpinRewardKey(item.spinReward) === getSpinRewardKey(spinReward),
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    return;
  }

  state.items.push({
    id,
    name,
    price,
    originalPrice,
    image,
    quantity,
    selectedColor,
    selectedSize,
    spinReward,
  });
};

const isSameVariant = (item, payload) =>
  Number(item.id) === Number(payload.id) &&
  item.selectedColor?.id === payload.selectedColor?.id &&
  item.selectedSize?.id === payload.selectedSize?.id &&
  getSpinRewardKey(item.spinReward) === getSpinRewardKey(payload.spinReward);

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
    updateCartItemQuantity: (state, action) => {
      const { quantity, ...itemIdentity } = action.payload;
      const item = state.items.find((entry) => isSameVariant(entry, itemIdentity));

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (entry) => !isSameVariant(entry, itemIdentity),
        );
        return;
      }

      item.quantity = quantity;
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(
        (entry) => !isSameVariant(entry, action.payload),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  }
});

export const {
  addToCart,
  setCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
