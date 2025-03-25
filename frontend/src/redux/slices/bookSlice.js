import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  book: null,
  loading: false,
  error: null,
};
// Async thunk for fetching book details
export const fetchBookDetails = createAsyncThunk(
  "bookDetails/fetchBookDetails",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/books/${bookId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch book details"
      );
    }
  }
);

// Book Details Slice
const bookSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {
    clearBookDetails: (state) => {
      state.book = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload;
    });
    builder.addCase(fetchBookDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearBookDetails } = bookSlice.actions;
export default bookSlice.reducer;
