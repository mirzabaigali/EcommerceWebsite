import { createSlice } from "@reduxjs/toolkit";

// Load wishlist items from localStorage or initialize an empty array
const initialWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlist,
  reducers: {
    addToWishlist: (state, action) => {
      // Add the new item to the wishlist
      return [...state, action.payload];
    },
    removeFromWishlist: (state, action) => {
      // Remove the item from the wishlist based on its id
      const itemIdToRemove = action.payload;
      return state.filter((item) => item.id !== itemIdToRemove);
    },
  },
});

// Extract action creators
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Reducer function
export default wishlistSlice.reducer;
