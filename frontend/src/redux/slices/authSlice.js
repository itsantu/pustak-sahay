import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: null },
  loading: true,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const { loginUser, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
