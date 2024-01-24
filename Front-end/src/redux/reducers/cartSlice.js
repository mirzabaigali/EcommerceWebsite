// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
