import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      return state;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;

export default authSlice.reducer;
