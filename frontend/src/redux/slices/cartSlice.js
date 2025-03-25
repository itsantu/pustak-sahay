import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [
    {
      _id: "67da4c4910d72a3d347434b4",
      title: "Let Us C",
      author: "Author One",
      condition: "New",
      sellingPrice: 300,
      imageUrl: "http://res.cloudinary.com/antumallick/image/upload/v1742359449/SocialMedia/hmnfiv0uqxuj5cl6oznz.jpg",
    },
    {
      _id: "67d8fd17501f80e27316eecb",
      title: "Java Programming",
      author: "Author Two",
      condition: "Used - Good",
      sellingPrice: 200,
      imageUrl: "http://res.cloudinary.com/antumallick/image/upload/v1742273817/SocialMedia/luut4auticxmkwazhbww.jpg",
    },
    {
      _id: "67d9001736113a5235450491",
      title: "Atomic Habits",
      author: "Author Three",
      condition: "Used - Fair",
      sellingPrice: 150,
      imageUrl: "http://res.cloudinary.com/antumallick/image/upload/v1742274585/SocialMedia/ejiif2tbwvuh8ncwo1hu.jpg",
    },
  ],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        state.cartItems = [action.payload, ...state.cartItems]
        return state;
    }, 
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((post) => post._id != action.payload);
        return state;
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
