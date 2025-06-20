import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      return state;
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.bookId === action.payload.bookId
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cartItems.unshift({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.bookId != action.payload
      );
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        userInfo.cartItems = state.cartItems;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    },
  },
});

export const { setCartItems, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
