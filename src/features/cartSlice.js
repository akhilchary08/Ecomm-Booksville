import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let obj = state.find((item) => item.id === action.payload.id);
      if (!obj) {
        state.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.length = 0;
    },
    removeBook: (state, action) => {
      state.forEach((item) => {
        if (item["id"] === action.payload) {
          state.pop(item);
          return;
        }
      });
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, clearCart, removeBook } = cartSlice.actions;
